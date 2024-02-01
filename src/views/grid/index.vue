<template>
  <div class="ck-container">
    <grid-one></grid-one>
    <grid-two></grid-two>
    <grid-three v-model="name"></grid-three>
    <div class="w-1/3 m-auto mt-10">
      <el-input v-model="name"></el-input>
      主页面：{{ name }}
    </div>
  </div>
</template>

<script lang="ts" setup name="grid">
import GridOne from "@/views/grid/gridOne.vue";
import GridTwo from "@/views/grid/gridTwo.vue";
import GridThree from "@/views/grid/gridThree.vue";
const name = ref("")
</script>

<style scoped>
</style>
