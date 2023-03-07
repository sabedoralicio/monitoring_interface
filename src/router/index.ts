import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MonitoringInterface from "@/views/MonitoringInterface.vue";
import CPU_View from '@/views/CPU_View.vue';
import Memory_View from '@/views/Memory_View.vue';
import TileView from '@/views/TileView.vue';

const routes: Array<RouteRecordRaw> = [
  //  {
  //    path: "/",
  //    name: "home",
  //    component: MonitoringInterface,
  //  },
  {
    // path: "/backend",
    path: "/",
    name: "overall",
    // route level code-splitting
    // this generates a separate chunk (backend.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "backend" */ "@/views/OverallView.vue"),
  },
  {
    path: "/nest_api",
    name: "nest_api",
    // route level code-splitting
    // this generates a separate chunk (backend.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "nest_api" */ "@/views/NestAPIView.vue"),
  },
  {
    path: "/cpu",
    name: "cpu",
    // route level code-splitting
    // this generates a separate chunk (cpu.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(// webpackChunkName: "cpu"
             "@/views/CPUView.vue"),
  },
  {
    path: "/cpu_lore_all",
    name: "cpu_lore_all",
    // route level code-splitting
    // this generates a separate chunk (cpu.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "cpu" */ "@/views/AllCPUView.vue"),
  },
  {
    path: "/tile/:kind/:nr",
    name: "cpu_lore",
    component: TileView,
  },
  {
    path: "/mem",
    name: "mem",
    // route level code-splitting
    // this generates a separate chunk (mem.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
    import(// webpackChunkName: "mem"
	       "@/views/MemoryView.vue"),
  },
  {
    path: "/mem_lore_all",
    name: "mem_lore_all",
    // route level code-splitting
    // this generates a separate chunk (mem.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mem" */ "@/views/AllMemoryView.vue"),
  },
  {
    path: "/ringbuffer",
    name: "ringbuffer",
    // route level code-splitting
    // this generates a separate chunk (ringbuffer.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "ringbuffer" */ "@/views/RingbufferView.vue"),
  },
  {
    path: "/spikes",
    name: "spikes",
    // route level code-splitting
    // this generates a separate chunk (spikes.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "spikes" */ "@/views/SpikesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
