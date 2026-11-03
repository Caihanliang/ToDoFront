<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'plus'">
      <path d="M12 5v14M5 12h14" />
    </template>
    <template v-else-if="name === 'check'">
      <path d="M5 12.5 9.5 17 19 7.5" />
    </template>
    <template v-else-if="name === 'trash'">
      <path d="M4 7h16" />
      <path d="M9 7V5.6A1.6 1.6 0 0 1 10.6 4h2.8A1.6 1.6 0 0 1 15 5.6V7" />
      <path d="M7 7l.8 12.2A1.6 1.6 0 0 0 9.4 21h5.2a1.6 1.6 0 0 0 1.6-1.8L17 7" />
      <path d="M10 11v6M14 11v6" />
    </template>
    <template v-else-if="name === 'sun'">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1.6M12 19.4V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.6M19.4 12H21M4.9 19.1 6 18M18 6l1.1-1.1" />
    </template>
    <template v-else-if="name === 'moon'">
      <path d="M16.5 13.4A6.6 6.6 0 0 1 10.7 5 6.8 6.8 0 1 0 19 14.4a6.5 6.5 0 0 1-2.5-1" />
    </template>
    <template v-else-if="name === 'list'">
      <path d="M8 7h12M8 12h12M8 17h12" />
      <circle cx="4.2" cy="7" r=".9" fill="currentColor" stroke="none" />
      <circle cx="4.2" cy="12" r=".9" fill="currentColor" stroke="none" />
      <circle cx="4.2" cy="17" r=".9" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'circle'">
      <circle cx="12" cy="12" r="7.5" />
    </template>
    <template v-else-if="name === 'circle-check'">
      <circle cx="12" cy="12" r="7.5" />
      <path d="m8.4 12.2 2.4 2.4 4.8-5.2" />
    </template>
    <template v-else-if="name === 'spark'">
      <path d="M12 3.5 13.4 9 19 10.5 13.4 12 12 17.5 10.6 12 5 10.5 10.6 9 12 3.5Z" />
    </template>
  </svg>
</template>

<style scoped>
.icon {
  width: 1.15em;
  height: 1.15em;
  display: block;
}
</style>
