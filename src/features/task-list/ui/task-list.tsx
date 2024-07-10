import { Task, useTasksStore } from 'entities/task';
import { useEffect } from 'react';
import { ITaskListProps } from '../model/task-list.types';
import cls from './task-list.module.scss';

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
    <ul className={cls['task-list']}>
      {tasks.map((task) => (
        <li className={cls['task-list__item']} key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
