<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

function onSubmit() {
  emit('submit')
}
</script>

<template>
  <form class="composer" @submit.prevent="onSubmit">
    <div class="composer__field">
      <span class="composer__icon">
        <AppIcon name="spark" />
      </span>
      <input
        :value="modelValue"
        type="text"
        maxlength="120"
        placeholder="写下一件想完成的事"
        autocomplete="off"
        @input="emit('update:modelValue', $event.target.value)"
      />
    </div>
    <button class="composer__btn" type="submit">
      <AppIcon name="plus" />
      <span>添加</span>
    </button>
  </form>
</template>

<style scoped>
.composer {
  display: flex;
  gap: 12px;
  align-items: center;
}

.composer__field {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 58px;
  padding: 0 18px;
  border-radius: 999px;
  background: var(--glass-strong);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-inset);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.composer__field:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}

.composer__icon {
  color: var(--accent);
}

input {
  flex: 1;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 1.02rem;
  min-width: 0;
}

input::placeholder {
  color: var(--text-muted);
}

.composer__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 58px;
  padding: 0 22px;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(180deg, #3aa0ff 0%, var(--accent) 100%);
  box-shadow: 0 12px 24px var(--accent-glow);
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: transform 0.22s ease, filter 0.22s ease;
}

.composer__btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.composer__btn:active {
  transform: translateY(1px) scale(0.98);
}

@media (max-width: 640px) {
  .composer {
    flex-direction: column;
    align-items: stretch;
  }

  .composer__btn {
    justify-content: center;
    width: 100%;
  }
}
</style>
