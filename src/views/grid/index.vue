<template>
  <div class="ck-container">
         <div class="grid border grid-cols-7 gap-4 w-80 m-auto">
             <div class="border text-center" v-for="item in  list">
               {{item}}
             </div>
         </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      list:[
          0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,
      ]
    }
  }
}
</script>

<style scoped>
</style>
