<template>
  <svg class="c-star-half"
       viewBox="0 0 512 512"
       xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad1">
        <stop :stop-color="activeColor"
              offset="0%" />
        <stop :stop-color="activeColor"
              offset="50%" />
        <stop :stop-color="disabledColor"
              offset="50%" />
        <stop :stop-color="disabledColor"
              offset="100%" />
      </linearGradient>
    </defs>

    <polygon fill="url(#grad1)"
             points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431
                     255.898,401.21 416.035,502.431 369.263,318.842"
             stroke="black"
             stroke-width="1.5" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'cStarHalf',
  setup() {
    const disabledColor: string = getComputedStyle(document.documentElement)
      .getPropertyValue('--root-grey-500');

    const activeColor: string = getComputedStyle(document.documentElement)
      .getPropertyValue('--root-green-500');

    return {
      disabledColor,
      activeColor,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.c-star-half {
  height: var(--default-icon-height);
  width: var(--default-icon-width);
}
</style>
