<template>
  <div class="c-date-picker-wrapper">
    <span v-if="title"
          class="c-date-picker-wrapper__title">

      {{ title }}
    </span>

    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'cDatePickerWrapper',
  props: {
    title: {
      type: String,
      required: false,
    },
  },
});
</script>

<style lang="scss"
       scoped>

.c-date-picker-wrapper {
  display: flex;
  flex-direction: column;

  &__title {
    font-size: var(--font-size-12);
    font-weight: var(--font-bold);
  }
}

</style>
