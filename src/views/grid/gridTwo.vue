<template>
  <div>
    <div class="mt-5" v-loading="loading">
      <div class="grid border border-[#e4e7ed]  grid-cols-4 w-full m-auto">
        <div v-for="(item, index) in list" class="text-center cursor-pointer">
          <div class="flex">
            <div class="w-full border border-[#e4e7ed] text-center leading-10 h-10 bg-[#eaf6f0]">
              <span :style="{color:item.coloring}">{{ item.label }}</span>
            </div>
            <div class="w-full border border-[#e4e7ed] text-center leading-10 h-10">
              <span v-if="item.keyName" :style="{color:item.coloring}">{{ item.keyValue }} </span>
              <span :style="{color:item.coloring}">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script  lang="ts" setup name="gridTwo">
// const loading = ref(false);
</script>

<style scoped>

</style>
