import { ref, Ref, SetupContext }                    from '@vue/composition-api';
import { cloneDeep }                                 from 'lodash-es';
import { BasicDatePickerOptions, DatePickerOptions } from '@/components/date-picker/date-picker.types';
import { isStartDateGraterThanEndDate }              from '@/components/date-picker/helpers/date-manager.helper';
import { useDayManagerHook }                         from '@/components/date-picker/hooks/day-manager.hook';

export const useDatePickerManagerHook = (props: {
  selectedDates: string[];
  options: BasicDatePickerOptions;
}, context: SetupContext) => {
  const { isDisabledDate } = useDayManagerHook({
    ...props,
    disabledDates: [],
  });

  const selectedDateRange: Ref<string[]> = ref(cloneDeep(props.selectedDates));
  const lastSelectedDateRange: Ref<string[]> = ref(cloneDeep(props.selectedDates));
  const isPanelVisible: Ref<boolean> = ref(false);
  const datePickerOptions: Ref<DatePickerOptions> = ref({ ...props.options, startPlaceholder: undefined, endPlaceholder: undefined });

  const changePanelVisibility = (): void => {
    isPanelVisible.value = !isPanelVisible.value;
  };

  const onPanelClose = (): void => {
    isPanelVisible.value = false;

    if (selectedDateRange.value.length === 1) {
      selectedDateRange.value = cloneDeep(lastSelectedDateRange.value);
    }
  };

  const setPanelEndPlaceholder = (value: { [ key: string ]: string }): void => {
    datePickerOptions.value = {
      ...datePickerOptions.value,
      ...value,
    };
  };

  const setNewDateRange = (date: string): void => {
    if (selectedDateRange.value.length === 2) {
      lastSelectedDateRange.value = cloneDeep(selectedDateRange.value);
      selectedDateRange.value = [];
    }

    if (!selectedDateRange.value.length) {
      selectedDateRange.value = [ date ];
      setPanelEndPlaceholder({ startPlaceholder: selectedDateRange.value[ 0 ] });
    } else if (selectedDateRange.value.length === 1 && !isDisabledDate(selectedDateRange.value, date)) {
      selectedDateRange.value = [ selectedDateRange.value[ 0 ], date ];

      if (isStartDateGraterThanEndDate(selectedDateRange.value)) {
        selectedDateRange.value = [ selectedDateRange.value[ 1 ], selectedDateRange.value[ 0 ] ];
      }

      context.emit('onSelectedDateUpdate', selectedDateRange.value);
      setPanelEndPlaceholder({ endPlaceholder: selectedDateRange.value[ selectedDateRange.value.length - 1 ] });
      onPanelClose();
    }
  };

  const updateSecondValue = (date: string): void => {
    if (selectedDateRange.value[ 1 ] !== date) {
      selectedDateRange.value = [ selectedDateRange.value[ 0 ], date ];
    }
  };

  return {
    isPanelVisible,
    selectedDateRange,
    datePickerOptions,
    changePanelVisibility,
    onPanelClose,
    setNewDateRange,
    updateSecondValue,
  };
};
