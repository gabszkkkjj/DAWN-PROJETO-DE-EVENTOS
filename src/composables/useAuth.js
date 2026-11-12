import { ref } from 'vue'
import { ler, gravar } from '@/db'

const CHAVE_USUARIOS = 'usuarios'
const CHAVE_SESSAO = 'sessao'

function novoId() {
  return globalThis.crypto?.randomUUID?.() ?? `u${Date.now()}${Math.random().toString(16).slice(2)}`
}

const usuarios = ref([])
const usuarioLogado = ref(null) // { id, nome, email }

export async function iniciarAuth() {
  usuarios.value = await ler(CHAVE_USUARIOS, [])
  usuarioLogado.value = await ler(CHAVE_SESSAO, null)
}

export function useAuth() {
  function cadastrar({ nome, email, senha }) {
    nome = (nome || '').trim()
    email = (email || '').trim().toLowerCase()

    if (!nome) return { ok: false, erro: 'Informe seu nome completo.' }
    if (!email) return { ok: false, erro: 'Informe um e-mail.' }
    if ((senha || '').length < 6) return { ok: false, erro: 'A senha precisa ter pelo menos 6 caracteres.' }
    if (usuarios.value.some((u) => u.email === email)) {
      return { ok: false, erro: 'Já existe uma conta com esse e-mail. Tente fazer login.' }
    }

    usuarios.value.push({ id: novoId(), nome, email, senha })
    gravar(CHAVE_USUARIOS, usuarios.value)
    return { ok: true }
  }

  function entrar(email, senha) {
    email = (email || '').trim().toLowerCase()
    const u = usuarios.value.find((x) => x.email === email && x.senha === senha)
    if (!u) return { ok: false, erro: 'E-mail ou senha incorretos.' }

    usuarioLogado.value = { id: u.id, nome: u.nome, email: u.email }
    gravar(CHAVE_SESSAO, usuarioLogado.value)
    return { ok: true }
  }

  function sair() {
    usuarioLogado.value = null
    gravar(CHAVE_SESSAO, null)
  }

  return { usuarioLogado, cadastrar, entrar, sair }
}