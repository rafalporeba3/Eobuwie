<template>
  <button v-bind="$listeners"
          class="c-button">

    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'cButton',
  props: {
    buttonType: {
      type: String,
      required: false,
    },
  },
});
</script>

<style lang="scss"
       scoped>

.c-button {
  @include fast-transition(background-color);
  border-radius: $f3;
  padding: $f13;
  border: none;
  background-color: rgb(var(--primary-red));
  color: rgb(var(--white));
  cursor: pointer;

  &,
  &:focus {
    outline: none;
  }

  &:hover {
    @include fast-transition(background-color);
    background-color: rgb(var(--primary-red), .8);
  }
}
</style>
