<template>
  <c-date-picker-wrapper :title="options.title"
                         class="c-date-picker">

    <c-date-picker-editor ref="date-picker-editor"
                          v-bind="datePickerOptions"
                          :is-panel-visible="isPanelVisible"
                          @click.native.stop="changePanelVisibility" />

    <c-date-picker-panel v-show="isPanelVisible"
                         ref="date-picker-panel"
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
        <c-date-picker-panel-content :current-month="currentMonth"
                                     :current-month-days="getCurrentMonthDays"
                                     :current-year="currentYear"
                                     :disabled-dates="disabledDates"
                                     :is-panel-visible="isPanelVisible"
                                     :selected-dates="selectedDateRange"
                                     @onDateClick="setNewDateRange" />
      </template>
    </c-date-picker-panel>
  </c-date-picker-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import cDatePickerWrapper            from './components/wrapper/date-picker-wrapper.component.vue';
import cDatePickerEditor             from './components/editor/date-picker-editor.component.vue';
import cDatePickerPanel              from './components/panel/date-picker-panel.component.vue';
import cDatePickerPanelHeader        from './components/panel-header/date-picker-panel-header.component.vue';
import cDatePickerPanelContent       from './components/panel-content/date-picker-panel-content.component.vue';
import { useDateManagerHook }        from './hooks/date-manager.hook';
import { useDatePickerManagerHook }  from './hooks/date-picker-manager.hook';
import { BasicDatePickerOptions }    from './date-picker.types';

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
      type: Object as PropType<BasicDatePickerOptions>,
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
  },
  setup(props, context) {
    const {
      currentMonth,
      currentYear,
      getCurrentMonthDays,
      onPreviousClick,
      onNextClick,
    } = useDateManagerHook();

    const {
      isPanelVisible,
      selectedDateRange,
      datePickerOptions,
      changePanelVisibility,
      onPanelClose,
      setNewDateRange,
      updateSecondValue,
    } = useDatePickerManagerHook({
      selectedDates: props.selectedDates,
      options: props.options,
    }, context);

    return {
      isPanelVisible,
      currentMonth,
      currentYear,
      getCurrentMonthDays,
      onPreviousClick,
      onNextClick,
      selectedDateRange,
      datePickerOptions,
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
