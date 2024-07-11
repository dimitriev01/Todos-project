import { Select } from 'shared/ui/select';
import { useTasksStore } from '../model/task.store';
import { EnumTaskStatus, ITask, ITaskParams } from '../model/task.types';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CiEdit, CiCircleCheck } from 'react-icons/ci';
import { FcCancel } from 'react-icons/fc';
import { MdDelete } from 'react-icons/md';
import cls from './task.module.scss';
import { Input } from 'shared/ui/input';
import { useUserStore } from 'entities/user';
import { validTaskForm } from 'features/task-form';

export const Task = (props: ITaskParams) => {
  const { task } = props;
  const [editedTask, setEditedTask] = useState<ITask>(task);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<typeof validTaskForm>(validTaskForm);
  const { deleteTask, editTask, isLoading } = useTasksStore();
  const { user } = useUserStore();

  const handleDelete = (e: FormEvent<HTMLButtonElement>) => {
    if (user) {
      e.preventDefault();
      deleteTask({ taskId: editedTask.id, userId: user.id });
    }
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

    if (!editedTask.description.trim() || !editedTask.title.trim()) {
      if (!editedTask.description.trim()) {
        setError({ ...error, description: 'Ошибка валидации в описании' });
      }

      if (!editedTask.title.trim()) {
        setError({ ...error, title: 'Ошибка валидации в названии' });
      }
      return;
    }

    if (user) {
      editTask({
        userId: user.id,
        task: editedTask,
      });
      setIsEditing(false);
    }
  };

  const toggleEdit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  useEffect(() => {
    return () => {
      setEditedTask(task);
    };
  }, []);

  return (
    <form className={cls.task}>
      <div className={cls.task__content}>
        <div className={cls.task__content__item}>
          <label htmlFor='title'>Название </label>
          {isEditing ? (
            <>
              <Input id='title' name='title' value={editedTask.title} onChange={handleFieldChange} />
              {error.title && <span className={cls.error}>{error.title}</span>}
            </>
          ) : (
            <p>{task.title}</p>
          )}
        </div>
        <div className={cls.task__content__item}>
          <label htmlFor='description'>Описание </label>
          {isEditing ? (
            <>
              <Input id='description' name='description' value={editedTask.description} onChange={handleFieldChange} />
              {error.description && <span className={cls.error}>{error.description}</span>}
            </>
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
