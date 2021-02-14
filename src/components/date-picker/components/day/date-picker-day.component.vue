<template>
  <div :class="{
          'c-date-picker-day--selected': isSelected,
          'c-date-picker-day--today': isToday,
          'c-date-picker-day--disabled': isDisabled,
          'c-date-picker-day--start': isStartDate,
          'c-date-picker-day--end': isEndDate,
       }"
       class="c-date-picker-day">

    {{ getDateDay }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { getDate }                   from 'date-fns';
import { Computed }                  from '@/types';

export default defineComponent({
  name: 'cDatePickerDay',
  props: {
    date: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    isToday: {
      type: Boolean,
      default: false,
    },
    isStartDate: {
      type: Boolean,
      default: false,
    },
    isEndDate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const getDateDay: Computed<number> = computed(() => getDate(new Date(props.date)));

    return { getDateDay };
  },
});
</script>

<style lang="scss"
       scoped>

.c-date-picker-day {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-regular);
  color: rgb(var(--black));
  font-size: var(--font-size-13);
  text-align: center;
  width: 100%;
  min-height: 37px;
  padding: $f8;
  cursor: pointer;

  &:not(&--disabled):not(&--selected):hover {
    color: rgb(var(--green-300));
  }

  &--end {
    border-radius: 0 50% 50% 0;
  }

  &--start {
    border-radius: 50% 0 0 50%;
  }

  &--today {
    border-radius: 50%;
    border: $f2 solid rgb(var(--green-300));
    background-color: transparent;
    color: rgb(var(--green-300));
  }

  &--today.c-date-picker-day--selected {
    position: relative;
    border: none;
    border-radius: 0;
  }

  &--disabled {
    cursor: not-allowed;
    background-color: rgb(var(--primary-grey));
  }

  &--selected {
    color: rgb(var(--green-500));
    background-color: rgba(var(--green-300), .2);

    &.c-date-picker-day--end,
    &.c-date-picker-day--start {
      position: relative;
      background-color: rgb(var(--green-300));
      border-radius: 50%;
      color: rgb(var(--white));

      &::before {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        z-index: -1;
        width: 50%;
        background-color: rgba(var(--green-300), .2);
      }
    }

    &.c-date-picker-day--end {
      &::before {
        left: 0;
      }
    }

    &.c-date-picker-day--start {
      &::before {
        right: 0;
      }
    }
  }
}

</style>
