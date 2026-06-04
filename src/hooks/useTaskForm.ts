import { useForm } from 'react-hook-form';
import type { TaskFormValues } from '../types/forms';

export function useTaskForm(initialValues?: TaskFormValues) {
  return useForm<TaskFormValues>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'none',
      dueDate: '',
      dueTime: '',
      status: 'todo',
      ...initialValues,
    },
  });
}
