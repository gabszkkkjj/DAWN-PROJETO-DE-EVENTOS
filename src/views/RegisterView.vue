<template>
  <div class="auth malha">
    <main class="card-auth">
      <p class="marca">DAWN.</p>
      <h2>Criar nova conta</h2>

      <form @submit.prevent="cadastrarUsuario">
        <label>
          Nome completo
          <input v-model="nome" type="text" placeholder="Digite seu nome completo" required />
        </label>
        <label>
          E-mail
          <input v-model="email" type="email" placeholder="voce@email.com" required />
        </label>
        <label>
          Senha
          <input v-model="senha" type="password" placeholder="Mínimo de 6 caracteres" minlength="6" required />
        </label>

        <p v-if="erro" class="auth__erro" role="alert">{{ erro }}</p>

        <button type="submit" class="btn btn--rosa btn--cheio">Cadastrar</button>
      </form>

      <p class="rodape">
        Já tem uma conta?
        <router-link to="/login" class="link-auth">Faça login</router-link>
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { cadastrar } = useAuth()

const nome = ref('')
const email = ref('')
const senha = ref('')
const erro = ref('')

function cadastrarUsuario() {
  const resultado = cadastrar({ nome: nome.value, email: email.value, senha: senha.value })
  if (resultado.ok) {
    router.push({ path: '/login', query: { cadastro: 'ok' } })
  } else {
    erro.value = resultado.erro
  }
}
</script>

<style scoped>
.auth {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 1.25rem;
  overflow: hidden;
}

.auth::before {
  content: '';
  position: absolute;
  width: 560px;
  height: 560px;
  right: -140px;
  top: -180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(252, 59, 127, .38), transparent 66%);
  animation: flutua 10s ease-in-out infinite alternate;
  pointer-events: none;
}
@keyframes flutua {
  to { transform: translate(-90px, 70px) scale(1.15); }
}

.card-auth {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: var(--papel);
  border-radius: 18px;
  padding: 2.2rem 1.9rem 1.8rem;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 24, 89, .45);
  animation: cardIn .8s var(--ease) both;
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(28px) scale(.97); filter: blur(6px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}

.card-auth::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 5px;
  background: linear-gradient(90deg, var(--azul) 0 35%, var(--rosa) 50%, var(--azul) 65% 100%);
  background-size: 250% 100%;
  animation: corre 4s linear infinite;
}
@keyframes corre {
  from { background-position: 100% 0; }
  to { background-position: -150% 0; }
}

.card-auth .marca { color: var(--azul); }
.card-auth .marca::before {
  content: '';
  display: inline-block;
  width: .6rem;
  height: .6rem;
  margin-right: .55rem;
  border-radius: 50%;
  background: var(--rosa);
  border: 2px solid var(--azul);
  animation: pulsa 2s infinite;
}

h2 { margin: .4rem 0 1.4rem; font-size: 1.9rem; font-weight: 800; color: var(--tinta); }
form { display: grid; gap: 1rem; }
.rodape { margin: 1.4rem 0 0; color: var(--suave); }
.link-auth {
  font-weight: 700;
  color: var(--azul);
  text-decoration: none;
  background: linear-gradient(var(--creme), var(--creme)) 0 90%/0 .4em no-repeat;
  transition: background-size .3s var(--ease);
}
.link-auth:hover { background-size: 100% .4em; }

.auth__erro { margin: 0; color: var(--erro); font-weight: 600; }
</style>
