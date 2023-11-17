<template>
  <div class="m-auto w-1/2">
    <el-input v-model="num" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["header"]);
const num = ref(props.header * 2);
console.log(num);
</script>

<style scoped></style>
