<template>
  <nav class="nav" aria-label="Navegação da aplicação">
    <router-link to="/" class="nav-btn" exact-active-class="ativo">Início</router-link>
    <router-link to="/login" class="nav-btn" exact-active-class="ativo">Login</router-link>
    <router-link to="/cadastro" class="nav-btn" exact-active-class="ativo">Cadastro</router-link>
    <router-link to="/home" class="nav-btn" exact-active-class="ativo">Eventos</router-link>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  left: 50%;
  bottom: calc(14px + env(safe-area-inset-bottom, 0px));
  transform: translateX(-50%);
  z-index: 900;
  display: flex;
  gap: 4px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(0, 24, 89, .88);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 24, 89, .4);
}
.nav-btn {
  font-family: var(--fonte);
  font-weight: 600;
  font-size: .85rem;
  border: 0;
  border-radius: 999px;
  padding: .45rem .9rem;
  background: transparent;
  color: var(--creme);
  text-decoration: none;
  transition: background-color .25s, color .25s;
}
.nav-btn.ativo {
  background: var(--rosa);
  color: #fff;
}
@media (max-width: 560px) {
  .nav-btn { padding: .45rem .6rem; }
}
</style>
