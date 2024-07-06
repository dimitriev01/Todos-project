import { useEffect } from 'react';
import { Task, useTasksStore } from 'entities/task';

export const TaskList = () => {
  const { tasks, fetchTasks, isLoading } = useTasksStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (!tasks.length && !isLoading) {
    return <>Empty list!</>;
  }

  return (
    <section aria-label='task-list'>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
};
