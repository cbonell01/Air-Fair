import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Mainpage from '@/components/Mainpage'
import Reports from '@/components/Reports'
import FlightPlans from '@/components/FlightPlans'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Mainpage
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/mainpage',
      name: 'mainpage',
      component: Mainpage
    },
    {
      path: '/flightplans',
      name: 'flightplans',
      component: FlightPlans
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
