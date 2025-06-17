import { z } from 'zod';

import { taskSchema } from './constants';

export type Task = z.infer<typeof taskSchema>;

export type TasksContextData = {
  tasks: Task[];
  addTask: (task: Task) => void;
  saveTask: (task: Task) => void;
  removeTask: (id: string) => void;
};

export type TasksContextProps = {
  children: React.ReactNode;
};
