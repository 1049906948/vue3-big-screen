<template>
  <div class="ck_container">
     <div>
       {{num}}
     </div>
     <my-form :header="num"></my-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyForm from "@/views/test/components/myForm.vue";
const num = ref(1)

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
