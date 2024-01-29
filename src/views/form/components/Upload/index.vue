<template>
  <div>
    <el-upload v-model:file-list="imgUrl"
               :on-preview="handlePreview"
               :before-upload="beforeAvatarUpload"
               list-type="picture-card">
      <el-icon><Plus /></el-icon>
    </el-upload>
    <el-dialog width="30%" v-model="dialogVisible">
      <div>
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">

import {UploadProps} from "element-plus";

const dialogVisible = ref(false)
const dialogImageUrl:any = ref('')

const imgUrl = defineModel<any []>()

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {

  dialogVisible.value = true
  dialogImageUrl.value = uploadFile.url
}

const beforeAvatarUpload = (file:any)=>{
  const reader = new FileReader();
  reader.readAsDataURL(file); // 读取成 data url
  reader.onload = function (e:any) {
    let obj = {
      url:e.target.result
    }

    imgUrl.value?.push(obj)
  };
}



</script>

<style scoped>

</style>
