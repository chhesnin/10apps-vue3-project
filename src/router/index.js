// *可以拿掉createWebHashHistory的Hash
import { createRouter, createWebHistory } from "vue-router"
import MarvelHeroes from "@/pages/MarvelHeroes"
import AppCalendar from "@/pages/AppCalendar"
import AppHome from "@/pages/AppHome"
import AppMarkdown from '@/pages/AppMarkdown'

const routes = [
  {
    path: "/",
    component: AppHome
  },
  {
    path: '/marvel-heroes',
    component: MarvelHeroes
  },
  {
    path: '/app-calendar',
    component: AppCalendar
  },
  {
    path: '/app-markdown',
    component: AppMarkdown
  },
]

const router = createRouter({
  // *可以拿掉Hash
  history: createWebHistory(),
  routes,
})

export default router;