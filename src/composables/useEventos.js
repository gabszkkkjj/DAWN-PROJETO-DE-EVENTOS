import { ref, watch } from 'vue'
import { ler, gravar } from '@/db'

const CHAVE = 'eventos'

// Inscritos de exemplo (ids fictícios) para os contadores
const fakes = (n, prefixo) => Array.from({ length: n }, (_, i) => `${prefixo}-${i}`)

const EXEMPLOS = [
  { id: 1, titulo: 'Show na praça', local: 'Praça Central', data: '2026-11-14', descricao: '', inscritos: fakes(12, 's1'), criadorId: null },
  { id: 2, titulo: 'Feira de tecnologia', local: 'Centro de Convenções', data: '2026-11-21', descricao: '', inscritos: fakes(48, 's2'), criadorId: null },
  { id: 3, titulo: 'Noite de jogos', local: 'Biblioteca Municipal', data: '2026-12-05', descricao: '', inscritos: fakes(1, 's3'), criadorId: null },
  { id: 4, titulo: 'Corrida ao amanhecer', local: 'Parque da Cidade', data: '2026-12-12', descricao: '', inscritos: fakes(30, 's4'), criadorId: null },
]

const eventos = ref([])
let proxId = 1

export async function iniciarEventos() {
  eventos.value = await ler(CHAVE, EXEMPLOS)
  proxId = eventos.value.reduce((m, e) => Math.max(m, Number(e.id) || 0), 0) + 1
}

watch(eventos, (v) => gravar(CHAVE, v), { deep: true })

function hojeISO() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export function useEventos() {
  function criarEvento(dados, usuario) {
    if (!usuario) return null
    const evento = {
      id: proxId++,
      titulo: dados.titulo.trim(),
      local: dados.local.trim(),
      data: dados.data || hojeISO(),
      descricao: (dados.descricao || '').trim(),
      inscritos: [],
      criadorId: usuario.id,
    }
    eventos.value.unshift(evento)
    return evento
  }

  function atualizarEvento(id, dados, usuario) {
    const e = eventos.value.find((x) => x.id === id)
    if (!e || !usuario || e.criadorId !== usuario.id) return false
    e.titulo = dados.titulo.trim()
    e.local = dados.local.trim()
    e.data = dados.data || e.data
    e.descricao = (dados.descricao || '').trim()
    return true
  }

  function removerEvento(id, usuario) {
    const e = eventos.value.find((x) => x.id === id)
    if (!e || !usuario || e.criadorId !== usuario.id) return false
    eventos.value = eventos.value.filter((x) => x.id !== id)
    return true
  }

  function alternarInscricao(id, usuarioId) {
    if (!usuarioId) return
    const e = eventos.value.find((x) => x.id === id)
    if (!e) return
    const i = e.inscritos.indexOf(usuarioId)
    if (i === -1) e.inscritos.push(usuarioId)
    else e.inscritos.splice(i, 1)
  }

  return { eventos, criarEvento, atualizarEvento, removerEvento, alternarInscricao }
}