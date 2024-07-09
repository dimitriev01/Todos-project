import { useCalendar } from 'shared/lib/hooks';
import { checkDateIsEqual, checkIsToday } from 'shared/helpers/date';
import { ICalendarProps } from '../model/calendar.types';
import cls from './calendar.module.scss';
import { Modal } from 'shared/ui/modal';
import { useState } from 'react';
import { TaskList } from 'features/task-list';

export const Calendar = (props: ICalendarProps) => {
  const [modalDay, setModalDay] = useState<boolean>(false);
  const { locale = 'default', selectedDate: date, selectDate, firstWeekDayNumber = 2 } = props;
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <section>
      <table className={cls.calendar}>
        <thead className={cls.calendar__header}>
          <tr>
            <td aria-hidden>
              <button className={cls['calendar__header__arrow-left']} onClick={() => functions.onClickArrow('left')} />
            </td>
            <td aria-hidden className={cls[state.mode !== 'days' ? 'calendar__header__days' : '']}>
              {state.mode === 'days' && (
                <button onClick={() => functions.setMode('months')} className={cls.calendar__header__date}>
                  {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                </button>
              )}
            </td>
            <td className={cls[state.mode !== 'months' ? 'calendar__header__months' : '']}>
              {state.mode === 'months' && (
                <button onClick={() => functions.setMode('years')} className={cls.calendar__header__date}>
                  {state.selectedYear}
                </button>
              )}
            </td>
            <td className={cls[state.mode !== 'years' ? 'calendar__header__years' : '']}>
              {state.mode === 'years' && (
                <button>
                  {state.selectedYearsInterval[0]} -{' '}
                  {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
                </button>
              )}
            </td>
            <td aria-hidden>
              <button
                className={cls['calendar__header__arrow-right']}
                onClick={() => functions.onClickArrow('right')}
              />
            </td>
          </tr>
        </thead>
        <tbody className={cls.calendar_body}>
          {state.mode === 'days' && (
            <>
              <tr className={cls['calendar__body__week-names']}>
                {state.weekDaysNames.map((weekDaysName) => (
                  <td key={weekDaysName.dayShort}>{weekDaysName.dayShort}</td>
                ))}
              </tr>
              <tr className={cls.calendar__body__days}>
                {state.calendarDays.map((day) => {
                  const isToday = checkIsToday(day.date);
                  const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
                  const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

                  return (
                    <td
                      key={`${day.dayNumber}-${day.monthIndex}`}
                      aria-hidden
                      onClick={() => {
                        functions.setSelectedDay(day);
                        selectDate(day.date);
                        setModalDay(true);
                      }}
                      className={[
                        cls.calendar__body__days__day,
                        isToday ? cls.calendar__body__days__day_today : '',
                        isSelectedDay ? cls.calendar__body__days__day_selected : '',
                        isAdditionalDay ? cls['calendar__body__days__day_additional-day'] : '',
                      ].join(' ')}
                    >
                      <button>{day.dayNumber}</button>
                    </td>
                  );
                })}
              </tr>
            </>
          )}

          {state.mode === 'months' && (
            <tr className={cls.calendar__body__months}>
              {state.monthesNames.map((monthesName) => {
                const isCurrentMonth =
                  new Date().getMonth() === monthesName.monthIndex && state.selectedYear === new Date().getFullYear();
                const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

                return (
                  <td
                    key={monthesName.month}
                    aria-hidden
                    onClick={() => {
                      functions.setSelectedMonthByIndex(monthesName.monthIndex);
                      functions.setMode('days');
                    }}
                    className={[
                      cls.calendar__body__months__month,
                      isSelectedMonth ? cls.calendar__body__months__month_selected : '',
                      isCurrentMonth ? cls.calendar__body__months__month_current : '',
                    ].join(' ')}
                  >
                    <button>{monthesName.monthShort}</button>
                  </td>
                );
              })}
            </tr>
          )}

          {state.mode === 'years' && (
            <tr className={cls.calendar__body__years}>
              <td className={cls['calendar__body__years__unchoosable-year']}>{state.selectedYearsInterval[0] - 1}</td>
              {state.selectedYearsInterval.map((year) => {
                const isCurrentYear = new Date().getFullYear() === year;
                const isSelectedYear = year === state.selectedYear;

                return (
                  <td
                    key={year}
                    aria-hidden
                    onClick={() => {
                      functions.setSelectedYear(year);
                      functions.setMode('months');
                    }}
                    className={[
                      cls['calendar__body__years__year'],
                      isCurrentYear ? cls['calendar__body__years__year_current'] : '',
                      isSelectedYear ? cls['calendar__body__years__year_selected'] : '',
                    ].join(' ')}
                  >
                    <button>{year}</button>
                  </td>
                );
              })}
              <td className={cls['calendar__body__years__unchoosable-year']}>
                {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal visible={modalDay} setVisible={setModalDay} title={'Список задач'}>
        <TaskList date={formattedDate.replace(/\./g, '-')} />
      </Modal>
    </section>
  );
};
