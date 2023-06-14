import { createRouter, createWebHashHistory, } from 'vue-router'
import AppShow from "@/views/AppShow.vue"
import CryptoModule from "@/views/CryptoModule.vue"

const routes = [
  {
    path: '/',
    name: "home",
    redirect: "/app-show"
  },
  {
    path: '/app-show',
    name: "appShow",
    component: AppShow
  },
  {
    path: '/crypto-module',
    name: "cryptoModule",
    component: CryptoModule
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;