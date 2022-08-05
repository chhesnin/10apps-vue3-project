// *可以拿掉createWebHashHistory的Hash
import { createRouter, createWebHistory } from "vue-router"
import MarvelHeroes from "@/pages/MarvelHeroes"
import AppCalendar from "@/pages/AppCalendar"
import AppHome from "@/pages/AppHome"

const routes = [
  {
    path: "/home",
    component: AppHome
  },
  {
    path: '/marvel-heroes',
    component: MarvelHeroes
  },
  {
    path: '/app-calendar',
    component: AppCalendar
  }
]

const router = createRouter({
  // *可以拿掉Hash
  history: createWebHistory(),
  routes,
})

export default router;