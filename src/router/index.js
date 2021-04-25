import Vue from 'vue'
import VueRouter from 'vue-router'
import Todolist from '../views/Todolist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todolist',
    component: Todolist,
    children: [
      {
        path: "all",
        name: "All",
        // component: () => import("../components/All.vue")
      },
      {
        path: "unfinish",
        name: "Unfinish",
        component: () => import("../components/Unfinish.vue")
      },
      {
        path: "finished",
        name: "Finished",
        component: () => import("../components/Finished.vue")
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
