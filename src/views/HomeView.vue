<template>
  <div class="home">
    <header class="topo malha">
      <div class="topo__c">
        <div>
          <p class="marca">DAWN.</p>
          <h2>Eventos disponíveis</h2>
        </div>
        <div class="topo__u">
          <span>Olá, {{ usuarioLogado ? usuarioLogado.nome : 'Visitante' }}</span>
          <button class="btn btn--creme" @click="aberto = !aberto">
            {{ aberto ? 'Fechar' : 'Novo evento' }}
          </button>
          <button class="btn btn--contorno" @click="fazerSair">Sair</button>
        </div>
      </div>
    </header>

    <section class="conteudo">
      <div class="painel" :class="{ aberto }" :inert="aberto ? null : ''">
        <div>
          <form class="form" @submit.prevent="salvarEvento">
            <h3>{{ editandoId ? 'Editar evento' : 'Novo evento' }}</h3>
            <label>
              Título
              <input v-model="form.titulo" placeholder="Ex.: Show na praça" required />
            </label>
            <div class="linha2">
              <label>
                Data
                <input v-model="form.data" type="date" required />
              </label>
              <label>
                Local
                <input v-model="form.local" placeholder="Onde vai acontecer" required />
              </label>
            </div>
            <label>
              Descrição (opcional)
              <textarea v-model="form.descricao" rows="2" placeholder="Detalhes do evento"></textarea>
            </label>
            <div class="acoes">
              <button class="btn btn--rosa" type="submit">
                {{ editandoId ? 'Salvar alterações' : 'Publicar evento' }}
              </button>
              <button class="btn btn--linha" type="button" @click="cancelarForm">Cancelar</button>
            </div>
          </form>
        </div>
      </div>

      <div class="barra">
        <input
          v-model="busca"
          class="busca"
          type="search"
          placeholder="Buscar por título ou local"
          aria-label="Buscar eventos"
        />
        <div class="seg">
          <button :class="{ ativo: filtro === 'todos' }" @click="filtro = 'todos'">Todos</button>
          <button :class="{ ativo: filtro === 'insc' }" @click="filtro = 'insc'">Minhas inscrições</button>
        </div>
      </div>

      <TransitionGroup v-if="visiveis.length" name="lista" tag="div" class="grid" appear>
        <EventCard
          v-for="(e, i) in visiveis"
          :key="e.id"
          :evento="e"
          :index="i"
          :usuario="usuarioLogado"
          @toggle-inscricao="alternarInscricao(e.id, usuarioLogado?.id)"
          @editar="iniciarEdicao(e)"
          @remover="removerEvento(e.id, usuarioLogado)"
        />
      </TransitionGroup>

      <p v-else class="vazio">Nenhum evento encontrado.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useEventos } from '@/composables/useEventos'
import EventCard from '@/components/EventCard.vue'

const router = useRouter()
const { usuarioLogado, sair } = useAuth()
const { eventos, criarEvento, atualizarEvento, removerEvento, alternarInscricao } = useEventos()

const aberto = ref(false)
const busca = ref('')
const filtro = ref('todos')
const editandoId = ref(null)

const form = reactive({
  titulo: '',
  data: '',
  local: '',
  descricao: ''
})

const visiveis = computed(() => {
  const t = busca.value.trim().toLowerCase()
  return eventos.value.filter(e => {
    const atendeFiltro = filtro.value === 'todos' || (e.inscritos && e.inscritos.includes(usuarioLogado.value?.id))
    const atendeBusca = !t || (e.titulo + ' ' + (e.local || '')).toLowerCase().includes(t)
    return atendeFiltro && atendeBusca
  })
})

function salvarEvento() {
  if (!form.titulo.trim() || !form.local.trim()) return
  if (editandoId.value) {
    atualizarEvento(editandoId.value, { ...form }, usuarioLogado.value)
  } else {
    criarEvento({ ...form }, usuarioLogado.value)
  }
  cancelarForm()
}

function iniciarEdicao(evento) {
  editandoId.value = evento.id
  form.titulo = evento.titulo
  form.data = evento.data
  form.local = evento.local
  form.descricao = evento.descricao || ''
  aberto.value = true
}

function cancelarForm() {
  editandoId.value = null
  form.titulo = ''
  form.data = ''
  form.local = ''
  form.descricao = ''
  aberto.value = false
}

function fazerSair() {
  sair()
  router.push('/login')
}
</script>

<style scoped>
.home { background: var(--gelo); min-height: 100vh; }

.topo {
  position: relative;
  overflow: hidden;
  padding: 1.75rem 1.25rem 3.4rem;
  color: var(--creme);
}
.topo::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 40%; height: 3px;
  background: linear-gradient(90deg, transparent, var(--rosa), transparent);
  animation: varre 4.5s var(--ease) infinite;
}
@keyframes varre {
  from { transform: translateX(-100%); }
  to { transform: translateX(260%); }
}

.topo__c {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}
.topo h2 {
  margin: 0;
  font-size: clamp(1.9rem, 5vw, 2.8rem);
  animation: sobe .7s var(--ease) .15s both;
  color: var(--creme);
}
.topo__u {
  display: flex;
  align-items: center;
  gap: .6rem;
  flex-wrap: wrap;
}

.conteudo {
  max-width: 960px;
  margin: -1.5rem auto 0;
  padding: 0 1.25rem 6rem;
  position: relative;
}

.painel {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows .5s var(--ease), opacity .35s;
}
.painel.aberto {
  grid-template-rows: 1fr;
  opacity: 1;
}
.painel > div { min-height: 0; overflow: hidden; }

.form {
  margin-bottom: 1.25rem;
  padding: 1.25rem;
  background: var(--papel);
  border: 1px solid var(--linha);
  border-top: 4px solid var(--rosa);
  border-radius: 14px;
  display: grid;
  gap: .9rem;
}
.form h3 { margin: 0; font-size: 1.3rem; color: var(--tinta); }
.linha2 { display: grid; grid-template-columns: 1fr 1fr; gap: .9rem; }
.acoes { display: flex; gap: .6rem; flex-wrap: wrap; align-items: center; }

.barra { display: flex; gap: .75rem; flex-wrap: wrap; margin: 1.25rem 0; }
.busca { flex: 1 1 220px; }
.seg {
  display: inline-flex;
  overflow: hidden;
  background: var(--papel);
  border: 1.5px solid var(--linha);
  border-radius: 999px;
}
.seg button {
  font: inherit;
  font-weight: 600;
  border: 0;
  background: transparent;
  padding: .55rem 1rem;
  cursor: pointer;
  color: var(--suave);
  transition: background-color .3s var(--ease), color .3s var(--ease);
}
.seg button.ativo {
  background: var(--azul);
  color: var(--creme);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 18px;
}
.grid > .lista-enter-active {
  transition: opacity .55s var(--ease), transform .55s var(--ease);
  transition-delay: calc(min(var(--i, 0), 8) * 60ms);
}
.grid > .lista-enter-from { opacity: 0; transform: translateY(30px) scale(.96); }
.grid > .lista-leave-active { transition: opacity .3s, transform .3s; }
.grid > .lista-leave-to { opacity: 0; transform: scale(.92); }

.vazio { text-align: center; color: var(--suave); padding: 2.5rem 0; }

@media (max-width: 560px) {
  .linha2 { grid-template-columns: 1fr; }
}
</style>
