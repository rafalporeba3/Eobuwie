<template>
  <div class="c-reviews">
    <template v-for="starNumber in 5">
      <c-star-icon :key="starNumber"
                   :is-full-star="starNumber <= rating"
                   :is-half-star="starNumber - rating === 0.5" />
    </template>

    <span class="c-reviews__count">{{ reviews }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import cStarIcon           from '@/components/icons/star.component.vue';

export default defineComponent({
  name: 'cReviews',
  components: {
    cStarIcon,
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
    font-weight: var(--font-bold);
  }
}

</style>
