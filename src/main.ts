import providers         from '@/providers';
import createApplication from './create-application';

const application = createApplication(providers);

application.$mount('#app');
