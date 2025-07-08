import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Items from "../components/Items.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  if (requiresAuth && !user) {
    return next({ name: "Login" });
  }

  if (requiresGuest && user) {
    return next({ name: "Items" });
  }

  return next();
});

export default router;
