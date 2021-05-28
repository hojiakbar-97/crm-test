<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <router-link to="/" class="navbar-brand">Система сотрудников</router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Главная </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/employees" class="nav-link">Сотрудников</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>

</style>
