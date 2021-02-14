<template>
  <div class="v-dashboard">
    <c-reservation-form :reservationFormConfiguration="reservationFormConfiguration"
                        @onFormSubmit="onFormSubmit" />

    <section class="v-dashboard__visualization">
      <span class="v-dashboard__visualization__key">Configuration:</span>

      <div v-for="(value, key) in reservationFormConfiguration"
           :key="key"
           class="v-dashboard__visualization__wrapper">

        <span class="v-dashboard__visualization__key">{{ key }}: </span>
        <span>{{ value }}</span>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive }    from '@vue/composition-api';
import cReservationForm                 from '@/components/reservation-form/reservation-form.component.vue';
import { ReservationFormConfiguration } from '@/components/reservation-form/reservation-form.types';

export default defineComponent({
  name: 'vDashboard',
  components: {
    cReservationForm,
  },
  setup() {
    const reservationFormConfiguration: ReservationFormConfiguration = reactive({
      disabledDates: [ '2021-02-02', '2021-02-08' ],
      price: 298,
      rating: 4.5,
      reviews: 123,
      selectedDates: [ '2021-02-18', '2021-02-23' ],
    });

    const onFormSubmit = (dateRange: string[]): void => {
      reservationFormConfiguration.selectedDates = dateRange;
    };
    return {
      reservationFormConfiguration,
      onFormSubmit,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.v-dashboard {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin: $f144;
  justify-content: center;

  &__visualization {
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--primary-grey));
    padding: $f21;
    margin-left: $f144;

    &__wrapper {
      padding: $f3 0;
    }

    &__key {
      &:first-of-type {
        margin-bottom: $f13;
      }

      font-weight: var(--font-bold);
      margin-right: $f5;
    }
  }
}
</style>
