import { AddTask } from '@/components/add-task';
import { Task } from '@/components/task';
import { useTask } from '@/hooks/use-task';

export function TaskList() {
  const { tasks } = useTask();

  return (
    <div className="mt-3 flex w-full flex-col gap-3">
      <AddTask />

      {tasks.map((each) => (
        <Task key={each.id} {...each} />
      ))}
    </div>
  );
}
