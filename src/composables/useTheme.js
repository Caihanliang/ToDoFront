import { ref } from 'vue'

const THEME_KEY = 'todo-theme'

function getPreferredTheme() {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref(getPreferredTheme())

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', theme.value)
}

export function useTheme() {
  function apply(value) {
    theme.value = value
    document.documentElement.setAttribute('data-theme', value)
    localStorage.setItem(THEME_KEY, value)
  }

  function toggleTheme() {
    apply(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme, apply }
}
