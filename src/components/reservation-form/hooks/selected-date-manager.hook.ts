import { ref, Ref, SetupContext } from '@vue/composition-api';

interface UseSelectedDateManagerHook {
  selectedDates: Ref<string[]>;
  onDateUpdate: (dateRange: string[]) => void;
  onFormSubmit: () => void;
}

export const useSelectedDateManagerHook = (context: SetupContext): UseSelectedDateManagerHook => {
  const selectedDates: Ref<string[]> = ref([]);

  const onDateUpdate = (dateRange: string[]): void => {
    selectedDates.value = dateRange;
  };

  const onFormSubmit = (): void => {
    context.emit('onFormSubmit', selectedDates.value);
  };

  return {
    selectedDates,
    onDateUpdate,
    onFormSubmit,
  };
};
