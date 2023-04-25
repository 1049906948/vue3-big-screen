<template>
  <div class="min-h-screen bg-gray-50">

    <div class="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>

  </div>
</template>

<script setup>
import Navbar from "./components/Navbar"
import Welcome from "./components/Welcome"
</script>

<style scoped>
.gradient-bg-welcome {
  background-color: #0f0e13;
  background-image: radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%),
  radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%),
  radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%);
}
</style>
