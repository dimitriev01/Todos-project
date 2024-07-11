import { Calendar } from 'shared/ui/calendar';
import { useState } from 'react';
import { Layout } from 'shared/ui/layout';
import { Button } from 'shared/ui/button';
import cls from './app.module.scss';
import { IUser, useUserStore } from 'entities/user';
import 'shared/styles/styles.scss';

export const App = () => {
  const [selectedDate, setSelectedDay] = useState(new Date());
  const { user, setUser } = useUserStore();

  const setSelectedDayHandler = (date: Date) => {
    setSelectedDay(date);
  };

  const onClickUserHandler = (user: IUser | null) => {
    setUser(user);
  };

  return (
    <Layout>
      {!user ? (
        <div className={cls['user-container']}>
          <Button
            onClick={() => onClickUserHandler({ name: 'Andrey', id: '1' })}
            children={<p>Авторизоваться за Андрея</p>}
          />
          <Button
            onClick={() => onClickUserHandler({ name: 'Vania', id: '2' })}
            children={<p>Авторизоваться за Ваню</p>}
          />
        </div>
      ) : (
        <div className={cls['user-container']}>
          <Button onClick={() => onClickUserHandler(null)} children={<p>Выйти</p>} />
          <Calendar selectedDate={selectedDate} selectDate={setSelectedDayHandler} />
        </div>
      )}
    </Layout>
  );
};
