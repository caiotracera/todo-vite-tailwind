import { useTask } from '@/hooks/use-task';
import { useMemo } from 'react';

export function Summary() {
  const { tasks } = useTask();

  const tasksCount = tasks.length;

  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.checked).length;
  }, [tasks]);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <p className="text-gray-300">Tarefas criadas</p>
        <p className="bg-pink-light text-pink-dark flex h-6 w-6 items-center justify-center rounded-full">
          {tasksCount}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-gray-300">Concluídas</p>
        <p className="bg-green-light text-green-dark flex items-center justify-center rounded-full px-2 py-0.5">
          {completedTasks} de {tasksCount}
        </p>
      </div>
    </div>
  );
}
