<template>
  <fragment>
    <c-previous-icon @click.native="onPreviousClick" />

    <div class="c-date-picker-header__content">
      <span class="c-date-picker-header__month">{{ currentMonthName }}</span>
      <span class="c-date-picker-header__year">{{ currentYear }}</span>
    </div>

    <c-next-icon @click.native="onNextClick" />
  </fragment>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import cPreviousIcon                 from '@/components/icons/previous.component.vue';
import cNextIcon                     from '@/components/icons/next.component.vue';
import { Computed }                  from '@/types';
import { monthNames }                from '@/components/date-picker/helpers/date-manager.variables';

export default defineComponent({
  name: 'cDatePickerPanelHeader',
  components: {
    cPreviousIcon,
    cNextIcon,
  },
  props: {
    currentMonth: {
      type: Number,
      required: true,
    },
    currentYear: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const currentMonthName: Computed<string> = computed(() => monthNames[ props.currentMonth ]);

    const onPreviousClick = (): void => {
      context.emit('onPreviousClick');
    };

    const onNextClick = (): void => {
      context.emit('onNextClick');
    };

    return {
      currentMonthName,
      onPreviousClick,
      onNextClick,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.c-date-picker-header {
  &__month,
  &__year {
    font-weight: var(--font-medium);
  }

  &__year {
    margin-left: $f5;
  }
}

.c-next,
.c-previous {
  width: $f13;
  height: $f13;
  cursor: pointer;
  color: rgb(var(--white));
  @include fast-transition(color);

  &:hover {
    @include fast-transition(color);
    color: rgb(var(--black));
  }
}

</style>
