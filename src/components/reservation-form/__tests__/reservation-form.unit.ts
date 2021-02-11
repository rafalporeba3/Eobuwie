import { shallowMount, Wrapper }            from '@vue/test-utils';
import { reservationFormConfigurationMock } from '@/components/reservation-form/__tests__/reservation-form-mock';
import cPrice                               from '@/components/price/price.component.vue';
import cReservationForm                     from '../reservation-form.component.vue';

describe('Reservation form', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(cReservationForm, {
      propsData: { reservationFormConfiguration: reservationFormConfigurationMock },
    });
  });

  it('should render cReservationForm component with proper class', () => {
    const reservationFormComponent: Wrapper<any> = wrapper.findComponent(cReservationForm);

    expect(reservationFormComponent.exists())
      .toBeTruthy();

    expect(reservationFormComponent.classes())
      .toContain('c-reservation-form');
  });

  it('should contain cPrice component', () => {
    const priceComponent: Wrapper<any> = wrapper.findComponent(cPrice);

    expect(priceComponent.exists())
      .toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
