import { createLocalVue, Wrapper }   from '@vue/test-utils';
import Vuex                          from 'vuex';
import CompositionApi                from '@vue/composition-api';
import { createTestInstanceShallow } from '@/__tests__/factory';
import { clickOutsideDirective }     from '@/directives/click-outside/click-outside.directive';
import cDatePicker                   from '../date-picker.component.vue';
import cDatePickerWrapper            from '../components/wrapper/date-picker-wrapper.component.vue';
import cDatePickerEditor             from '../components/editor/date-picker-editor.component.vue';
import cDatePickerPanel              from '../components/panel/date-picker-panel.component.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);
localVue.use(Vuex);
localVue.directive('click-outside', clickOutsideDirective);

describe('Date picker component', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    const { wrapperInstance } = createTestInstanceShallow(cDatePicker, {
      localVue,
      propsData: {
        options: {},
        selectedDates: [],
        disabledDates: [],
      },
    });

    wrapper = wrapperInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render cDatePicker component with correct class', () => {
    expect(wrapper.classes())
      .toContain('c-date-picker');
  });

  it('should contain core child components', () => {
    expect(wrapper.findComponent(cDatePickerWrapper)
      .exists())
      .toBeTruthy();
    expect(wrapper.findComponent(cDatePickerEditor)
      .exists())
      .toBeTruthy();
    expect(wrapper.findComponent(cDatePickerPanel)
      .exists())
      .toBeTruthy();
  });

  it('should update panelVisibility on cDatePickerEditor click', async () => {
    const datePickerEditor: Wrapper<any> = wrapper.findComponent(cDatePickerEditor);
    jest.spyOn(wrapper.vm, 'changePanelVisibility');

    await datePickerEditor.trigger('click');

    expect(wrapper.vm.changePanelVisibility)
      .toHaveBeenCalled();

    expect(wrapper.vm.isPanelVisible)
      .toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
