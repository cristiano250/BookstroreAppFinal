import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import RealTimeChat from '../views/RealTimeChat.vue';
import firebase from 'firebase/compat/app';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
        requiresAuth: true
      }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
        requiresAuth: true
      }
  },
 {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
        requiresGuest: true
      }
  },
 {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
        requiresGuest: true
      }
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
        requiresAuth: true
      }
  },
   {
    path: '/RealTimeChat',
    name: 'RealTimeChat',
    component: RealTimeChat,
    meta: {
        requiresAuth: true
      }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});



export default router
