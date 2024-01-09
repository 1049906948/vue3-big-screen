<template>
  <div class="bg-gray-50 min-h-screen">
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
      <button @click="refresh">refresh</button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getTableDataApi } from "../../api/table/index";
const tableData = ref([]);
const refresh = async () => {
  const data = await getTableDataApi();
  tableData.value = data;
};

onMounted(refresh);
</script>

<style lang="scss" scoped></style>
