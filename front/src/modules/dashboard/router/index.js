import tasksRoutes from './../modules/tasks/router'
// import profileRoutes from './../modules/profile/router'

const Dashboard = () => import('./../views/Dashboard.vue')

export default [
  {
    path: '/dashboard',
    component: Dashboard,
    // protegendo a rota
    meta: { requiresAuth: true },
    children: [
      ...tasksRoutes
      //   ...profileRoutes
    ]
  }
]
