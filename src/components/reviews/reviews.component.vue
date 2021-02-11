<template>
  <div class="c-reviews">
    <template v-for="starNumber in 5">
      <component :is="getComponentName(starNumber)"
                 :key="starNumber"
                 :is-full-star="starNumber <= rating" />
    </template>

    <span class="c-reviews__count">{{ reviews }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import cStarIcon           from '@/components/icons/star.component.vue';
import cStarHalfIcon       from '@/components/icons/star-half.component.vue';

export default defineComponent({
  name: 'cReviews',
  components: {
    cStarIcon,
    cStarHalfIcon,
  },
  props: {
    rating: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const getComponentName = (starNumber: number): string => {
      switch (true) {
      case starNumber - props.rating === 0.5:
        return 'c-star-half-icon';
      case starNumber <= props.rating:
      default:
        return 'c-star-icon';
      }
    };

    return {
      getComponentName,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.c-reviews {
  margin-top: $f8;
  display: flex;
  align-items: center;

  &__count {
    margin-left: $f5;
    font-size: var(--font-size-12);
    font-weight: var(--font-medium);
  }
}

</style>
