<template>
  <div class="main">
    <div>
      <Header />
    </div>
    <div class="main__body mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./Header";

export default {
  name: "Main",
  components: { Header }
}
</script>

