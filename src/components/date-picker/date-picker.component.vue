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
                            handler: 'onClose'
                          }">

      <template #header></template>
      <template #content></template>
    </c-date-picker-panel>
  </c-date-picker-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from '@vue/composition-api';
import { DatePickerOptions }                   from '@/components/date-picker/date-picker.types';
import cDatePickerWrapper                      from './components/wrapper/date-picker-wrapper.component.vue';
import cDatePickerEditor                       from './components/editor/date-picker-editor.component.vue';
import cDatePickerPanel                        from './components/panel/date-picker-panel.component.vue';

export default defineComponent({
  name: 'cDatePicker',
  components: {
    cDatePickerWrapper,
    cDatePickerEditor,
    cDatePickerPanel,
  },
  props: {
    options: {
      type: Object as PropType<DatePickerOptions>,
      required: false,
    },
    availableDates: {
      type: Array as PropType<string[]>,
      default: [],
    },
    disabledDates: {
      type: Array as PropType<string[]>,
      default: [],
    },
    selectedDates: {
      type: Array as PropType<string[]>,
      default: [],
    },
  },
  setup() {
    const isPanelVisible: Ref<boolean> = ref(false);
    const changePanelVisibility = (): void => {
      isPanelVisible.value = !isPanelVisible.value;
    };

    const onClose = (): void => {
      isPanelVisible.value = false;
    };

    return {
      isPanelVisible,
      changePanelVisibility,
      onClose,
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
