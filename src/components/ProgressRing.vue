<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})

const radius = 42
const circumference = 2 * Math.PI * radius
const offset = computed(() => circumference - (Math.min(100, Math.max(0, props.progress)) / 100) * circumference)
</script>

<template>
  <div class="ring" aria-hidden="true">
    <svg viewBox="0 0 108 108">
      <circle class="ring__track" cx="54" cy="54" r="42" />
      <circle
        class="ring__value"
        cx="54"
        cy="54"
        r="42"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
      />
    </svg>
    <div class="ring__label">
      <strong>{{ progress }}</strong>
      <span>%</span>
    </div>
  </div>
</template>

<style scoped>
.ring {
  position: relative;
  width: 108px;
  height: 108px;
  flex-shrink: 0;
}

svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

circle {
  fill: none;
  stroke-width: 8;
}

.ring__track {
  stroke: var(--track);
}

.ring__value {
  stroke: url(#none);
  stroke: var(--accent);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  filter: drop-shadow(0 0 8px var(--accent-glow));
}

.ring__label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1px;
  padding-top: 2px;
}

.ring__label strong {
  font-size: 1.65rem;
  font-weight: 620;
  letter-spacing: -0.05em;
  color: var(--text);
}

.ring__label span {
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
