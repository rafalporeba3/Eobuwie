import { Store }                from 'vuex';
import { VueRouter }            from 'vue-router/types/router';
import { RootState }            from '@/store/store.types';
import providers, { Providers } from '@/providers';

export interface GlobalContexts extends Providers {
  router: VueRouter;
  store: Store<RootState>;
}

export const useGlobals = (): GlobalContexts => ({
  router: providers.router as VueRouter,
  store: providers.store as Store<RootState>,
});
