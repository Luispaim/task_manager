import Vue from 'vue'
import Router from 'vue-router'

import { AUTH_TOKEN } from '@/axios'
import AuthService from '@/modules/auth/services/auth-service'
import authRoutes from '@/modules/auth/router'
import dashboardRoutes from '@/modules/dashboard/router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...authRoutes,
    ...dashboardRoutes,
    { path: '', redirect: 'dashboard/tasks' }
  ]
})

// toda vez que eu dou um f5 eu verifico se o token é válido
router.beforeEach(async (to, from, next) => {
  // Se a rota(pai ou filhas) que estou acessando é protegida (se contém a propriedade requiresAuth)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // constante que busca o token do usuário no localstorage
    const token = window.localStorage.getItem(AUTH_TOKEN)
    // constante que configura a rota que vamos fazer o redirect se necessário
    const loginRoute = {
      path: '/login',
      query: { redirect: to.fullPath }
    }
    // se eu tiver o token
    if (token) {
      // se tiver o token preciso verificar se ele é válido
      // vou verificar o token diretamente na api e não no cache
      if (await AuthService.verify({ token: token })) {
        // vai para página que deseja acessar
        return next()
      }
      // vai para rota de login
      return next(loginRoute)
    }
    // vai para rota de login
    return next(loginRoute)
  }
  // vai para rota que eu quero acessar
  next()
})

export default router
