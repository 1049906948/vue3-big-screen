<template>
  <el-dialog :title="dialogData.title" v-model="dialogData.visible" :close-on-click-modal="false" draggable>
    <el-form ref="formDialogRef" :model="form" :rules="dataRules" formDialogRef label-width="120px" v-loading="loading">

      <el-row class="mb-5">
        <el-col :span="12">
          <el-form-item label="上传图片" prop="assignGroup">
            <el-upload v-model:file-list="timekeepingRecord" list-type="picture-card">
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

     </el-form>
   </el-dialog>
</template>

<script setup lang="ts"  name="form-upload">
const loading = ref(false)
interface BasicForm {

}

// 提交表单数据
const form:BasicForm = reactive<BasicForm>({
  timekeepingRecord:[]
});

// 定义校验规则
const dataRules = ref({
  // assignGroup: [{ required: true, message: "请选择分案组别" }],
  // assignSeatType: [{ required: true, message: "请选择分配方式" }],
  // repeatAssignFlag: [{ required: true, message: "请选择是否重复分案" }],
  // loanType: [{ required: true, message: "请选择贷款种类" }],
  // labelNotAssign: [{ required: true, message: "请选择不分配标签" }],
  // reAssignOverdueDays: [{ required: true, message: "请输入重分配逾期天数" }],
  // priority: [{ required: true, message: "请输入优先级" }]
});


// 窗口数据
const dialogData = reactive({
  title: "",
  visible:false
});
// 打开弹窗
const openDialog = (obj: any) => {
  dialogData.title = "新增";
  dialogData.visible = true;
};


// 暴露变量
defineExpose({
  openDialog
});

</script>

<style scoped>

</style>
