import './index.css';

import { Header } from '@/components/header';
import { Summary } from '@/components/summary';
import { TaskList } from '@/components/task-list';
import { TasksProvider } from './context/tasks-context';

export function App() {
  return (
    <main className="h-screen w-screen bg-gray-100">
      <div className="mx-auto flex w-126 flex-col items-center pt-20">
        <Header />

        <div className="mt-8 w-full">
          <TasksProvider>
            <Summary />

            <TaskList />
          </TasksProvider>
        </div>
      </div>
    </main>
  );
}
