<template>
  <div class="c-price">
    <span class="c-price__value">{{ price }}</span>
    <span class="c-price__currency">{{ currency }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { useGlobals }                from '@/hooks/use-globals';
import { Computed }                  from '@/types';

export default defineComponent({
  name: 'cPrice',
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const { store } = useGlobals();
    const currency: Computed<string> = computed(() => store.state.currency);

    return {
      currency,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.c-price {
  &__value {
    font-weight: var(--font-bold);
    font-size: var(--font-size-20);
  }

  &__currency {
    margin-left: $f3;
    font-weight: var(--font-bold);
    font-size: var(--font-size-20);
  }
}

</style>
