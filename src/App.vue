<script setup>
import Navbar from '@/components/Navbar.vue'
import { fase } from '@/composables/useTransicao'
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <div :key="route.path" class="tela">
      <component :is="Component" />
    </div>
  </router-view>

  <Navbar />

  <div class="cortina" :class="fase" aria-hidden="true">
    <span></span><span></span><span></span>
  </div>
</template>

<style scoped>
.cortina {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  pointer-events: none;
}
.cortina span {
  background: var(--azul);
  border-right: 6px solid var(--rosa);
  transform: translateX(-102%);
}
.cortina span:nth-child(2) { background: var(--noite); }
.cobre span, .revela span { transition: transform .5s cubic-bezier(.76, 0, .24, 1); }
.cobre span { transform: translateX(0); }
.revela span { transform: translateX(102%); }
.cobre span:nth-child(2), .revela span:nth-child(2) { transition-delay: .07s; }
.cobre span:nth-child(3), .revela span:nth-child(3) { transition-delay: .14s; }

@media (prefers-reduced-motion: reduce) {
  .cortina { display: none; }
}
</style>
