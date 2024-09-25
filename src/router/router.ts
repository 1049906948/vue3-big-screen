import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/Screen",
    name: "Screen",
    component: () => import("@/pages/screen/Screen.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/index.vue"),
  },
  {
    path: "/tailwind",
    name: "tailwind",
    component: () => import("@/views/tailwind/index.vue"),
  },
  {
    path: "/web3",
    name: "web3",
    component: () => import("@/views/web/test.vue"),
  },
  {
    path: "/grid",
    name: "grid",
    component: () => import("@/views/grid/index.vue"),
  },
  {
    path: "/examples",
    name: "examples",
    component: () => import("@/views/examples/index.vue"),
  },
  {
    path: "/three",
    name: "three",
    component: () => import("@/views/three/index.vue"),
  },
  {
    path: "/webgl",
    name: "webgl",
    component: () => import("@/views/webgl/index.vue"),
  },
  {
    path: "/element",
    name: "element",
    component: () => import("@/views/element/index.vue"),
  },
  {
    path: "/table",
    name: "table",
    component: () => import("@/views/table/index.vue"),
  },
  {
    path: "/barrage",
    name: "barrage",
    component: () => import("@/views/barrage/index.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/index.vue"),
  },
  {
    path: "/form",
    name: "form",
    component: () => import("@/views/form/index.vue"),
  },
  {
    path: "/dragdropGrid",
    name: "dragdropGrid",
    component: () => import("@/views/dragdropGrid/index.vue"),
  },
  {
    path: "/collection",
    name: "collection",
    component: () => import("@/views/collection/index.vue"),
  },
  {
    path: "/interview",
    name: "interview",
    component: () => import("@/views/interview/index.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/map/index.vue"),
  },
  {
    path: "/animation",
    name: "animation",
    component: () => import("@/views/animation/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/record",
    name: "record",
    component: () => import("@/views/record/index.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
