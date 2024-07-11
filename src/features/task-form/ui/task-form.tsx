import { ITask, useTasksStore } from 'entities/task';
import { ChangeEvent, FormEvent, useState } from 'react';
import { taskFormDefaultFields, validTaskForm } from '../model/task-form.constants';
import { formatDate } from 'shared/helpers/date';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { useUserStore } from 'entities/user';
import cls from './task-form.module.scss';

export const TaskForm = () => {
  const { addTask, isLoading } = useTasksStore();
  const { user } = useUserStore();
  const [error, setError] = useState<typeof validTaskForm>(validTaskForm);
  const [task, setTask] = useState<ITask>(taskFormDefaultFields);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!task.description.trim() || !task.title.trim()) {
      if (!task.description.trim()) {
        setError({ ...error, description: 'Ошибка валидации в описании' });
      }

      if (!task.title.trim()) {
        setError({ ...error, title: 'Ошибка валидации в названии' });
      }
      return;
    }

    if (user) {
      addTask({ task: { ...task, date: formatDate(new Date(), 'DD-MM-YYYY'), id: `${+new Date()}` }, userId: user.id });

      setTask(taskFormDefaultFields);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cls['task-form']}>
      <div className={cls['task-form__field']}>
        <label htmlFor='title'>Название задачи</label>
        <Input id='title' name='title' value={task.title} onChange={handleInputChange} />
        {error.title && <span className={cls.error}>{error.title}</span>}
      </div>

      <div className={cls['task-form__field']}>
        <label htmlFor='description'>Описание задачи</label>
        <Input id='description' name='description' value={task.description} onChange={handleInputChange} />
        {error.description && <span className={cls.error}>{error.description}</span>}
      </div>

      <div>
        <Button disabled={isLoading} type='submit'>
          Создать
        </Button>
      </div>
    </form>
  );
};
