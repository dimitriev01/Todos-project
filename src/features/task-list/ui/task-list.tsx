import { Task, useTasksStore } from 'entities/task';
import { useEffect } from 'react';
import { ITaskListProps } from '../model/task-list.types';
import cls from './task-list.module.scss';
import { useUserStore } from 'entities/user';

export const TaskList = (props: ITaskListProps) => {
  const { date } = props;
  const { tasks, fetchTasks } = useTasksStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      fetchTasks({
        userId: user.id,
        date,
      });
    }
  }, []);

  if (!tasks.length) {
    return <p>Нет задач!</p>;
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
