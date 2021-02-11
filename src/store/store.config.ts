import { Module }               from 'vuex';
import { applicationRootState } from '@/store/store.state';
import { mutations }            from '@/store/mutations/store.mutations';
import { ApplicationRootState } from '@/store/store.types';

const storeConfig: Module<ApplicationRootState, {}> = {
  state: applicationRootState,
  mutations,
  getters: {},
  actions: {},
};

export default storeConfig;
