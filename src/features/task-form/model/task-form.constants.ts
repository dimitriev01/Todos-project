import { EnumTaskStatus } from 'entities/task';

export const taskFormDefaultFields = {
  id: '',
  title: '',
  status: EnumTaskStatus.ACTIVE,
  description: '',
  date: '',
};

export const validTaskForm = { description: '', title: '' };
