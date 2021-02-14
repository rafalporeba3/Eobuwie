import { shallowMount, Wrapper } from '@vue/test-utils';
import cButton                   from '../button.component.vue';

describe('Button component', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(cButton);
  });

  it('should render component with correct class', () => {
    expect(wrapper.classes())
      .toContain('c-button');
  });

  it('should match snapshot', () => {
    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
