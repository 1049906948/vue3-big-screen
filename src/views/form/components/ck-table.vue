<template>
  <div class="bg-gray-50 min-h-screen pt-20">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="font-bold">人员管理</span>
        </div>
      </template>


      <el-form :model="state.queryForm" ref="queryRef" label-width="100px"   v-show="showSearch">
        <el-row>

          <el-col :span="6">
            <el-form-item label="京东" prop="code">
              <el-input placeholder="请输入名称" v-model="state.queryForm.name" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="个人信息" prop="code">
              <el-input placeholder="请输入名称" v-model="state.queryForm.user" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="角色名称" prop="code">
              <el-select v-model="state.queryForm.code" placeholder="请选择门店范围" >
                <el-option label="测试门店" value="1"></el-option>
                <el-option label="测试商家" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item>
              <el-button  icon="search" type="primary" @click="getDataList">
                查询
              </el-button>
              <el-button icon="Refresh"  @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>

      <el-row>
        <div class="mb-5 w-full">
          <el-button  type="primary" class="ml10" @click="handleAdd({})">新增人员</el-button>
          <right-toolbar v-model:showSearch="showSearch"  class="ml10 float-right mr-5" @queryTable="getDataList"></right-toolbar>
        </div>
      </el-row>

      <el-table :data="state.dataList" v-loading="state.loading" border :cell-style="tableStyle.cellStyle" :header-cell-style="tableStyle.headerCellStyle" >
        <el-table-column type="index" label="编号" width="80" />
        <el-table-column prop="code" label="名称" show-overflow-tooltip />
        <el-table-column prop="codeSymbol" label="创建人" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" show-overflow-tooltip >
          <template v-slot="scope">
            {{['启用','停止'][scope.row.status]}}
          </template>
        </el-table-column>
        <el-table-column prop="systemCode" label="优先级" show-overflow-tooltip >
          <template v-slot="scope">
            {{['预警系统','催收系统'][scope.row.systemCode]}}
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="修改人" show-overflow-tooltip />
        <el-table-column prop="updateTime" label="修改时间" show-overflow-tooltip />

        <el-table-column label="操作" width="250" fixed="right">
          <template #default="scope">
            <el-button  text type="primary" :disabled="scope.row.status == 0" @click="enableHandel(scope.row)">启用</el-button>
            <el-button  text type="primary"  :disabled="scope.row.status == 1" @click="enableHandel(scope.row)">停用</el-button>
            <el-button  text type="primary"  @click="handleAdd(scope.row)">编辑</el-button>
            <el-button  text type="primary"  @click="handleSee(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" v-bind="state.pagination" />

    </el-card>

    <form-upload ref="formUploadRef"></form-upload>
  </div>
</template>
<script setup lang="ts">
// import FormUpload from "@/views/form/components/form-upload.vue";
const Pagination = defineAsyncComponent(() => import('../../../components/Pagination/index.vue'));
const RightToolbar = defineAsyncComponent(() => import('../../../components/RightToolbar/index.vue'));
const FormUpload = defineAsyncComponent(() => import('@/views/form/components/form-upload.vue'));

import {useTable,BasicTableProps} from "@/hooks/table";
const showSearch = ref(true)
const formUploadRef = ref()
const state: BasicTableProps = reactive<BasicTableProps>({
  queryForm: {
    systemCode:null,
    code:null,
    contactResultCode:null
  },
  // pageList: fetchList
})

const {
  getDataList,
  currentChangeHandle,
  sizeChangeHandle,
  sortChangeHandle,
  downBlobFile,
  tableStyle
} = useTable(state)


const resetQuery = async (row:Object) =>{}
const enableHandel = async (row:Object) =>{}
const handleAdd = async (row:Object) =>{
  formUploadRef.value.openDialog()
}
const handleSee = async (row:Object) =>{}
</script>

<style scoped>

</style>
