import { shallowMount, Wrapper } from '@vue/test-utils';
import cDatePickerDayOfWeek      from '../date-picker-day-of-week.component.vue';

describe('Date picker day of week component', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(cDatePickerDayOfWeek, {
      propsData: {
        dayOfWeek: 'Mon',
      },
    });
  });

  it('should render element with correct class', () => {
    expect(wrapper.classes())
      .toContain('c-date-picker-day-of-week');
  });

  it('should match snapshot', () => {
    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
