import { formatDate, generateCurrentMonth, getEachDay } from '@/components/date-picker/helpers/date-manager.helper';
import { computed, Ref, ref }                           from '@vue/composition-api';
import { Computed }                                     from '@/types';

interface UseDayManagerHook {
  isDisabled: (date: string) => boolean;
  isSelected: (date: string) => boolean;
  isToday: (date: string) => boolean;
  isEndDate: (date: string) => boolean;
  isStartDate: (date: string) => boolean;
  updateHoverSelectedDates: (date: string) => void;
  clearHoverSelectedDates: () => void;
  isDisabledDate: (dateRange: string[], date: string) => boolean;
  isDateCurrentMonth: (date: string) => boolean;
}

export const useDayManagerHook = (props: {
  disabledDates: string[];
  selectedDates: string[];
  currentYear?: number;
  currentMonth?: number;
}): UseDayManagerHook => {
  const disabledDates: Computed<string[]> = computed(() => getEachDay(props.disabledDates));
  const selectedDates: Computed<string[]> = computed(() => getEachDay(props.selectedDates));
  const hoverSelectedDates: Ref<string[]> = ref([]);
  const currentMonth: Computed<string[]> = computed(() => generateCurrentMonth(props.currentYear ?? 0, props.currentMonth ?? 0));

  const isDisabled = (date: string): boolean => disabledDates.value.includes(date);
  const isSelected = (date: string): boolean => selectedDates.value.includes(date) || hoverSelectedDates.value.includes(date);
  const isToday = (date: string): boolean => date === formatDate(new Date());
  const isDateCurrentMonth = (date: string): boolean => currentMonth.value.includes(date);

  const isStartDate = (date: string): boolean => {
    const isEqualToFirstSelectedDate: boolean = (selectedDates.value[ 0 ] ?? '') === date;
    const isEqualToFirstDisabledDate: boolean = (disabledDates.value[ 0 ] ?? '') === date;
    const isEqualToHoverFirstSelectedDate: boolean = (hoverSelectedDates.value[ 0 ] ?? '') === date;

    return isEqualToFirstSelectedDate || isEqualToHoverFirstSelectedDate || isEqualToFirstDisabledDate;
  };

  const isEndDate = (date: string): boolean => {
    const isEqualToLastSelectedDate: boolean = (selectedDates.value[ selectedDates.value.length - 1 ] ?? '') === date;
    const isEqualToHoverLastSelectedDate: boolean = (hoverSelectedDates.value[ hoverSelectedDates.value.length - 1 ] ?? '') === date;
    const isEqualToLastDisabledDate: boolean = (disabledDates.value[ disabledDates.value.length - 1 ] ?? '') === date;

    return (isEqualToLastSelectedDate && selectedDates.value.length > 1)
      || (isEqualToHoverLastSelectedDate && hoverSelectedDates.value.length > 1)
      || isEqualToLastDisabledDate;
  };

  const clearHoverSelectedDates = (): void => {
    hoverSelectedDates.value = [];
  };

  const isDisabledDate = (dateRange: string[], date: string): boolean => disabledDates.value.includes(date)
    || (disabledDates.value[ 0 ] > date && dateRange[ 0 ] > disabledDates.value[ disabledDates.value.length - 1 ])
    || (disabledDates.value[ 0 ] < date && dateRange[ 0 ] < disabledDates.value[ 0 ]);

  const updateHoverSelectedDates = (date: string): void => {
    if (selectedDates.value.length === 1 && !isDisabledDate(selectedDates.value as string[], date)) {
      hoverSelectedDates.value = getEachDay([ props.selectedDates[ 0 ], date ]);
    }
  };

  return {
    isDisabled,
    isSelected,
    isToday,
    isEndDate,
    isStartDate,
    updateHoverSelectedDates,
    clearHoverSelectedDates,
    isDisabledDate,
    isDateCurrentMonth,
  };
};
