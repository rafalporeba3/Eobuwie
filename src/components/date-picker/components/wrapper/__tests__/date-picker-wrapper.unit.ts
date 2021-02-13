import { createLocalVue, Wrapper }   from '@vue/test-utils';
import Vuex                          from 'vuex';
import CompositionApi                from '@vue/composition-api';
import { createTestInstanceShallow } from '@/__tests__/factory';
import cDatePickerWrapper            from '../date-picker-wrapper.component.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);
localVue.use(Vuex);

describe('Date picker wrapper component', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    const { wrapperInstance } = createTestInstanceShallow(cDatePickerWrapper, {
      localVue,
      propsData: {
        title: 'Test',
      },
      slots: {
        default: '<span>Test slot</span>',
      },
    });

    wrapper = wrapperInstance;
  });

  it('should render cDatePickerWrapper component with correct class', () => {
    expect(wrapper.classes())
      .toContain('c-date-picker-wrapper');
  });

  it('should render title element', () => {
    const titleElement: Wrapper<any> = wrapper.find('.c-date-picker-wrapper__title');

    expect(titleElement.text())
      .toBe('Test');
  });

  it('should render slot when it has been passed', () => {
    expect(wrapper.text())
      .toContain('Test slot');
  });

  it('should match snapshot', () => {
    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
