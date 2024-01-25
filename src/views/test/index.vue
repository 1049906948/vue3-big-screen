<template>
  <div class="ck_container">
    <div>
      {{ num }}
    </div>
    <my-form :header="num"></my-form>
    <div @click="handleOk">点击</div>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive } from "vue";
import MyForm from "@/views/test/components/myForm.vue";
const num = ref(1);

const state = reactive({

})

const handleOk = ()=>{

}

</script>

<style scoped>
.ck_container {
  @apply p-4 bg-gray-50 min-h-screen;
}
.button {
  width: 100px;
  height: 50px;
  background: #3de7c9;
  border-radius: 50px;
}
</style>
