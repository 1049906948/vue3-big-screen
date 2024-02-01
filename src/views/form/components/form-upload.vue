<template>
  <el-dialog :title="dialogData.title" v-model="dialogData.visible" :close-on-click-modal="false" draggable>
    <el-form ref="formDialogRef" :model="form" :rules="dataRules"  label-width="120px" v-loading="loading">
      <el-row class="mb-5">
        <el-col :span="24">
          <el-form-item label="上传图片" prop="timekeepingRecord">
              <ck-upload v-model="form.timekeepingRecord"></ck-upload>
          </el-form-item>
        </el-col>
      </el-row>
     </el-form>

    <template #footer>
        <span class="dialog-footer">
           <el-button type="primary" @click="handleSubmit" :disabled="loading">保存</el-button>
           <el-button @click="resetForm(formDialogRef)">取消</el-button>
        </span>
    </template>

   </el-dialog>
</template>

<script setup lang="ts"  name="form-upload">
const loading = ref(false)
const formDialogRef = ref()

const CkUpload = defineAsyncComponent(() => import('./Upload/index.vue'));


interface BasicForm {
  timekeepingRecord:any
}

// 提交表单数据
const form:BasicForm = reactive<BasicForm>({
  timekeepingRecord:[]
});

// 定义校验规则
const dataRules = ref({
  timekeepingRecord: [{ required: true, message: "上传图片" }],
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
  const str:any = "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100,https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
  const arr= str.split(',').map((item:any)=>({url:item}))
  form.timekeepingRecord = arr
};



const handleSubmit = async ()=>{
  const valid = await formDialogRef.value.validate().catch(() => {});
  if (!valid) return false;
  dialogData.visible = false;
}

const resetForm = ()=>{
  formDialogRef.value?.resetFields();
  dialogData.visible = false;
}


// 暴露变量
defineExpose({
  openDialog
});

</script>

<style scoped>

</style>
