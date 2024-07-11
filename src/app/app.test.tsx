import { expect } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { App } from './app';
import { useUserStore } from 'entities/user';

describe('App', () => {
  it('should update user state to Andrey when "Авторизоваться за Андрея" button is clicked', () => {
    const { getByText } = render(<App />);
    const button = getByText('Авторизоваться за Андрея');
    fireEvent.click(button);
    const userStore = useUserStore.getState();
    expect(userStore.user).toEqual({ name: 'Andrey', id: '1' });
  });

  it('should have null user state initially', () => {
    const { queryByText } = render(<App />);
    const userStore = useUserStore.getState();
    expect(userStore.user).toBeNull();
    expect(queryByText('Выйти')).toBeNull();
  });
});
