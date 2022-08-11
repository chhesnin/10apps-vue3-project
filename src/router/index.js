// *可以拿掉createWebHashHistory的Hash
import { createRouter, createWebHistory } from "vue-router"
import MarvelHeroes from "@/pages/MarvelHeroes"
import AppCalendar from "@/pages/AppCalendar"
import AppHome from "@/pages/AppHome"
import AppMarkdown from "@/pages/AppMarkdown"
import AppSlider from "@/pages/AppSlider"
import AppCalculator from "@/pages/AppCalculator"
import ReusableModal from "@/pages/ReusableModal"

const routes = [
  {
    path: "/",
    component: AppHome
  },
  {
    path: "/marvel-heroes",
    component: MarvelHeroes
  },
  {
    path: "/app-calendar",
    component: AppCalendar
  },
  {
    path: "/app-markdown",
    component: AppMarkdown
  },
  {
    path: "/app-slider",
    component: AppSlider
  },
  {
    path: "/app-calculator",
    component: AppCalculator
  },
  {
    path: "/reusable-modal",
    component: ReusableModal
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;