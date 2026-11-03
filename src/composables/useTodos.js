import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'apple-todos'
const FILTERS = ['all', 'active', 'completed']

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultTodos()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : defaultTodos()
  } catch {
    return defaultTodos()
  }
}

function defaultTodos() {
  return [
    { id: createId(), text: '晨间散步 20 分钟', completed: true, createdAt: Date.now() - 86000000 },
    { id: createId(), text: '完成项目提案初稿', completed: false, createdAt: Date.now() - 3600000 },
    { id: createId(), text: '给团队发送本周进展', completed: false, createdAt: Date.now() - 1800000 }
  ]
}

export function useTodos() {
  const todos = ref(loadTodos())
  const filter = ref('all')
  const draft = ref('')

  const remaining = computed(() => todos.value.filter((item) => !item.completed).length)
  const completedCount = computed(() => todos.value.filter((item) => item.completed).length)
  const total = computed(() => todos.value.length)
  const progress = computed(() => (total.value ? Math.round((completedCount.value / total.value) * 100) : 0))

  const filteredTodos = computed(() => {
    if (filter.value === 'active') return todos.value.filter((item) => !item.completed)
    if (filter.value === 'completed') return todos.value.filter((item) => item.completed)
    return todos.value
  })

  function addTodo() {
    const text = draft.value.trim()
    if (!text) return
    todos.value.unshift({
      id: createId(),
      text,
      completed: false,
      createdAt: Date.now()
    })
    draft.value = ''
  }

  function toggleTodo(id) {
    const item = todos.value.find((todo) => todo.id === id)
    if (item) item.completed = !item.completed
  }

  function removeTodo(id) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  function clearCompleted() {
    todos.value = todos.value.filter((todo) => !todo.completed)
  }

  function setFilter(next) {
    if (FILTERS.includes(next)) filter.value = next
  }

  watch(
    todos,
    (value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true }
  )

  return {
    todos,
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
  }
}
