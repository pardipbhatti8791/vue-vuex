import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '../views/EventCreate'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'eventList',
    component: EventList
  },
  {
    path: '/create-event',
    name: 'eventCreate',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: EventCreate
  },
  {
    path: '/event-details/:id',
    name: 'eventShow',
    component: EventShow,
    props: true
  },
  {
    path: '/user/:username',
    name: 'user',
    component: User,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
