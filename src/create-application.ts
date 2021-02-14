import Vue                       from 'vue';
import Vuex                      from 'vuex';
import Router                    from 'vue-router';
import { Plugin }                from 'vue-fragment';
import VueCompositionApi         from '@vue/composition-api';
import Root                      from '@/root/root.vue';
import routerRoutes              from '@/router/router.routes';
import { clickOutsideDirective } from '@/directives/click-outside/click-outside.directive';
import storeConfig               from './store/store.config';
import { Providers }             from './providers';

const createApplication = (providers: Providers) => {
  Vue.use(VueCompositionApi);
  Vue.use(Vuex);
  Vue.use(Router);
  Vue.use(Plugin);
  Vue.directive('click-outside', clickOutsideDirective);

  Vue.config.productionTip = false;

  // eslint-disable-next-line no-param-reassign
  providers.store = new Vuex.Store(storeConfig);

  // eslint-disable-next-line no-param-reassign
  providers.router = new Router(routerRoutes);

  const application = new Vue({
    router: providers.router,
    render: (h) => h(Root),
  });

  return application;
};

export default createApplication;
