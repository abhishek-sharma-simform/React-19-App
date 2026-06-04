export function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return Promise.resolve(false);
  }

  if (Notification.permission === 'granted') {
    return Promise.resolve(true);
  }

  if (Notification.permission !== 'denied') {
    return Notification.requestPermission().then(permission => permission === 'granted');
  }

  return Promise.resolve(false);
}

export function sendNotification(title: string, options?: NotificationOptions): void {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
}

export function checkTaskReminders(tasks: Array<{ id: string; title: string; dueDate?: Date; reminder?: Date }>): void {
  const now = new Date();

  tasks.forEach(task => {
    if (!task.reminder || !task.dueDate) return;

    // Check if reminder time has passed and notification hasn't been shown yet
    const reminderTime = new Date(task.reminder);
    const lastNotified = localStorage.getItem(`notified-${task.id}`);

    if (reminderTime <= now && !lastNotified) {
      sendNotification(`Reminder: ${task.title}`, {
        body: `Task due: ${task.dueDate.toLocaleDateString()}`,
        icon: '✓',
      });
      localStorage.setItem(`notified-${task.id}`, now.toISOString());
    }
  });
}
