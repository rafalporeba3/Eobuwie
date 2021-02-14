<template>
  <fragment>
    <c-date-picker-day-of-week v-for="dayOfWeek in weekNames"
                               :key="dayOfWeek"
                               :day-of-week="dayOfWeek" />

    <c-date-picker-day v-for="date in currentMonthDays"
                       :key="date"
                       :date="date"
                       :is-today="isToday(date)"
                       :is-disabled="isDisabled(date)"
                       :is-end-date="isEndDate(date)"
                       :is-selected="isSelected(date)"
                       :is-start-date="isStartDate(date)"
                       @mouseenter.native="updateHoverSelectedDates(date)"
                       @click.native="onDateClick(date)" />
  </fragment>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from '@vue/composition-api';
import cDatePickerDayOfWeek                 from '../day-of-week/date-picker-day-of-week.component.vue';
import cDatePickerDay                       from '../day/date-picker-day.component.vue';
import { useDayManagerHook }                from '../../hooks/day-manager.hook';
import { weekNames }                        from '../../helpers/date-manager.variables';

export default defineComponent({
  name: 'cDatePickerPanelContent',
  components: {
    cDatePickerDayOfWeek,
    cDatePickerDay,
  },
  props: {
    currentMonthDays: {
      type: Array as PropType<string[]>,
      required: true,
    },
    disabledDates: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    selectedDates: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    isPanelVisible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const {
      isDisabled,
      isSelected,
      isToday,
      isEndDate,
      isStartDate,
      updateHoverSelectedDates,
      clearHoverSelectedDates,
    } = useDayManagerHook(props);

    const onDateClick = (date: string) => {
      clearHoverSelectedDates();
      context.emit('onDateClick', date);
    };

    watch(() => props.isPanelVisible, (value: boolean) => {
      if (!value) {
        clearHoverSelectedDates();
      }
    });

    return {
      weekNames,
      isDisabled,
      isSelected,
      isToday,
      isEndDate,
      isStartDate,
      updateHoverSelectedDates,
      onDateClick,
    };
  },
});
</script>

<style scoped>

</style>
