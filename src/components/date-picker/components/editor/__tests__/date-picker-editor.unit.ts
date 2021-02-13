import { createLocalVue, Wrapper }   from '@vue/test-utils';
import Vuex                          from 'vuex';
import CompositionApi                from '@vue/composition-api';
import { createTestInstanceShallow } from '@/__tests__/factory';
import cArrowRightIcon               from '@/components/icons/arrow-right.component.vue';
import cDatePickerEditor             from '../date-picker-editor.component.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);
localVue.use(Vuex);

describe('Date picker editor component', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    const { wrapperInstance } = createTestInstanceShallow(cDatePickerEditor, {
      localVue,
      propsData: {
        startPlaceholder: 'Start placeholder',
        endPlaceholder: 'End placeholder',
        isPanelVisible: false,
      },
    });

    wrapper = wrapperInstance;
  });

  it('should render cDatePickerEditor component with correct class', () => {
    expect(wrapper.classes())
      .toContain('c-date-picker-editor');
  });

  it('should add --active class to component when isPanelVisible is true', async () => {
    await wrapper.setProps({ isPanelVisible: true });

    expect(wrapper.classes())
      .toContain('c-date-picker-editor--active');
  });

  it('should display correct placeholders', () => {
    expect(wrapper.props('startPlaceholder')).toBe('Start placeholder');
    expect(wrapper.props('endPlaceholder')).toBe('End placeholder');
  });

  it('should display default placeholders when placeholder props are not defined', async () => {
    await wrapper.setProps({ startPlaceholder: undefined, endPlaceholder: undefined });
    expect(wrapper.props('startPlaceholder')).toBe('Start');
    expect(wrapper.props('endPlaceholder')).toBe('End');
  });

  it('should contain cArrowRightIcon', () => {
    expect(wrapper.findComponent(cArrowRightIcon)
      .exists())
      .toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
