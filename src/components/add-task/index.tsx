import { useState } from 'react';
import { CheckIcon, PlusIcon, XIcon } from '@phosphor-icons/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { Task } from '@/context/tasks-context/types';
import { useTask } from '@/hooks/use-task';

const formSchema = z.object({
  task: z.string().min(1, 'A tarefa não pode estar vazia'),
});

type FormData = z.infer<typeof formSchema>;

export function AddTask() {
  const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { addTask } = useTask();

  function handleCreateNewTask() {
    setIsCreatingNewTask(true);
  }

  function handleAddNewTask({ task }: FormData) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      value: task,
      checked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setIsCreatingNewTask(false);
    reset();

    addTask(newTask);
  }

  function handleCancelNewTask() {
    setIsCreatingNewTask(false);
    reset();
  }

  return (
    <>
      {!isCreatingNewTask && (
        <button
          type="button"
          className="hover:bg-pink-base hover:text-pink-light group flex h-17 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-200 transition-colors duration-200"
          onClick={handleCreateNewTask}
        >
          <PlusIcon className="text-pink-base group-hover:text-pink-light transition-colors duration-200" />
          Nova tarefa
        </button>
      )}

      {isCreatingNewTask && (
        <form
          className="flex h-17 w-full items-center justify-center gap-4 rounded-lg bg-white px-5 shadow-md"
          onSubmit={handleSubmit(handleAddNewTask)}
        >
          <input
            className="border-b-pink-base mt-5 mb-4 w-full border-0 border-b-1"
            placeholder="Nova tarefa"
            required
            type="text"
            autoFocus
            {...register('task')}
          />

          <div className="flex items-center justify-between gap-1">
            <button
              type="button"
              className="text-pink-base hover:bg-pink-base hover:text-pink-light cursor-pointer rounded-sm bg-gray-200 p-1 transition-colors duration-200"
              onClick={handleCancelNewTask}
            >
              <XIcon />
            </button>
            <button
              type="submit"
              className="bg-green-light hover:bg-green-base cursor-pointer rounded-sm p-1 text-white transition-colors duration-200"
            >
              <CheckIcon />
            </button>
          </div>
        </form>
      )}
    </>
  );
}
