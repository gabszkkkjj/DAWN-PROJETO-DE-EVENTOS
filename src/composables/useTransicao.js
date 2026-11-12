import { ref } from 'vue'

// 'idle' | 'cobre' | 'revela'
export const fase = ref('idle')
let ocupado = false

const reduzMovimento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const esperar = (ms) => new Promise((r) => setTimeout(r, ms))

// Chamado ANTES de trocar de rota. Retorna false se já houver uma transição em andamento.
export async function cobrir() {
  if (ocupado) return false
  if (reduzMovimento()) return true
  ocupado = true
  fase.value = 'cobre'
  await esperar(650)
  return true
}

// Chamado DEPOIS de a rota trocar.
export function revelar() {
  if (!ocupado) return
  fase.value = 'revela'
  setTimeout(() => {
    fase.value = 'idle'
    ocupado = false
  }, 750)
}
