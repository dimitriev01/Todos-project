import { fireEvent, render } from '@testing-library/react';
import { EnumTaskStatus } from '../model/task.types';
import { Task } from './task';

it('should render correctly with given task props', () => {
  const taskData = {
    id: '1',
    title: 'Task Title',
    status: EnumTaskStatus.ACTIVE,
    description: 'Task Description',
    date: '2022-01-01',
  };

  const { getByText } = render(<Task task={taskData} />);

  expect(getByText('Task Title')).toBeInTheDocument();
  expect(getByText('Task Description')).toBeInTheDocument();
  expect(getByText(EnumTaskStatus.ACTIVE)).toBeInTheDocument();
});

it('should handle empty task props gracefully', () => {
  const taskData = {
    id: '',
    title: '',
    status: EnumTaskStatus.ACTIVE,
    description: '',
    date: '',
  };

  const { getByText, getByLabelText } = render(<Task task={taskData} />);

  fireEvent.click(getByLabelText('Название'));
  fireEvent.click(getByLabelText('Описание'));

  expect(getByText('Ошибка валидации в названии')).toBeInTheDocument();
  expect(getByText('Ошибка валидации в описании')).toBeInTheDocument();
});
