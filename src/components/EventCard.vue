<template>
  <article class="ev" :style="{ '--i': index }">
    <div class="ev__t malha">
      <strong>{{ dataFormatada.dia }}</strong>
      <span>{{ dataFormatada.mes }}</span>
      <small>{{ dataFormatada.ano }}</small>
    </div>
    <div class="ev__c">
      <h3>{{ evento.titulo }}</h3>
      <p class="ev__l">{{ evento.local }}</p>
      <p v-if="evento.descricao" class="ev__desc">{{ evento.descricao }}</p>
      <p class="ev__m">
        {{ totalInscritos }} {{ totalInscritos === 1 ? 'inscrito' : 'inscritos' }}
      </p>
      <div class="acoes">
        <button
          class="btn"
          :class="estaInscrito ? 'btn--linha' : 'btn--rosa'"
          @click="$emit('toggleInscricao')"
        >
          {{ estaInscrito ? 'Cancelar inscrição' : 'Inscrever-se' }}
        </button>

        <template v-if="ehDono">
          <button class="btn btn--linha" style="padding:.6rem .8rem" @click="$emit('editar')">Editar</button>
          <button class="btn btn--linha" style="padding:.6rem .8rem" @click="$emit('remover')">Excluir</button>
        </template>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  evento: Object,
  index: Number,
  usuario: Object
})

defineEmits(['toggleInscricao', 'editar', 'remover'])

const totalInscritos = computed(() => (props.evento.inscritos ? props.evento.inscritos.length : 0))
const estaInscrito = computed(() => !!props.usuario && props.evento.inscritos?.includes(props.usuario.id))
const ehDono = computed(() => !!props.usuario && props.evento.criadorId === props.usuario.id)

const dataFormatada = computed(() => {
  if (!props.evento.data) return { dia: '14', mes: 'nov', ano: 2026 }
  const d = new Date(props.evento.data + 'T00:00:00')
  return {
    dia: d.toLocaleDateString('pt-BR', { day: '2-digit' }),
    mes: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
    ano: d.getFullYear()
  }
})
</script>

<style scoped>
.ev {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--papel);
  border: 1px solid var(--linha);
  border-radius: 16px;
  overflow: hidden;
  transition: transform .35s var(--ease), box-shadow .35s var(--ease), border-color .35s;
}
.ev:hover {
  transform: translateY(-6px);
  border-color: var(--rosa);
  box-shadow: 0 22px 44px -14px rgba(0, 50, 168, .35);
}
.ev::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 4px;
  background: var(--rosa);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .5s var(--ease);
}
.ev:hover::after { transform: scaleX(1); }

.ev__t {
  padding: .95rem 1.15rem;
  color: var(--creme);
  background-color: var(--azul);
  font-family: var(--mono);
  display: flex;
  align-items: baseline;
  gap: .4rem;
}
.ev__t strong { font-size: 2.3rem; line-height: 1; }
.ev__t span { text-transform: uppercase; }
.ev__t small { opacity: .75; }

.ev__c { padding: 1rem 1.15rem 1.2rem; flex: 1; display: flex; flex-direction: column; }
.ev h3 { margin: 0; font-size: 1.25rem; line-height: 1.2; color: var(--tinta); }
.ev__l { margin: .25rem 0 0; color: var(--azul); font-weight: 600; }
.ev__desc { margin: .4rem 0 0; font-size: .88rem; color: var(--suave); }
.ev__m { margin: .6rem 0 .9rem; font-size: .85rem; color: var(--suave); margin-top: auto; }
</style>
