import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/views/user/Home.vue';
import Dashboard from "@/views/admin/Dashboard.vue";
import Course from "@/views/admin/Course.vue";
import Module from "@/views/admin/Module.vue";
import ListCourse from "@/views/user/Course.vue"; 
import Chapter from "@/views/user/Chapter.vue"
import Question from "@/views/admin/Question.vue";
import LoginUser from "@/views/user/LoginUser.vue";
import RegisterPage from "@/views/user/Register.vue";
const routes = [
  { path: "/", component: HomePage, name: "Home" },
  { path: "/login", component: LoginUser, name: "LoginUser" },
  { path: "/register", component: RegisterPage, name: "Register" },
  { path: "/course", component: ListCourse, name: "ListCourse"},
  { path: "/chapter", component: Chapter, name: "Chapter" },
  { path: "/admin", component: Dashboard, name: "Admin" },
  { path: "/admin/course/:id", component: Course, name: "Course" },
  { path: "/admin/module/:id", component: Module, name: "Module" },
  { path: "/admin/module/:idModule/questions/:idQuestion", component: Question, name: "Question" },

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
