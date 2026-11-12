<script setup>
defineProps({
  tipo: { type: String, default: 'info' },
  // se o pai fecha o aviso sozinho, passe o tempo em ms para mostrar a barra de contagem
  duracao: { type: Number, default: 0 },
})
defineEmits(['fechar'])
</script>

<template>
  <div
    class="msg"
    :class="{ erro: tipo === 'erro' }"
    :style="duracao ? { '--dur': `${duracao}ms` } : null"
    role="alert"
  >
    <span class="msg__texto"><slot /></span>
    <button class="msg__fechar" aria-label="Fechar" @click="$emit('fechar')">✕</button>
    <i v-if="duracao" class="msg__barra"></i>
  </div>
</template>

<style scoped>
.msg {
  position: fixed;
  top: 18px;
  left: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 14px;
  max-width: calc(100% - 32px);
  padding: 13px 18px;
  overflow: hidden;
  border-radius: 12px;
  border-left: 5px solid var(--lima);
  background: var(--tinta);
  color: #fff;
  font-family: var(--fonte);
  font-weight: 600;
  box-shadow: 0 14px 40px rgba(0, 8, 60, 0.45), 0 0 0 1px rgba(185, 252, 1, 0.25);
  animation: msg-entra 0.55s var(--ease) both;
}
.msg.erro { border-left-color: var(--erro); }
@keyframes msg-entra {
  from { opacity: 0; transform: translate(-50%, -24px) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, 0) scale(1); }
}
.msg__fechar {
  background: none;
  border: 0;
  color: var(--lima);
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.25s var(--ease);
}
.msg__fechar:hover { transform: rotate(90deg) scale(1.15); }
.msg__fechar:focus-visible { outline-color: var(--lima); }
.msg__barra {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background: var(--lima);
  transform-origin: left;
  animation: msg-tempo var(--dur) linear forwards;
}
.msg.erro .msg__barra { background: var(--erro); }
@keyframes msg-tempo { to { transform: scaleX(0); } }
</style>
