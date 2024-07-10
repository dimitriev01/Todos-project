import { ITask, useTasksStore } from 'entities/task';
import { ChangeEvent, FormEvent, useState } from 'react';
import { taskFormDefaultFields } from '../model/task-form.constants';
import cls from './task-form.module.scss';
import { formatDate } from 'shared/helpers/date';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

export const TaskForm = () => {
  const { addTask, isLoading } = useTasksStore();
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

    if (!task.title.trim() || !task.description.trim()) {
      return;
    }

    addTask({ ...task, date: formatDate(new Date(), 'DD-MM-YYYY'), id: `${+new Date()}` });

    setTask(taskFormDefaultFields);
  };

  return (
    <form onSubmit={handleSubmit} className={cls['task-form']}>
      <div className={cls['task-form__field']}>
        <label htmlFor='title'>Название задачи</label>
        <Input id='title' name='title' value={task.title} onChange={handleInputChange} />
      </div>

      <div className={cls['task-form__field']}>
        <label htmlFor='description'>Описание задачи</label>
        <Input id='description' name='description' value={task.description} onChange={handleInputChange} />
      </div>

      <div>
        <Button disabled={isLoading} type='submit'>
          Создать
        </Button>
      </div>
    </form>
  );
};
