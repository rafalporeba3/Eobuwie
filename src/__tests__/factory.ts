import { VueConstructor }       from 'vue';
import Vuex, { Store }          from 'vuex';
import merge                    from 'lodash-es/merge';
import cloneDeep                from 'lodash-es/cloneDeep';
import { shallowMount }         from '@vue/test-utils';
import { RootState }            from '@/store/store.types';
import providers, { Providers } from '@/providers';
import storeConfig              from '@/store/store.config';

export const createProvidersMock = (provide?: Providers): void => {
  providers.store = jest.fn()
    .mockImplementation(() => provide?.store || {})();
};

export function createTestEnvironment(overrides = { storeConfig: {}, router: {} }) {
  const store: Store<RootState> = new Vuex.Store(merge(cloneDeep(storeConfig), cloneDeep(overrides.storeConfig)));

  return {
    store,
  };
}

export const createProviders = (overrides = { storeConfig: {}, router: {} }): Providers => {
  const testEnvironment = createTestEnvironment(overrides);

  return {
    store: testEnvironment.store,
  };
};

export function createTestInstanceShallow(Component: VueConstructor, overrides?: any) {
  jest.resetModules();

  const provide: Providers = createProviders();
  const store = provide.store as Store<RootState>;

  createProvidersMock(provide);

  const wrapper = shallowMount(Component, merge({
    provide,
  }, overrides));

  return {
    wrapperInstance: wrapper,
    storeInstance: store,
  };
}
