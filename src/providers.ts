import { VueRouter } from 'vue-router/types/router';
import { Store }     from 'vuex';
import { RootState } from '@/store/store.types';

export interface Providers {
  router: VueRouter | null;
  store: Store<RootState> | null;
}

const providers: Providers = {
  store: null,
  router: null,
};

export default providers;
