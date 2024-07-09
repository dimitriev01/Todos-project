import { Task, useTasksStore } from 'entities/task';
import { useEffect } from 'react';
import { ITaskListProps } from '../model/task-list.types';

export const TaskList = (props: ITaskListProps) => {
  const { date } = props;
  const { tasks, fetchTasks } = useTasksStore();

  useEffect(() => {
    fetchTasks({ date });
  }, []);

  if (!tasks.length) {
    return <p>No tasks!</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
