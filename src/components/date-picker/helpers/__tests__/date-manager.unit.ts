import { weekDayNames }                     from '@/components/date-picker/helpers/date-manager.variables';
import { generateCurrentMonth, getEachDay } from '../date-manager.helper';

it('getEachDay should generate correct array of dates in provided range', () => {
  expect(getEachDay([ '2021-02-01', '2021-02-28' ]).length)
    .toBe(28);

  expect(getEachDay([ '2021-02-28', '2021-02-01' ]).length)
    .toBe(28);

  expect(getEachDay([]).length)
    .toBe(0);
});

it('generateCurrentMonth should render correct array of dates in provided range', () => {
  const defaultRowCount = 5;
  const extraRowToFillEmptyDaysCount = 1;

  const februaryRangeWithFilledDaysCount = defaultRowCount * weekDayNames.length;
  const mayRangeWithFilledDaysCount = (defaultRowCount + extraRowToFillEmptyDaysCount) * weekDayNames.length;

  expect(generateCurrentMonth(2021, 1).length)
    .toBe(februaryRangeWithFilledDaysCount);

  expect(generateCurrentMonth(2021, 4).length)
    .toBe(mayRangeWithFilledDaysCount);
});
