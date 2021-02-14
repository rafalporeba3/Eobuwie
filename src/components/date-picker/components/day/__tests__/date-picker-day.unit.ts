import { shallowMount, Wrapper } from '@vue/test-utils';
import cDatePickerDay            from '../date-picker-day.component.vue';

describe('Date picker day component', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(cDatePickerDay, {
      propsData: {
        date: '2021-02-15',
        isDisabled: false,
        isSelected: false,
        isToday: false,
        isStartDate: false,
        isEndDate: false,
      },
    });
  });

  it('should render element with correct class', () => {
    expect(wrapper.classes())
      .toContain('c-date-picker-day');
  });

  it('should contain correct class for isDisabled', async () => {
    await wrapper.setProps({ isDisabled: true });

    expect(wrapper.classes())
      .toContain('c-date-picker-day--disabled');
  });

  it('should contain correct class for isSelectedProp', async () => {
    await wrapper.setProps({ isSelected: true });

    expect(wrapper.classes())
      .toContain('c-date-picker-day--selected');
  });
  it('should contain correct class for isToday', async () => {
    await wrapper.setProps({ isToday: true });

    expect(wrapper.classes())
      .toContain('c-date-picker-day--today');
  });
  it('should contain correct class for isStartDate', async () => {
    await wrapper.setProps({ isStartDate: true });

    expect(wrapper.classes())
      .toContain('c-date-picker-day--start');
  });
  it('should contain correct class for isEndDate', async () => {
    await wrapper.setProps({ isEndDate: true });

    expect(wrapper.classes())
      .toContain('c-date-picker-day--end');
  });

  it('should match snapshot', () => {
    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
