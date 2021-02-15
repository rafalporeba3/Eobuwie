<template>
  <div :class="{'c-date-picker-editor--active': isPanelVisible }"
       class="c-date-picker-editor">

    <span :class="getClassIfElementIsActive(startPlaceholder)"
          class="c-date-picker-editor__placeholder">{{ startPlaceholder }}</span>

    <c-arrow-right-icon />

    <span :class="getClassIfElementIsActive(endPlaceholder)"
          class="c-date-picker-editor__placeholder">{{ endPlaceholder }}</span>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent }        from '@vue/composition-api';
import cArrowRightIcon            from '@/components/icons/arrow-right.component.vue';
import { DatePickerPlaceholders } from '../../helpers/date-manager.variables';

export default defineComponent({
  name: 'cDatePickerEditor',
  components: {
    cArrowRightIcon,
  },
  props: {
    startPlaceholder: {
      type: String,
      default: DatePickerPlaceholders.START,
    },
    endPlaceholder: {
      type: String,
      default: DatePickerPlaceholders.END,
    },
    isPanelVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const isPlaceholderActive = (placeholder: string): boolean => !([ DatePickerPlaceholders.START, DatePickerPlaceholders.END ] as string[]).includes(placeholder);
    const getClassIfElementIsActive = (placeholder: string): string | null => (isPlaceholderActive(placeholder) ? 'c-date-picker-editor__placeholder--active' : null);

    return {
      getClassIfElementIsActive,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.c-date-picker-editor {
  @include fast-transition(border-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: $f8 0;
  padding: $f5;
  border: $f1 solid rgb(var(--grey-500));
  cursor: pointer;

  &--active {
    @include fast-transition(border-color);
    border-color: rgb(var(--primary-green));

    .c-arrow-right {
      @include fast-transition(color);
      color: rgb(var(--primary-green));
    }
  }

  &__placeholder {
    font-size: var(--font-size-14);
    font-weight: var(--font-regular);
    padding: $f2 $f5;
    flex: 0 0 40%;

    &--active {
      background-color: rgba(var(--primary-green), .4);
      color: rgb(var(--green-500));
    }
  }
}

.c-arrow-right {
  @include fast-transition(color);
  width: $f21;
  height: $f21;
  color: rgb(var(--grey-500));
}
</style>
