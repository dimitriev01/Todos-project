import { Calendar } from 'features/task-list';
import { useState } from 'react';
import 'shared/styles/styles.scss';
import { Layout } from 'shared/ui/layout';

export const App = () => {
  const [selectedDate, setSelectedDay] = useState(new Date());

  return (
    <Layout>
      <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} />
    </Layout>
  );
};
