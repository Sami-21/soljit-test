import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CandidatesView from "../views/Candidates/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/candidates",
    name: "candidates",
    component: CandidatesView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
