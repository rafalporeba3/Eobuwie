<template>
  <c-date-picker-wrapper :title="options.title"
                         class="c-date-picker">

    <c-date-picker-editor ref="date-picker-editor"
                          v-bind="options"
                          :is-panel-visible="isPanelVisible"
                          @click.native.stop="changePanelVisibility" />

    <c-date-picker-panel v-show="isPanelVisible"
                         ref="date-picker-panel"
                         v-bind="$props"
                         v-click-outside="{
                            excludeElements: [ 'date-picker-editor', 'date-picker-panel' ],
                            handler: 'onPanelClose'
                          }">

      <template #header>
        <c-date-picker-panel-header :current-month="currentMonth"
                                    :current-year="currentYear"
                                    @onNextClick="onNextClick"
                                    @onPreviousClick="onPreviousClick" />
      </template>

      <template #content>
        <c-date-picker-panel-content :current-month-days="getCurrentMonthDays"
                                     :disabled-dates="disabledDates"
                                     :is-panel-visible="isPanelVisible"
                                     :selected-dates="selectedDateRange"
                                     @onDateClick="setNewDateRange" />
      </template>
    </c-date-picker-panel>
  </c-date-picker-wrapper>
</template>

<script lang="ts">
import { cloneDeep }                           from 'lodash-es';
import { defineComponent, PropType, Ref, ref } from '@vue/composition-api';
import { DatePickerOptions }                   from '@/components/date-picker/date-picker.types';
import cDatePickerWrapper                      from './components/wrapper/date-picker-wrapper.component.vue';
import cDatePickerEditor                       from './components/editor/date-picker-editor.component.vue';
import cDatePickerPanel                        from './components/panel/date-picker-panel.component.vue';
import cDatePickerPanelHeader                  from './components/panel-header/date-picker-panel-header.component.vue';
import cDatePickerPanelContent                 from './components/panel-content/date-picker-panel-content.component.vue';
import { useDateManagerHook }                  from './hooks/date-manager.hook';

export default defineComponent({
  name: 'cDatePicker',
  components: {
    cDatePickerWrapper,
    cDatePickerEditor,
    cDatePickerPanelHeader,
    cDatePickerPanel,
    cDatePickerPanelContent,
  },
  props: {
    options: {
      type: Object as PropType<DatePickerOptions>,
      required: false,
    },
    disabledDates: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    selectedDates: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const {
      currentMonth,
      currentYear,
      getCurrentMonthDays,
      onPreviousClick,
      onNextClick,
    } = useDateManagerHook();

    const selectedDateRange: Ref<string[]> = ref(props.selectedDates);
    const lastSelectedDateRange: Ref<string[]> = ref(props.selectedDates);
    const isPanelVisible: Ref<boolean> = ref(false);

    const changePanelVisibility = (): void => {
      isPanelVisible.value = !isPanelVisible.value;
    };

    const onPanelClose = (): void => {
      isPanelVisible.value = false;

      if (selectedDateRange.value.length === 1) {
        selectedDateRange.value = cloneDeep(lastSelectedDateRange.value);
      }
    };

    const setNewDateRange = (date: string): void => {
      if (selectedDateRange.value.length === 2) {
        lastSelectedDateRange.value = cloneDeep(selectedDateRange.value);
        selectedDateRange.value = [];
      }

      if (!selectedDateRange.value.length) {
        selectedDateRange.value = [ date ];
      } else if (selectedDateRange.value.length === 1) {
        selectedDateRange.value = [ selectedDateRange.value[ 0 ], date ];
      }
    };

    const updateSecondValue = (date: string): void => {
      if (selectedDateRange.value[ 1 ] !== date) {
        selectedDateRange.value = [ selectedDateRange.value[ 0 ], date ];
      }
    };

    return {
      isPanelVisible,
      currentMonth,
      currentYear,
      getCurrentMonthDays,
      onPreviousClick,
      onNextClick,
      selectedDateRange,
      changePanelVisibility,
      onPanelClose,
      setNewDateRange,
      updateSecondValue,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.c-date-picker {
  position: relative;
  user-select: none;
}

</style>
