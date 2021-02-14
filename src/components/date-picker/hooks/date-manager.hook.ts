import { getMonth, getYear }    from 'date-fns';
import { computed, Ref, ref }   from '@vue/composition-api';
import { generateCurrentMonth } from '@/components/date-picker/helpers/date-manager.helper';
import { monthNames }           from '@/components/date-picker/helpers/date-manager.variables';
import { Computed }             from '@/types';

interface UseDateManagerHook {
  currentMonth: Ref<number>;
  currentYear: Ref<number>;
  getCurrentMonthDays: Computed<string[]>;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

export const useDateManagerHook = (): UseDateManagerHook => {
  const currentMonth: Ref<number> = ref(getMonth(new Date()));
  const currentYear: Ref<number> = ref(getYear(new Date()));

  const getCurrentMonthDays: Computed<string[]> = computed(() => generateCurrentMonth(currentYear.value, currentMonth.value));

  const onNextClick = (): void => {
    if (currentMonth.value === monthNames.length - 1) {
      currentMonth.value = 0;
      currentYear.value += 1;
    } else {
      currentMonth.value += 1;
    }
  };

  const onPreviousClick = (): void => {
    if (currentMonth.value === 0) {
      currentMonth.value = monthNames.length - 1;
      currentYear.value -= 1;
    } else {
      currentMonth.value -= 1;
    }
  };

  return {
    currentMonth,
    currentYear,
    getCurrentMonthDays,
    onPreviousClick,
    onNextClick,
  };
};
