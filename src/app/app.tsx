import { Calendar } from 'shared/ui/calendar';
import { useState } from 'react';
import { Layout } from 'shared/ui/layout';
import 'shared/styles/styles.scss';

export const App = () => {
  const [selectedDate, setSelectedDay] = useState(new Date());

  const setSelectedDayHandler = (date: Date) => {
    setSelectedDay(date);
  };

  return (
    <Layout>
      <Calendar selectedDate={selectedDate} selectDate={setSelectedDayHandler} />
    </Layout>
  );
};
