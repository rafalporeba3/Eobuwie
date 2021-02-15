import { weekDayNames }                     from '@/components/date-picker/helpers/date-manager.variables';
import { generateFullCurrentMonth, getEachDay } from '../date-manager.helper';

it('getEachDay should generate correct array of dates in provided range', () => {
  expect(getEachDay([ '2021-02-01', '2021-02-28' ]).length)
    .toBe(28);

  expect(getEachDay([ '2021-02-28', '2021-02-01' ]).length)
    .toBe(28);

  expect(getEachDay([]).length)
    .toBe(0);
});

it('generateFullCurrentMonth should render correct array of dates in provided range', () => {
  const defaultRowCount = 5;
  const extraRowToFillEmptyDaysCount = 1;

  const februaryRangeWithFilledDaysCount = defaultRowCount * weekDayNames.length;
  const mayRangeWithFilledDaysCount = (defaultRowCount + extraRowToFillEmptyDaysCount) * weekDayNames.length;

  expect(generateFullCurrentMonth(2021, 1).length)
    .toBe(februaryRangeWithFilledDaysCount);

  expect(generateFullCurrentMonth(2021, 4).length)
    .toBe(mayRangeWithFilledDaysCount);
});
