<template>
  <div class="ck_container">

  </div>
</template>

<script setup>
import {testNextTick} from "./com.config"
const {increment,count} = testNextTick()
</script>

<style scoped>
.ck_container{
   @apply p-4 bg-gray-50 min-h-screen
}
.button{
  width: 100px;
  height: 50px;
  background: #3de7c9;
  border-radius: 50px;
}
</style>
