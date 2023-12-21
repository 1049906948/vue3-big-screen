<template>
  <div class="bg-gray-50 min-h-screen pt-20">
    <el-button  @click="handleForm">表单</el-button>

    <el-dialog v-model="dialogVisible" title="表单" width="50%" :before-close="handleClose">
      <div class="dialog-body">
        <ck-form></ck-form>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
// import Demo from "./components/form/demo.vue"
import CkForm from "@/views/form/components/form/index.vue";
const dialogVisible = ref(false)

const handleForm = () => {
  dialogVisible.value = true;
}

const handleClose = (done: () => void) => {
  // dialogVisible.value = false
  done()
}
</script>
<style scoped>

</style>
