<template>
  <div class="init malha" @pointermove="mouse">
    <div class="foco" :style="focoStyle"></div>
    <div class="init__c">
      <p class="marca">DAWN.</p>
      <h1 class="titulo">
        <span
          v-for="(p, i) in ['Onde', 'você', 'quer', 'ir', 'hoje?']"
          :key="p"
          class="pal"
          :style="{ '--i': i }"
        >
          {{ p }}
        </span>
      </h1>
      <button class="btn btn--creme btn--grande" @click="irParaLogin">Entrar</button>
    </div>
  </div>
  <address>
    Desenvolvido por Marcus Gabriel - gabsz
  </address>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const x = ref(50)
const y = ref(30)

function mouse(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  x.value = e.clientX - rect.left
  y.value = e.clientY - rect.top
}

const focoStyle = computed(() => ({
  background: `radial-gradient(440px circle at ${x.value}px ${y.value}px, rgba(252, 59, 127, .28), transparent 62%)`
}))

function irParaLogin() {
  router.push('/login')
}
</script>

<style scoped>
.init {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 2rem 1.25rem;
  overflow: hidden;
  color: var(--creme);
}

.foco {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.init__c {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 2.5rem;
  text-align: center;
}

.marca {
  margin: 0;
  font-family: var(--mono);
  font-weight: 700;
  letter-spacing: .05em;
  color: var(--rosa);
}

.titulo {
  margin: 0;
  max-width: 12ch;
  font-size: clamp(3rem, 10vw, 7.5rem);
  font-weight: 800;
  line-height: .95;
  letter-spacing: -.035em;
  color: var(--creme);
}

.pal {
  display: inline-block;
  margin-right: .22em;
  animation: pal .9s var(--ease) both;
  animation-delay: calc(.25s + var(--i) * .12s);
}
.pal:last-child { margin-right: 0; }

@keyframes pal {
  from { opacity: 0; transform: translateY(60%) rotateX(50deg); filter: blur(10px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}

.init .btn {
  animation: sobe .7s var(--ease) 1s backwards, anel 2.6s ease-out 1.8s infinite;
}
.address {
  position: fixed;
  right: 1.25rem; bottom: 1.25rem;
  font-size: .75rem;
  color: var(--creme);
}
</style>
  