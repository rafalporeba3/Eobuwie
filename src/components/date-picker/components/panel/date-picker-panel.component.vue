<template>
  <div class="c-date-picker-panel">
    <div class="c-date-picker-panel__header"
         v-if="$slots.header">

      <slot name="header" />
    </div>

    <div class="c-date-picker-panel__content"
         v-if="$slots.content">

      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'cDatePickerPanel',
});
</script>

<style lang="scss"
       scoped>

.c-date-picker-panel {
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(100%);

  &__header {
    background-color: rgb(var(--primary-green));
    padding: $f13 $f21;
    color: rgb(var(--white));
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: $f1 solid rgb(var(--primary-green));
  }

  &__content {
    display: grid;
    padding: $f13 $f21;
    justify-items: center;
    align-items: center;
    grid-row-gap: $f13;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    background-color: rgb(var(--white));
    grid-template-rows: minmax(0, 1fr);
    border: $f1 solid rgba(var(--grey-500), .5);
  }
}

</style>
