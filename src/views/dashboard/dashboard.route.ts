import { RouteConfig } from 'vue-router';

export const name = 'vDashboard';
export const path = '/';

const route: RouteConfig = {
  name,
  path,
  component: () => import(/* webpackChunkName: 'views/dashboard' */ './dashboard.view.vue'),
};

export default route;
