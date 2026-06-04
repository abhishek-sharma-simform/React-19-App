import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  addMonths,
  subMonths,
  format,
  startOfDay,
} from 'date-fns';
import { useTaskStore } from '../../store/taskStore';
import { PriorityBadge } from './PriorityBadge';
import type { Task } from '../../types/todo';
import styles from './CalendarView.module.css';

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const tasks = useTaskStore(state => state.tasks);
  const setSelectedTaskId = useTaskStore(state => state.setSelectedTaskId);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add days from previous/next month for full weeks
  const firstDayOfWeek = getDay(monthStart);
  const prevMonthEnd = new Date(monthStart);
  prevMonthEnd.setDate(prevMonthEnd.getDate() - firstDayOfWeek);
  const prevMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => {
    const date = new Date(prevMonthEnd);
    date.setDate(date.getDate() + i);
    return date;
  });

  const lastDayOfMonth = daysInMonth[daysInMonth.length - 1];
  const lastDayOfWeek = getDay(lastDayOfMonth);
  const nextMonthDays = Array.from({ length: 6 - lastDayOfWeek }, (_, i) => {
    const date = new Date(monthEnd);
    date.setDate(date.getDate() + i + 1);
    return date;
  });

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];

  const getTasksForDay = (date: Date): Task[] => {
    return tasks.filter(
      task =>
        task.dueDate &&
        isSameDay(startOfDay(task.dueDate), startOfDay(date)) &&
        !task.completed &&
        !task.deletedAt,
    );
  };

  const selectedDayTasks = selectedDay ? getTasksForDay(selectedDay) : [];

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button className={styles.navButton} onClick={handlePrevMonth}>
          <ChevronLeft size={18} />
        </button>
        <h2 className={styles.monthYear}>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button className={styles.navButton} onClick={handleNextMonth}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.calendar}>
        {allDays.map((day, idx) => {
          const dayTasks = getTasksForDay(day);
          const isCurrentMonth = idx >= firstDayOfWeek && idx < firstDayOfWeek + daysInMonth.length;
          const isToday = isSameDay(day, new Date());
          const isSelected = selectedDay && isSameDay(day, selectedDay);

          return (
            <div
              key={day.toISOString()}
              className={`${styles.day} ${!isCurrentMonth ? styles.otherMonth : ''} ${isToday ? styles.today : ''}`}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              style={{
                backgroundColor: isSelected ? 'var(--color-accent)' : undefined,
                color: isSelected ? '#fff' : undefined,
              }}
            >
              <div className={styles.dayNumber}>{format(day, 'd')}</div>
              <div className={styles.taskDots}>
                {dayTasks.slice(0, 4).map((task, i) => (
                  <div
                    key={i}
                    className={styles.taskDot}
                    style={{
                      backgroundColor: isSelected ? '#fff' : 'var(--color-accent)',
                    }}
                  />
                ))}
                {dayTasks.length > 4 && (
                  <span
                    style={{
                      fontSize: '10px',
                      color: isSelected ? '#fff' : 'var(--color-text-secondary)',
                    }}
                  >
                    +{dayTasks.length - 4}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDay && selectedDayTasks.length > 0 && (
        <div
          className={styles.popover}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className={styles.popoverHeader}>
            <span>{format(selectedDay, 'EEEE, MMMM d')}</span>
            <button className={styles.popoverClose} onClick={() => setSelectedDay(null)}>
              <X size={18} />
            </button>
          </div>
          <div className={styles.popoverTasks}>
            {selectedDayTasks.map(task => (
              <div
                key={task.id}
                className={styles.popoverTask}
                onClick={() => {
                  setSelectedTaskId(task.id);
                  setSelectedDay(null);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <PriorityBadge priority={task.priority} />
                  <span style={{ flex: 1 }}>{task.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
