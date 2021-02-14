<template>
  <div class="c-reservation-form">
    <c-price :price="reservationFormConfiguration.price" />

    <c-reviews :rating="reservationFormConfiguration.rating"
               :reviews="reservationFormConfiguration.reviews" />

    <c-separator />

    <c-date-picker :disabled-dates="reservationFormConfiguration.disabledDates"
                   :options="datePickerOptions"
                   :selected-dates="reservationFormConfiguration.selectedDates"
                   @onSelectedDateUpdate="onDateUpdate" />

    <c-button class="c-button"
              @click.native="onFormSubmit">
      Submit
    </c-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from '@vue/composition-api';
import cPrice                                  from '@/components/price/price.component.vue';
import cReviews                                from '@/components/reviews/reviews.component.vue';
import cSeparator                              from '@/components/separator/separator.component.vue';
import cDatePicker                             from '@/components/date-picker/date-picker.component.vue';
import cButton                                 from '@/components/button/button.component.vue';
import { ReservationFormConfiguration }        from '@/components/reservation-form/reservation-form.types';
import { DatePickerOptions }                   from '@/components/date-picker/date-picker.types';

export default defineComponent({
  name: 'cReservationForm',
  components: {
    cPrice,
    cReviews,
    cSeparator,
    cDatePicker,
    cButton,
  },
  props: {
    reservationFormConfiguration: {
      type: Object as PropType<ReservationFormConfiguration>,
      required: true,
    },
  },
  setup(props, context) {
    const selectedDates: Ref<string[]> = ref([]);

    const datePickerOptions: DatePickerOptions = {
      endPlaceholder: 'Check Out',
      startPlaceholder: 'Check In',
      title: 'Dates',
    };

    const onDateUpdate = (dateRange: string[]): void => {
      selectedDates.value = dateRange;
    };

    const onFormSubmit = (): void => {
      context.emit('onFormSubmit', selectedDates.value.length ? selectedDates.value : props.reservationFormConfiguration.selectedDates);
    };

    return {
      datePickerOptions,
      onDateUpdate,
      onFormSubmit,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.c-reservation-form {
  padding: $f13;
  border: $f1 solid rgb(var(--grey-500));
  background-color: rgb(var(--primary-grey));
  display: flex;
  flex-direction: column;
  min-width: 34rem;
  position: relative;

  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: -$f1;
    left: -$f1;
    right: -$f1;
    bottom: -$f1;
    box-shadow: 0 0 0 $f34 rgb(var(--primary-grey));;
  }

  .c-button {
    margin-top: $f21;
  }
}
</style>
