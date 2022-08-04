import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MonitoringInterface from "../views/MonitoringInterface.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: MonitoringInterface,
  },
  {
    path: "/backend",
    name: "backend",
    // route level code-splitting
    // this generates a separate chunk (backend.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "backend" */ "../views/BackendView.vue"),
  },
  {
    path: "/selection",
    name: "selection",
    // route level code-splitting
    // this generates a separate chunk (selection.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "selection" */ "../views/SelectionView.vue"),
  },
  {
    path: "/view",
    name: "view",
    // route level code-splitting
    // this generates a separate chunk (view.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "view" */ "../views/ViewView.vue"),
  },
  {
    path: "/grafana",
    name: "grafana",
    // route level code-splitting
    // this generates a separate chunk (grafana.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "grafana" */ "../views/GrafanaView.vue"),
  },
  {
    path: "/help",
    name: "help",
    // route level code-splitting
    // this generates a separate chunk (help.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "help" */ "../views/HelpView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
