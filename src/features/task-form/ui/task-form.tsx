import { EnumTaskStatus, ITask, useTasksStore } from 'entities/task';
import { ChangeEvent, FormEvent, useState } from 'react';
import { taskFormDefaultFields } from '../model/task-form.constants';
import cls from './task-form.module.scss';
import { Select } from 'shared/ui/select';
import { formatDate } from 'shared/helpers/date';

export const TaskForm = () => {
  const { addTask, isLoading } = useTasksStore();
  const [task, setTask] = useState<ITask>(taskFormDefaultFields);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <div>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' name='title' value={task.title} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor='description'>Description</label>
        <input type='text' id='description' name='description' value={task.description} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor='status'>Status</label>
        <Select value={task.status} values={Object.values(EnumTaskStatus)} onChange={handleInputChange} />
      </div>

      <div>
        <button disabled={isLoading} type='submit' className={cls['task-form-btn']}>
          Submit
        </button>
      </div>
    </form>
  );
};
