<template>
  <div class="w-4/5 m-auto">
    <div class="mt-5" v-loading="loading">
      <div class="grid border border-[#e4e7ed]  grid-cols-4 w-full m-auto">
        <div v-for="(item, index) in list" class="text-center cursor-pointer" :key="index">
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
// import {ref,onMounted} from "vue"
import {custList, mapList} from "@/views/grid/com.config";
import {fetchList} from "@/views/grid/api";
const loading = ref(false);
const list: any = ref([]);

const getData = async () => {
   loading.value =true
   const res:any = await fetchList()
   list.value = mapList(custList,res.data)
  loading.value =false
}

onMounted(() => {
  getData()
});


list.value =custList
</script>

<style scoped>

</style>
