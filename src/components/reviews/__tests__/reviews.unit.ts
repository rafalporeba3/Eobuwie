import { createLocalVue, Wrapper, WrapperArray } from '@vue/test-utils';
import Vuex                                      from 'vuex';
import { createTestInstanceShallow }             from '@/__tests__/factory';
import CompositionApi                            from '@vue/composition-api';
import cStarIcon                                 from '@/components/icons/star.component.vue';
import cReviews                                  from '../reviews.component.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);
localVue.use(Vuex);

describe('Reviews component', () => {
  let wrapper!: Wrapper<any>;

  beforeEach(() => {
    const {
      wrapperInstance,
    } = createTestInstanceShallow(cReviews, {
      localVue,
      propsData: {
        rating: 3.5,
        reviews: 123,
      },
    });
    wrapper = wrapperInstance;
  });

  it('should render cReviews component with proper class', () => {
    const reviewsComponent: Wrapper<any> = wrapper.findComponent(cReviews);

    expect(reviewsComponent.exists())
      .toBeTruthy();

    expect(reviewsComponent.classes())
      .toContain('c-reviews');
  });

  it('should get and display correct reviews', () => {
    const reviewsComponent: Wrapper<any> = wrapper.findComponent(cReviews);
    const reviewsCountElement: Wrapper<any> = wrapper.find('.c-reviews__count');

    expect(reviewsComponent.props('reviews'))
      .toBe(123);
    expect(reviewsCountElement.text())
      .toBe('123');
  });

  it('should display correct number of full stars', () => {
    const starComponents: WrapperArray<any> = wrapper.findAllComponents(cStarIcon);

    expect(starComponents.length)
      .toEqual(5);
  });

  it('should match snapshot', () => {
    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
