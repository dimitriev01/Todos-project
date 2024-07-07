import { useCalendar } from 'shared/lib/hooks/use-calendar';
import { checkDateIsEqual, checkIsToday } from 'shared/helpers/date';
import { ICalendarProps } from '../model/task-list.types';
import './calendar.scss';

export const Calendar = (props: ICalendarProps) => {
  const { locale = 'default', selectedDate: date, selectDate, firstWeekDayNumber = 2 } = props;
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });

  return (
    <div className='calendar'>
      <div className='calendar__header'>
        <div aria-hidden className='calendar__header__arrow-left' onClick={() => functions.onClickArrow('left')} />
        {state.mode === 'days' && (
          <div aria-hidden onClick={() => functions.setMode('months')}>
            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'months' && (
          <div aria-hidden onClick={() => functions.setMode('years')}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'years' && (
          <div>
            {state.selectedYearsInterval[0]} - {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
          </div>
        )}
        <div aria-hidden className='calendar__header__arrow-right' onClick={() => functions.onClickArrow('right')} />
      </div>
      <div className='calendar__body'>
        {state.mode === 'days' && (
          <>
            <div className='calendar__body__week-names'>
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className='calendar__body__days'>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

                return (
                  <div
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    aria-hidden
                    onClick={() => {
                      functions.setSelectedDay(day);
                      selectDate(day.date);
                    }}
                    className={[
                      'calendar__body__days__day',
                      isToday ? 'calendar__body__days__day_today' : '',
                      isSelectedDay ? 'calendar__body__days__day_selected' : '',
                      isAdditionalDay ? 'ccalendar__body__days__day_additional-day' : '',
                    ].join(' ')}
                  >
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {state.mode === 'months' && (
          <div className='calendar__body__months'>
            {state.monthesNames.map((monthesName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex && state.selectedYear === new Date().getFullYear();
              const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  key={monthesName.month}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesName.monthIndex);
                    functions.setMode('days');
                  }}
                  className={[
                    'calendar__body__months__month',
                    isSelectedMonth ? 'calendar__body__months__month_selected' : '',
                    isCurrentMonth ? 'calendar__body__months__month_current' : '',
                  ].join(' ')}
                >
                  {monthesName.monthShort}
                </div>
              );
            })}
          </div>
        )}

        {state.mode === 'years' && (
          <div className='calendar__body__years'>
            <div className='calendar__body__unchoosable-year'>{state.selectedYearsInterval[0] - 1}</div>
            {state.selectedYearsInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  key={year}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('months');
                  }}
                  className={[
                    'calendar__body__unchoosable-year__year',
                    isCurrentYear ? 'calendar__body__years__unchoosable-year__year_current' : '',
                    isSelectedYear ? 'calendar__body__years__unchoosable-year__year_selected' : '',
                  ].join(' ')}
                >
                  {year}
                </div>
              );
            })}
            <div className='calendar__unchoosable__year'>
              {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
