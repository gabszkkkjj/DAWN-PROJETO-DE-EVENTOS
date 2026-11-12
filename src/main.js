import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { iniciarAuth } from '@/composables/useAuth'
import { iniciarEventos } from '@/composables/useEventos'
import './assets/main.css'

await Promise.all([iniciarAuth(), iniciarEventos()])

createApp(App).use(router).mount('#app')