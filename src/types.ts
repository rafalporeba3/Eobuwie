import { Ref } from '@vue/composition-api';

export type Computed<T> = Readonly<Ref<Readonly<T>>> | Ref<Readonly<T>>;
