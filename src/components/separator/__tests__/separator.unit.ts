import { shallowMount, Wrapper } from '@vue/test-utils';
import cSeparator from '../separator.component.vue';

describe('Separator component', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(cSeparator);
  });

  it('should render component with correct class', () => {
    expect(wrapper.classes()).toContain('c-separator');
  });

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
