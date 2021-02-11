import Vuex                          from 'vuex';
import { createLocalVue, Wrapper }   from '@vue/test-utils';
import CompositionApi                from '@vue/composition-api';
import { createTestInstanceShallow } from '@/__tests__/factory';
import cPrice                        from '../price.component.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);
localVue.use(Vuex);

describe('Price component', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    const {
      wrapperInstance,
    } = createTestInstanceShallow(cPrice, {
      localVue,
      propsData: {
        price: 300,
      },
    });
    wrapper = wrapperInstance;
  });

  it('should render cReservationForm component with proper class', () => {
    const priceComponent: Wrapper<any> = wrapper.findComponent(cPrice);

    expect(priceComponent.exists())
      .toBeTruthy();

    expect(priceComponent.classes())
      .toContain('c-price');
  });

  it('should contain value and currency elements', () => {
    const valueElement = wrapper.find('.c-price__value');
    const currencyElement = wrapper.find('.c-price__currency');

    expect(valueElement.exists())
      .toBeTruthy();
    expect(currencyElement.exists())
      .toBeTruthy();
  });

  it('should contain correct value', () => {
    expect(wrapper.props('price'))
      .toBe(300);
  });

  it('should contain correct currency', () => {
    const currencyElement = wrapper.find('.c-price__currency');

    expect(currencyElement.text())
      .toBe('zł');
  });

  it('should match snapshot', () => {
    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
