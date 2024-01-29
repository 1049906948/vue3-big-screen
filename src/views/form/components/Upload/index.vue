<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      :on-preview="handlePreview"
      :before-upload="beforeAvatarUpload"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :headers="headers"
      :limit="limit"
      :data="data"
      list-type="picture-card"
    >
      <el-icon>
        <Plus/>
      </el-icon>
    </el-upload>
    <el-dialog width="30%" v-model="dialogVisible">
      <div>
        <img w-full :src="dialogImageUrl" alt="Preview Image"/>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {UploadProps,ElMessage} from "element-plus";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
  // 数量限制
  limit: {
    type: Number,
    default: 5,
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5,
  },
  fileType: {
    type: Array,
    default: () => ['png', 'jpg', 'jpeg', 'doc', 'xls', 'ppt', 'txt', 'pdf', 'docx', 'xlsx', 'pptx', 'mp3'],
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true,
  },
  uploadFileUrl: {
    type: String,
    default: '/admin/sys-file/upload',
  },
  type: {
    type: String,
    default: 'default',
    validator: (value: string) => {
      return ['default', 'simple'].includes(value);
    },
  },
  data: {
    type: Object,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
});

const headers = computed(() => {
  return {
    // Authorization: 'Bearer ' + Session.get('token'),
    // 'TENANT-ID': Session.getTenant(),
  };
});


const dialogVisible = ref(false)
const dialogImageUrl: any = ref('')

const fileList = defineModel<any []>()

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogVisible.value = true
  dialogImageUrl.value = uploadFile.url
}

const beforeAvatarUpload = (file: File) => {

  // 校检文件类型
  // if (props.fileType.length) {
  //   const fileName = file.name.split('.');
  //   const fileExt = fileName[fileName.length - 1];
  //   const isTypeOk = props.fileType.indexOf(fileExt) >= 0;
  //   if (!isTypeOk) {
  //     ElMessage.error(`${t('excel.typeErrorText')} ${props.fileType.join('/')}!`);
  //     return false;
  //   }
  // }

  // const reader = new FileReader();
  // reader.readAsDataURL(file); // 读取成 data url
  // reader.onload = function (e: any) {
  //   let obj = {
  //     url: e.target.result
  //   }
  //   fileList.value?.push(obj)
  // };



}

// 上传成功回调
function handleUploadSuccess(res: any, file: any) {
  if (res.code === 0) {
     fileList.value?.push({ name: file.name, url: res.data.url })
    // uploadList.value.push({ name: file.name, url: res.data.url });
    // uploadedSuccessfully();
  } else {
    // number.value--;
    // useMessage().error(res.msg);
    // fileUpload.value.handleRemove(file);
    // uploadedSuccessfully();
  }
}


const handleUploadError = () => {
  ElMessage.error('上传文件失败');
};



</script>

<style scoped>

</style>
