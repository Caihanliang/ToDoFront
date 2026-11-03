<script setup>
import { computed } from 'vue'
import { useTheme } from './composables/useTheme'
import { useTodos } from './composables/useTodos'
import AppIcon from './components/AppIcon.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ProgressRing from './components/ProgressRing.vue'
import TodoInput from './components/TodoInput.vue'
import FilterBar from './components/FilterBar.vue'
import TodoItem from './components/TodoItem.vue'

const { theme, toggleTheme } = useTheme()
const {
  filter,
  draft,
  remaining,
  completedCount,
  total,
  progress,
  filteredTodos,
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted,
  setFilter
} = useTodos()

const dateLabel = computed(() =>
  new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }).format(new Date())
)

const emptyCopy = computed(() => {
  if (filter.value === 'completed') return '还没有完成的事项'
  if (filter.value === 'active') return '未完成事项都清空了'
  return '从一件小事开始今天'
})
</script>

<template>
  <div class="stage">
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="orb orb-c"></div>

    <header class="topbar">
      <div class="brand">
        <span class="brand__mark">
          <AppIcon name="spark" />
        </span>
        <div>
          <p class="eyebrow">Focus</p>
          <h1>今日清单</h1>
        </div>
      </div>
      <ThemeToggle :theme="theme" @toggle="toggleTheme" />
    </header>

    <main class="shell">
      <section class="hero card">
        <div class="hero__copy">
          <p class="date">{{ dateLabel }}</p>
          <h2>把注意力放在此刻。</h2>
          <p class="lede">
            简洁、安静、只留下真正重要的事。完成一件，世界就会清晰一点。
          </p>
          <div class="metrics">
            <article>
              <span>全部</span>
              <strong>{{ total }}</strong>
            </article>
            <article>
              <span>进行中</span>
              <strong>{{ remaining }}</strong>
            </article>
            <article>
              <span>已完成</span>
              <strong>{{ completedCount }}</strong>
            </article>
          </div>
        </div>
        <div class="hero__progress">
          <ProgressRing :progress="progress" />
          <p>完成度</p>
        </div>
      </section>

      <section class="panel card">
        <TodoInput v-model="draft" @submit="addTodo" />
        <FilterBar
          :model-value="filter"
          :can-clear="completedCount > 0"
          @update:model-value="setFilter"
          @clear="clearCompleted"
        />

        <TransitionGroup name="list" tag="div" class="list" appear>
          <TodoItem
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            @toggle="toggleTodo"
            @remove="removeTodo"
          />
        </TransitionGroup>

        <div v-if="!filteredTodos.length" class="empty">
          <div class="empty__icon">
            <AppIcon name="check" />
          </div>
          <h3>{{ emptyCopy }}</h3>
          <p>添加一条待办，给这一天一个轻盈的起点。</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.stage {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 28px 22px 64px;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  animation: float 14s ease-in-out infinite;
}

.orb-a {
  width: 420px;
  height: 420px;
  background: var(--orb-a);
  top: -140px;
  right: -80px;
}

.orb-b {
  width: 340px;
  height: 340px;
  background: var(--orb-b);
  bottom: -80px;
  left: -90px;
  animation-delay: -4s;
}

.orb-c {
  width: 220px;
  height: 220px;
  background: var(--orb-c);
  top: 38%;
  left: 48%;
  animation-delay: -7s;
}

.topbar,
.shell {
  position: relative;
  z-index: 1;
  width: min(880px, 100%);
  margin: 0 auto;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand__mark {
  width: 46px;
  height: 46px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(160deg, #64b5ff, var(--accent) 55%, #7c5cff);
  box-shadow: 0 10px 24px var(--accent-glow);
}

.eyebrow {
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
}

h1 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 650;
  letter-spacing: -0.04em;
}

.card {
  background: var(--glass);
  border: 1px solid var(--border);
  backdrop-filter: blur(28px) saturate(140%);
  box-shadow: var(--shadow-card);
}

.hero {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  padding: 32px;
  border-radius: 32px;
  margin-bottom: 18px;
}

.date {
  margin: 0 0 8px;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.92rem;
}

h2 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  line-height: 1.08;
  letter-spacing: -0.055em;
  font-weight: 680;
}

.lede {
  margin: 12px 0 0;
  max-width: 34rem;
  color: var(--text-muted);
  font-size: 1.02rem;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 28px;
}

.metrics article {
  padding: 14px 16px;
  border-radius: 18px;
  background: var(--chip);
  border: 1px solid var(--border);
}

.metrics span {
  display: block;
  color: var(--text-muted);
  font-size: 0.78rem;
}

.metrics strong {
  display: block;
  margin-top: 4px;
  font-size: 1.45rem;
  font-weight: 650;
  letter-spacing: -0.05em;
}

.hero__progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 140px;
}

.hero__progress p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.panel {
  padding: 22px;
  border-radius: 32px;
  display: grid;
  gap: 18px;
}

.list {
  position: relative;
  display: grid;
  gap: 10px;
}

.empty {
  text-align: center;
  padding: 36px 12px 18px;
}

.empty__icon {
  width: 58px;
  height: 58px;
  margin: 0 auto 12px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--accent);
  background: var(--accent-soft);
}

.empty h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 620;
}

.empty p {
  margin: 8px 0 0;
  color: var(--text-muted);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(24px) scale(0.96);
}

.list-move {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes float {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(24px, -18px, 0);
  }
}

@media (max-width: 720px) {
  .stage {
    padding: 18px 14px 48px;
  }

  .hero,
  .panel {
    padding: 20px 16px;
    border-radius: 26px;
  }

  .hero {
    grid-template-columns: 1fr;
  }

  .hero__progress {
    flex-direction: row;
    justify-content: flex-start;
    gap: 16px;
  }
}
</style>
