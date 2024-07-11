it('should fetch tasks for the given date when user is present', async () => {
  const mockFetchTasks = jest.fn();
  const mockUseTasksStore = jest.fn().mockReturnValue({
    tasks: [],
    fetchTasks: mockFetchTasks,
  });
  const mockUseUserStore = jest.fn().mockReturnValue({
    user: { id: 'user1' },
  });

  jest.mock('entities/task', () => ({
    useTasksStore: mockUseTasksStore,
  }));
  jest.mock('entities/user', () => ({
    useUserStore: mockUseUserStore,
  }));

  const { render, screen } = require('@testing-library/react');
  const { TaskList } = require('src/features/task-list/ui/task-list.tsx');

  render(<TaskList date='2022-01-01' />);

  expect(mockFetchTasks).toHaveBeenCalledWith({
    userId: 'user1',
    date: '2022-01-01',
  });
});

it('should not fetch tasks when user is null', async () => {
  const mockFetchTasks = jest.fn();
  const mockUseTasksStore = jest.fn().mockReturnValue({
    tasks: [],
    fetchTasks: mockFetchTasks,
  });
  const mockUseUserStore = jest.fn().mockReturnValue({
    user: null,
  });

  jest.mock('entities/task', () => ({
    useTasksStore: mockUseTasksStore,
  }));
  jest.mock('entities/user', () => ({
    useUserStore: mockUseUserStore,
  }));

  const { render, screen } = require('@testing-library/react');
  const { TaskList } = require('src/features/task-list/ui/task-list.tsx');

  render(<TaskList date='2022-01-01' />);

  expect(mockFetchTasks).not.toHaveBeenCalled();
});
