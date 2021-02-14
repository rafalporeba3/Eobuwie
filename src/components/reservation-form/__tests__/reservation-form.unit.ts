import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import CompositionApi                            from '@vue/composition-api';
import { reservationFormConfigurationMock }      from '@/components/reservation-form/__tests__/reservation-form-mock';
import cPrice                                    from '@/components/price/price.component.vue';
import cReviews                                  from '@/components/reviews/reviews.component.vue';
import cReservationForm                          from '../reservation-form.component.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);

describe('Reservation form', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(cReservationForm, {
      localVue,
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

  it('should contain cReviews component', () => {
    const reviewsComponent: Wrapper<any> = wrapper.findComponent(cReviews);

    expect(reviewsComponent.exists())
      .toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
