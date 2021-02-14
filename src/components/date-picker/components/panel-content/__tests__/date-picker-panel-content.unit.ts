import { createLocalVue, shallowMount, Wrapper, WrapperArray } from '@vue/test-utils';
import CompositionApi                                          from '@vue/composition-api';
import { Plugin }                                              from 'vue-fragment';
import { weekNames }                                           from '@/components/date-picker/helpers/date-manager.variables';
import cDatePickerPanelContent                                 from '../date-picker-panel-content.component.vue';
import cDatePickerDayOfWeek                                    from '../../day-of-week/date-picker-day-of-week.component.vue';
import cDatePickerDay                                          from '../../day/date-picker-day.component.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);
localVue.use(Plugin);

describe('Date picker panel content', () => {
  let wrapper!: Wrapper<any>;
  const currentMonthDays: string[] = [ '2021-02-15', '2021-02-16', '2021-02-17' ];

  beforeEach(() => {
    wrapper = shallowMount(cDatePickerPanelContent, {
      localVue,
      propsData: {
        currentMonthDays,
        isPanelVisible: true,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render c-date-picker-day-of-week components equivalent to the number of days of the week', () => {
    expect(wrapper.findAllComponents(cDatePickerDayOfWeek).length)
      .toEqual(weekNames.length);
  });

  it('should render c-date-picker-day components equivalent to the number of days of the current month', async () => {
    expect(wrapper.findAllComponents(cDatePickerDay).length)
      .toEqual(currentMonthDays.length);

    await wrapper.setProps({ currentMonthDays: [] });

    expect(wrapper.findAllComponents(cDatePickerDay).length)
      .toEqual(0);
  });

  it('should emit event on c-date-picker-day click', async () => {
    jest.spyOn(wrapper.vm, 'onDateClick');
    const allDatePickerDayComponents: WrapperArray<any> = wrapper.findAllComponents(cDatePickerDay);
    await allDatePickerDayComponents.wrappers[ 0 ].trigger('click');

    expect(wrapper.vm.onDateClick)
      .toHaveBeenCalledWith(currentMonthDays[ 0 ]);

    expect(wrapper.emitted('onDateClick'))
      .toEqual([[ currentMonthDays[ 0 ] ]]);

    await allDatePickerDayComponents.wrappers[ allDatePickerDayComponents.length - 1 ].trigger('click');

    expect(wrapper.vm.onDateClick)
      .toHaveBeenCalledWith(currentMonthDays[ currentMonthDays.length - 1 ]);
  });
});
