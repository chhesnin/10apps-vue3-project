// *可以拿掉createWebHashHistory的Hash
import { createRouter, createWebHistory } from "vue-router";
import MarvelHeroes from "@/pages/MarvelHeroes";
import AppCalendar from "@/pages/AppCalendar";
import AppHome from "@/pages/AppHome";
import AppMarkdown from "@/pages/AppMarkdown";
import AppSlider from "@/pages/AppSlider";
import AppCalculator from "@/pages/AppCalculator";
import ReusableModal from "@/pages/ReusableModal";
import RealtimeChat from "@/pages/RealtimeChat";
import UserCrud from "@/pages/UserCrud";
import ObjectDetection from "@/pages/ObjectDetection";
import store from "@/store";

const routes = [
  {
    path: "/",
    component: AppHome,
  },
  {
    path: "/marvel-heroes",
    component: MarvelHeroes,
  },
  {
    path: "/app-calendar",
    component: AppCalendar,
  },
  {
    path: "/app-markdown",
    component: AppMarkdown,
  },
  {
    path: "/app-slider",
    component: AppSlider,
  },
  {
    path: "/app-calculator",
    component: AppCalculator,
    meta: { middleware: "auth" },
  },
  {
    path: "/reusable-modal",
    component: ReusableModal,
  },
  {
    path: "/realtime-chat",
    component: RealtimeChat,
    meta: { middleware: "auth" },
    // beforeEnter: (_,__,next)=>{
    //   if (!store.state.isLoggedIn){
    //     next("/");
    //   }else{
    //     next();
    //   }
    // }
  },
  {
    path: "/user-crud",
    component: UserCrud,
  },
  {
    path: "/object-detection",
    component: ObjectDetection,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    const middleware = require(`../middleware/${to.meta.middleware}`);
    if (middleware) {
      // *auth.js 必須 export "default" function
      middleware.default(next, store);
      // console.log(middleware);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
