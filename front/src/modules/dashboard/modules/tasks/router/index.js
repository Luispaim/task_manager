const TasksHome = () => import('./../views/TasksHome.vue')

// /dashboard/records
// /dashboard/home
// /dashboard

export default [
  {
    path: 'tasks',
    component: TasksHome,
    meta: { requiresAuth: true },
    alias: ['home', '']
  }
]
