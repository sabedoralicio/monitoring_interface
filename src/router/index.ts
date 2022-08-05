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
  {
    path: "/api_get_kernel_status",
    name: "api_get_kernel_status",
    // route level code-splitting
    // this generates a separate chunk (api_get_kernel_status.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "api_get_kernel_status" */ "../views/APIGetKernelStatus.vue"),
  },
  {
    path: "/api_get_connections",
    name: "api_get_connections",
    // route level code-splitting
    // this generates a separate chunk (api_get_connections.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "api_get_connections" */ "../views/APIGetConnections.vue"),
  },
  {
    path: "/api_tics_per_ms",
    name: "api_tics_per_ms",
    // route level code-splitting
    // this generates a separate chunk (api_tics_per_ms.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "api_tics_per_ms" */ "../views/APITicsPerMs.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
