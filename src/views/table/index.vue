<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <div class="w-1/2 m-auto mt-5">

      <div class="mb-5">
        <el-button @click="handleAdd">add</el-button>
        <el-button @click="handleExport">Export</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />

        <el-table-column align="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button  size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" >Delete</el-button>
          </template>
        </el-table-column>

      </el-table>


    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref} from "vue";

const tableData = ref([]);


interface User {
  date: string
  name: string
  address: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  tableData.value.splice(index,1)
  console.log(index, row)
  console.log(index, row)
}

const handleAdd = () => {
  let obj = {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
  tableData.value.push(obj)

}

const handleExport = () => {
  console.log(123)
}

</script>

<style scoped>

</style>