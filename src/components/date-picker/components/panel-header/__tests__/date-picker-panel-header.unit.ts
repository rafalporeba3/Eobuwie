import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import { Plugin }                                from 'vue-fragment';
import CompositionApi                            from '@vue/composition-api';
import cPreviousIcon                             from '@/components/icons/previous.component.vue';
import cNextIcon                                 from '@/components/icons/next.component.vue';
import { monthNames }                            from '@/components/date-picker/helpers/date-manager.variables';
import cDatePickerPanelHeader                    from '../date-picker-panel-header.component.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);
localVue.use(Plugin);

describe('Date picker panel header', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(cDatePickerPanelHeader, {
      localVue,
      propsData: {
        currentMonth: 2,
        currentYear: 2021,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should contain previous and next icons', () => {
    expect(wrapper.findComponent(cPreviousIcon)
      .exists())
      .toBeTruthy();

    expect(wrapper.findComponent(cNextIcon)
      .exists())
      .toBeTruthy();
  });

  it('should display correct year', () => {
    expect(wrapper.find('.c-date-picker-header__year')
      .text())
      .toBe('2021');
  });

  it('should display correct month', () => {
    expect(wrapper.find('.c-date-picker-header__month')
      .text())
      .toBe(monthNames[ 2 ]);
  });

  it('should emit event on previous icon click', async () => {
    jest.spyOn(wrapper.vm, 'onPreviousClick');

    await wrapper.findComponent(cPreviousIcon)
      .trigger('click');

    expect(wrapper.vm.onPreviousClick)
      .toHaveBeenCalled();

    expect(wrapper.emitted('onPreviousClick'))
      .toBeTruthy();
  });

  it('should emit event on next icon click', async () => {
    jest.spyOn(wrapper.vm, 'onNextClick');

    await wrapper.findComponent(cNextIcon)
      .trigger('click');

    expect(wrapper.vm.onNextClick)
      .toHaveBeenCalled();

    expect(wrapper.emitted('onNextClick'))
      .toBeTruthy();
  });
});
