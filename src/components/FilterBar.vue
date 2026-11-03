<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  canClear: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'clear'])

const filters = [
  { id: 'all', label: '全部', icon: 'list' },
  { id: 'active', label: '未完成', icon: 'circle' },
  { id: 'completed', label: '已完成', icon: 'circle-check' }
]
</script>

<template>
  <div class="bar">
    <div class="segmented" role="tablist" aria-label="筛选待办">
      <button
        v-for="item in filters"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="modelValue === item.id"
        :class="{ active: modelValue === item.id }"
        @click="$emit('update:modelValue', item.id)"
      >
        <AppIcon :name="item.icon" />
        <span>{{ item.label }}</span>
      </button>
    </div>
    <button
      class="clear"
      type="button"
      :disabled="!canClear"
      @click="$emit('clear')"
    >
      <AppIcon name="trash" />
      <span>清除已完成</span>
    </button>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}

.segmented {
  display: inline-flex;
  padding: 5px;
  border-radius: 999px;
  background: var(--segmented);
  border: 1px solid var(--border);
}

.segmented button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 0;
  background: transparent;
  color: var(--text-muted);
  padding: 9px 14px;
  border-radius: 999px;
  cursor: pointer;
  font: inherit;
  font-size: 0.92rem;
  font-weight: 560;
  transition: color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.segmented button.active {
  color: var(--text);
  background: var(--glass-strong);
  box-shadow: var(--shadow-soft);
}

.clear {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 0;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font: inherit;
  padding: 8px 4px;
  transition: color 0.2s ease;
}

.clear:hover:not(:disabled) {
  color: var(--danger);
}

.clear:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .segmented {
    width: 100%;
  }

  .segmented button {
    flex: 1;
    justify-content: center;
    padding: 9px 8px;
  }

  .clear {
    margin-left: auto;
  }
}
</style>
