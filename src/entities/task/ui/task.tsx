import { Select } from 'shared/ui/select';
import { useTasksStore } from '../model/task.store';
import { EnumTaskStatus, ITask, ITaskParams } from '../model/task.types';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CiEdit, CiCircleCheck } from 'react-icons/ci';
import { FcCancel } from 'react-icons/fc';
import { MdDelete } from 'react-icons/md';
import cls from './task.module.scss';
import { Input } from 'shared/ui/input';

export const Task = (props: ITaskParams) => {
  const { task } = props;
  const [editedTask, setEditedTask] = useState<ITask>(task);
  const [isEditing, setIsEditing] = useState(false);
  const { deleteTask, editTask, isLoading } = useTasksStore();

  const handleDelete = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    deleteTask({ id: editedTask.id });
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditTask = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    editTask(editedTask);
    setIsEditing(false);
  };

  const toggleEdit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <form className={cls.task}>
      <div className={cls.task__content}>
        <div className={cls.task__content__item}>
          <label htmlFor='title'>Название </label>
          {isEditing ? (
            <Input id='title' name='title' value={editedTask.title} onChange={handleFieldChange} />
          ) : (
            <p>{task.title}</p>
          )}
        </div>
        <div className={cls.task__content__item}>
          <label htmlFor='description'>Описание </label>
          {isEditing ? (
            <Input id='description' name='description' value={editedTask.description} onChange={handleFieldChange} />
          ) : (
            <p>{task.description}</p>
          )}
        </div>
        <div className={cls.task__content__item}>
          <label htmlFor='status'>Статус</label>
          {isEditing ? (
            <Select
              name='status'
              id='status'
              value={editedTask.status}
              values={Object.values(EnumTaskStatus)}
              onChange={handleFieldChange}
            />
          ) : (
            <p>{task.status}</p>
          )}
        </div>
      </div>
      <div className={cls['task__btns']}>
        {isEditing ? (
          <>
            <button onClick={handleEditTask} disabled={isLoading}>
              <CiCircleCheck size='25' color='green' />
            </button>
            <button onClick={toggleEdit}>
              <FcCancel size='25' />
            </button>
          </>
        ) : (
          <button onClick={toggleEdit}>
            <CiEdit size='25' color='grey' />
          </button>
        )}
        <button onClick={handleDelete}>
          <MdDelete size='25' color='red' />
        </button>
      </div>
    </form>
  );
};
