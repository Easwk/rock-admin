import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/login/index";
import NotFoundPage from "../views/404";
import Layout from "../views/layout/index";
import Dashboard from "../views/dashboard/index";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { title: "Dashboard", icon: "el-icon-help" }
      }
    ]
  },
  {
    path: "/login",
    component: Index,
    hidden: true
  },
  {
    path: "/404",
    component: NotFoundPage,
    hidden: true
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
