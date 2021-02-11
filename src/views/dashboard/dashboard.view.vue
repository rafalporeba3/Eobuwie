<template>
  <div class="v-dashboard">
    <div class="v-dashboard__wrapper">
      <c-reservation-form :reservationFormConfiguration="reservationFormConfiguration" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import cReservationForm              from '@/components/reservation-form/reservation-form.component.vue';
import { ReservationFormConfiguration } from '@/components/reservation-form/reservation-form.types';

export default defineComponent({
  name: 'vDashboard',
  components: {
    cReservationForm,
  },
  setup() {
    const reservationFormConfiguration: ReservationFormConfiguration = reactive({
      availableDates: [],
      disabledDates: [],
      price: 298,
      rating: 5,
      reviews: 123,
      selectedDates: [ '15.02.2021', '25.02.2021' ],
    });

    return {
      reservationFormConfiguration,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.v-dashboard {
  flex: 1;
  width: 100%;

  &__wrapper {
    margin: $f55 $f89 $f55;
    padding: $f34;
    width: 40rem;
    background-color: rgb(var(--primary-grey));
  }
}
</style>
