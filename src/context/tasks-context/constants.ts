import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string().uuid(),
  value: z.string(),
  checked: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const LOCAL_STORAGE_KEY = 'caiotracera/tasks';
