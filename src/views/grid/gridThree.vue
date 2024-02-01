<template>
  <div class="w-1/3 m-auto mt-10">
      <el-input v-model="modelValue"></el-input>
       组件：{{modelValue}}
  </div>
</template>

<script lang="ts" setup name="gridThree">
const modelValue = defineModel()
</script>

<style scoped>

</style>
