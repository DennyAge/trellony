<template>
  <header class="header">
    <h1>Trellony</h1>
  </header>
  <main class="container">
    <slot />
  </main>
</template>

<style scoped>
.header {
  height: 3.75rem;
  display: flex;
  align-items: center;
  padding: 0.625rem 1.875rem;
  background: rgba(255, 255, 255, .1);
  backdrop-filter: blur(0.3rem);
  color: var(--neutral-10-color);
}
.container {
  padding: 1.25rem 3.75rem;
}
@media screen and (max-width: 500px) {
  .container {
    padding: 1.25rem;
  }
}
</style>
