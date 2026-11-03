<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  theme: {
    type: String,
    required: true
  }
})

defineEmits(['toggle'])
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="theme === 'dark' ? '切换到亮色模式' : '切换到夜间模式'"
    @click="$emit('toggle')"
  >
    <span class="theme-toggle__glow"></span>
    <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" />
  </button>
</template>

<style scoped>
.theme-toggle {
  position: relative;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: var(--text);
  background: var(--glass);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: transform 0.25s ease, background 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.05);
}

.theme-toggle:active {
  transform: scale(0.96);
}

.theme-toggle__glow {
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 65%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.theme-toggle:hover .theme-toggle__glow {
  opacity: 0.7;
}
</style>
