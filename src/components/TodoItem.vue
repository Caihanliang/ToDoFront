<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  todo: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle', 'remove'])
</script>

<template>
  <article class="item" :class="{ done: todo.completed }">
    <button
      class="check"
      type="button"
      :aria-label="todo.completed ? '标记为未完成' : '标记为已完成'"
      @click="$emit('toggle', todo.id)"
    >
      <AppIcon name="check" />
    </button>
    <p>{{ todo.text }}</p>
    <button
      class="delete"
      type="button"
      aria-label="删除待办事项"
      @click="$emit('remove', todo.id)"
    >
      <AppIcon name="trash" />
    </button>
  </article>
</template>

<style scoped>
.item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 16px 16px;
  border-radius: 22px;
  background: var(--item);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-item);
  transition: transform 0.25s ease, background 0.25s ease, opacity 0.25s ease;
}

.item:hover {
  transform: translateY(-1px);
}

.check {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.6px solid var(--check-border);
  background: transparent;
  color: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.check :deep(.icon) {
  width: 14px;
  height: 14px;
}

.item.done .check {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  box-shadow: 0 8px 16px var(--accent-glow);
}

.item:not(.done) .check:hover {
  transform: scale(1.06);
  border-color: var(--accent);
}

p {
  margin: 0;
  color: var(--text);
  font-size: 1.02rem;
  letter-spacing: -0.01em;
  transition: color 0.25s ease, opacity 0.25s ease;
}

.item.done p {
  color: var(--text-muted);
  text-decoration: line-through;
  text-decoration-thickness: 1.5px;
  opacity: 0.78;
}

.delete {
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--text-muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.item:hover .delete,
.item:focus-within .delete {
  opacity: 1;
  transform: none;
}

.delete:hover {
  color: var(--danger);
  background: var(--danger-soft);
}

@media (hover: none) {
  .delete {
    opacity: 1;
    transform: none;
  }
}
</style>
