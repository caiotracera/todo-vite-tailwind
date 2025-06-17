import { createContext, useEffect, useState } from 'react';

import type { TasksContextData, TasksContextProps, Task } from './types';
import { LOCAL_STORAGE_KEY } from './constants';

export const TasksContext = createContext<TasksContextData>({
  tasks: [],
  addTask: () => null,
  saveTask: () => null,
  removeTask: () => null,
});

export function TasksProvider({ children }: TasksContextProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(task: Task) {
    setTasks((prevTasks) => [...prevTasks, task]);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...tasks, task]));
  }

  function saveTask(task: Task) {
    let storedTask = tasks.find((t) => t.id === task.id);

    if (!storedTask) {
      return;
    }

    const otherTasks = tasks.filter((t) => t.id !== task.id);

    storedTask.value = task.value;
    storedTask.checked = task.checked;
    storedTask.updatedAt = new Date();

    setTasks([...otherTasks, storedTask]);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...otherTasks, storedTask])
    );
  }

  function removeTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredTasks));
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storedTasks) {
      return;
    }

    const parsedTasks = JSON.parse(storedTasks) as Task[];
    setTasks(parsedTasks);
  }, []);

  return (
    <TasksContext.Provider
      value={{ tasks: tasks, addTask, saveTask, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}
