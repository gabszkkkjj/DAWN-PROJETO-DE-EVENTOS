<template>
  <button :class="['btn', `btn--${variant}`]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'rosa' // 'rosa', 'azul', 'creme', 'linha', 'contorno'
  }
})
defineEmits(['click'])
</script>
