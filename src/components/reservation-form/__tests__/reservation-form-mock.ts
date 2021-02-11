import { ReservationFormConfiguration } from '@/components/reservation-form/reservation-form.types';

export const reservationFormConfigurationMock: ReservationFormConfiguration = {
  availableDates: [ '2021-02-10', '2021-02-28' ],
  disabledDates: [ '2021-02-08', '2021-02-09' ],
  price: 100,
  rating: 4,
  reviews: 50,
  selectedDates: [ '2021-02-12', '2021-02-18' ],
};
