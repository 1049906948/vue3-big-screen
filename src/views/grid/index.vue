<template>
  <div class="ck-container">
    <div class="grid border grid-cols-6  w-80 m-auto">
      <div v-for="(item,index) in  list" :class="{'bg-[#2952e3]':['床','思','光'].includes(item)}"
           class="border text-center cursor-pointer" @click="handleItem(item,index)">
            <input class="w-full text-center" :disabled="!['床','思','光'].includes(item)" type="text" :value="item" />
      </div>
    </div>
    <div>
      qeqeqw
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      list: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleItem(item, index) {
      console.log(item, index, '12313213')
    },
    init() {
      let str = "床前明月光，一是地下双，举头望明月，低头思故乡."
      let arr = [...str]
      this.list = arr
    }
  }
}
</script>

<style scoped>
</style>
