import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// components
import Main from "../components/Main";
import Dashboard from "../components/Dashboard";
import Employees from "../components/Employees";
import OneEmployee from "../components/OneEmployee";

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Dashboard',
      component: Main,
      children: [
        {
          path: '/dashboard',
          component: Dashboard
        },
        {
          path: '/employees',
          name: 'Employees',
          component: Employees
        },
        {
          path: '/oneemployee/:id',
          name: 'OneEmployee',
          component: OneEmployee
        },
      ]
    }
  ]
});

export default router;
