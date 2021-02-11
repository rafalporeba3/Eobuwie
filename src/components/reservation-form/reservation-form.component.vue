<template>
  <div class="c-reservation-form">
    <c-price :price="reservationFormConfiguration.price" />

    <c-reviews :rating="reservationFormConfiguration.rating"
               :reviews="reservationFormConfiguration.reviews" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType }    from '@vue/composition-api';
import cPrice                           from '@/components/price/price.component.vue';
import cReviews                         from '@/components/reviews/reviews.component.vue';
import { ReservationFormConfiguration } from '@/components/reservation-form/reservation-form.types';

export default defineComponent({
  name: 'cReservationForm',
  components: {
    cPrice,
    cReviews,
  },
  props: {
    reservationFormConfiguration: {
      type: Object as PropType<ReservationFormConfiguration>,
      required: true,
    },
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
}
</style>
