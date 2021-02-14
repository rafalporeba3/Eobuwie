<template>
  <span class="c-date-picker-day-of-week">{{ dayOfWeek }}</span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'cDatePickerDayOfWeek',
  props: {
    dayOfWeek: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss"
       scoped>

.c-date-picker-day-of-week {
  font-weight: var(--font-regular);
  color: rgb(var(--grey-500));
  font-size: var(--font-size-13);
  text-align: center;
  width : 100%;
  min-height: 37px;
  padding: $f8;
}

</style>
