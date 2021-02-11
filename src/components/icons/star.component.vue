<template>
  <svg :class="[{
        'c-star--full': isFullStar,
      }]"
       class="c-star"
       viewBox="0 0 512 512"
       xmlns="http://www.w3.org/2000/svg">

    <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431
                     55.898,401.21 416.035,502.431 369.263,318.842" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'cStar',
  props: {
    isFullStar: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss"
       scoped>
.c-star {
  height: var(--default-icon-height);
  width: var(--default-icon-width);

  polygon {
    fill: rgb(var(--grey-500));
  }

  &--full {
    polygon {
      fill: rgb(var(--green-500));
    }
  }
}
</style>
