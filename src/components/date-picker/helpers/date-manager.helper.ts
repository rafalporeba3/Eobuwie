import { eachDayOfInterval, format, getDate, getDay, getDaysInMonth } from 'date-fns';
import { FORMAT, monthNames, weekDayNames }                              from '@/components/date-picker/helpers/date-manager.variables';

export const formatDate = (date: Date): string => format(date, FORMAT);

export const formatNewDate = (year: number, month: number, day: number): string => formatDate(new Date(year, month, day));

export const getEachDay = (range: string[]): string[] => {
  if (range.length) {
    const isStartDateGraterThanEndDate: boolean = range[ 0 ] > range[ range.length - 1 ];

    return eachDayOfInterval({
      start: new Date(isStartDateGraterThanEndDate ? range[ range.length - 1 ] : range[ 0 ]),
      end: new Date(!isStartDateGraterThanEndDate ? range[ range.length - 1 ] : range[ 0 ]),
    })
      .map((date: Date) => formatDate(date));
  }
  return [];
};

export const generateCurrentMonth = (currentYear: number, currentMonth: number): string[] => {
  const SUNDAY = 0;
  const SATURDAY = 6;
  const allDaysInMonth: string[] = [];
  const allDaysInPrevMonth: string[] = [];
  const allDaysInNextMonth: string[] = [];

  const firstDayOfMonth: number = getDate(new Date(currentYear, currentMonth, 1));
  const firstDayOfWeek: number = getDay(new Date(currentYear, currentMonth, firstDayOfMonth));
  const daysInMonth: number = getDaysInMonth(new Date(currentYear, currentMonth));
  const lastDayOfWeek: number = getDay(new Date(currentYear, currentMonth, daysInMonth));

  if (firstDayOfWeek !== SUNDAY) {
    const getPrevDaysInMonth = getDaysInMonth(new Date(currentYear, (currentMonth === 0 ? monthNames.length - 1 : currentMonth - 1)));

    for (let i = getPrevDaysInMonth; i > getPrevDaysInMonth - firstDayOfWeek; i -= 1) {
      allDaysInPrevMonth.push(formatNewDate(currentYear, currentMonth - 1, i));
    }
  }

  if (lastDayOfWeek !== SATURDAY) {
    for (let i = 1; i < weekDayNames.length - lastDayOfWeek; i += 1) {
      allDaysInNextMonth.push(formatNewDate(currentYear, currentMonth + 1, i));
    }
  }

  for (let i = 1; i <= daysInMonth; i += 1) {
    allDaysInMonth.push(formatNewDate(currentYear, currentMonth, i));
  }

  return [
    ...allDaysInPrevMonth.reverse(),
    ...allDaysInMonth,
    ...allDaysInNextMonth,
  ];
};
