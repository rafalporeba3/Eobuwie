import Vue                       from 'vue';
import { Plugin }                from 'vue-fragment';
import VueCompositionApi         from '@vue/composition-api';
import Root                      from '@/root/root.vue';
import { clickOutsideDirective } from '@/directives/click-outside/click-outside.directive';

const createApplication = () => {
  Vue.use(VueCompositionApi);
  Vue.use(Plugin);
  Vue.directive('click-outside', clickOutsideDirective);

  Vue.config.productionTip = false;

  const application = new Vue({
    render: (h) => h(Root),
  });

  return application;
};

export default createApplication;
