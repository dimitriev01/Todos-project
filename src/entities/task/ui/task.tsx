import { Select } from 'shared/ui/select';
import { useTasksStore } from '../model/task.store';
import { EnumTaskStatus, ITask, ITaskParams } from '../model/task.types';
import cls from './task.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';

export const Task = (props: ITaskParams) => {
  const { task } = props;
  const [editedTask, setEditedTask] = useState<ITask>(task);
  const { deleteTask, editTask } = useTasksStore();

  const handleDelete = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    deleteTask({ id: editedTask.id });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditTask = () => {
    editTask(editedTask);
  };

  return (
    <form className={cls.task}>
      <div className={cls.task__content}>
        <div className={cls.task__content__item}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' value={task.title} onChange={handleInputChange} />
        </div>
        <div className={cls.task__content__item}>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            id='description'
            name='description'
            value={task.description}
            onChange={handleInputChange}
          />
        </div>
        <div className={cls.task__content__item}>
          <label htmlFor='status'>Status</label>
          <Select value={editedTask.status} values={Object.values(EnumTaskStatus)} onChange={handleEditTask} />
        </div>
      </div>
      <button className={cls['task__delete-btn']} onClick={handleDelete}>
        X
      </button>
    </form>
  );
};
