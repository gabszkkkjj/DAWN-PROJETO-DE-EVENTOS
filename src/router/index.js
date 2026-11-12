import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { cobrir, revelar } from '@/composables/useTransicao'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'init', component: () => import('@/views/InitView.vue') },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/cadastro', name: 'cadastro', component: () => import('@/views/RegisterView.vue') },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requerLogin: true },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach(async (to, from) => {
  const { usuarioLogado } = useAuth()

  if (to.meta.requerLogin && !usuarioLogado.value) return { name: 'login' }

  // Primeira carga e mudança só de query não usam a cortina
  if (from === START_LOCATION || to.path === from.path) return true

  return await cobrir() // false ignora cliques durante uma transição
})

router.afterEach(() => revelar())

export default router
