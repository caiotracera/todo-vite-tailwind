import { useContext } from 'react';

import { TasksContext } from '@/context/tasks-context';

export function useTask() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('useTask must be used within a TasksProvider');
  }

  return context;
}
