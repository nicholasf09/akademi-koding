import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/user/Home.vue';
import Dashboard from "@/views/admin/Dashboard.vue";
import Course from "@/views/admin/Course.vue";
import Module from "@/views/admin/Module.vue";
const routes = [
  {path: "/home", component: Home, name: "Home"},
  {path: "/admin" , component: Dashboard, name: "Admin"},
  {path: "/admin/course/:id" , component: Course, name: "Course"},
  {path: "/admin/module/:id" , component: Module, name: "Module"},

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;