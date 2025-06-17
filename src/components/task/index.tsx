import { useState } from 'react';

import { z } from 'zod';
import { CheckIcon, PencilIcon, TrashIcon, XIcon } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { TaskProps } from './types';
import { useTask } from '@/hooks/use-task';

const formSchema = z.object({
  task: z.string().min(1, 'A tarefa não pode estar vazia'),
});

type FormData = z.infer<typeof formSchema>;

export function Task({ value, checked = false, id, ...props }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { saveTask, removeTask } = useTask();

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    values: {
      task: value,
    },
  });

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  function handleSaveTask({ task }: FormData) {
    saveTask({
      id,
      value: task,
      checked,
      ...props,
      updatedAt: new Date(),
    });

    setIsEditing(false);
  }

  function handleCheck() {
    saveTask({
      id,
      value,
      checked: !checked,
      ...props,
      updatedAt: new Date(),
    });
  }

  function handleDelete() {
    removeTask(id);
  }

  return (
    <form
      className="flex h-17 w-full items-center justify-center rounded-lg bg-white p-5"
      onSubmit={handleSubmit(handleSaveTask)}
    >
      <input
        type="checkbox"
        className="accent-green-base mr-3 min-h-5 min-w-5"
        checked={checked}
        onChange={handleCheck}
      />

      {!isEditing && (
        <p className={`mr-4 flex-1 ${checked && 'text-gray-300 line-through'}`}>
          {value}
        </p>
      )}

      {isEditing && (
        <input
          className="border-b-pink-base mt-5 mr-4 mb-4 w-full border-0 border-b-1"
          placeholder="Nova tarefa"
          required
          type="text"
          autoFocus
          {...register('task')}
        />
      )}

      <div className="flex items-center gap-1 text-gray-300">
        {!isEditing && (
          <>
            <button
              type="button"
              className="cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-gray-200"
              onClick={handleEdit}
            >
              <PencilIcon className="size-4" />
            </button>

            <button
              type="button"
              className="cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-gray-200"
              onClick={handleDelete}
            >
              <TrashIcon className="size-4" />
            </button>
          </>
        )}

        {isEditing && (
          <>
            <button
              type="button"
              className="text-pink-base hover:bg-pink-base hover:text-pink-light cursor-pointer rounded-sm bg-gray-200 p-1 transition-colors duration-200"
              onClick={handleCancelEdit}
            >
              <XIcon />
            </button>
            <button
              type="submit"
              className="bg-green-light hover:bg-green-base cursor-pointer rounded-sm p-1 text-white transition-colors duration-200"
            >
              <CheckIcon />
            </button>
          </>
        )}
      </div>
    </form>
  );
}
