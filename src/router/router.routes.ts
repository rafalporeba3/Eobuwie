import { RouterOptions } from 'vue-router';
import vDashboard        from '@/views/dashboard/dashboard.route';

const routerRoutes: RouterOptions = ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    vDashboard,
  ],
});

export default routerRoutes;
