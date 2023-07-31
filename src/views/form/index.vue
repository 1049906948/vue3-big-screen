<template>
  <div class="bg-gray-50 min-h-screen pt-20">
    <!--    <el-input v-model="activeNames"></el-input>-->
    <!--    {{activeNames}}-->
    <el-card class="box-card  m-auto">
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="activeName">
          <el-input v-model="ruleForm.activeName"></el-input>
        </el-form-item>
        <el-form-item label="门店范围" prop="storeList">
          <el-select v-model="ruleForm.storeList" placeholder="请选择门店范围">
            <el-option label="测试门店" value="1"></el-option>
            <el-option label="测试商家" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时段" required>
          <el-col :span="11">
            <el-form-item prop="activeStartTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.activeStartTime"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="activeEndTime">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.activeEndTime"
                              style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="用户手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="运费类型" prop="freightType">
          <el-radio-group v-model="ruleForm.freightType">
            <el-radio :label="3">满减</el-radio>
            <el-radio :label="6">极速达</el-radio>
            <el-radio :label="9">新人首单免运费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="营业执照" prop="businessLicense">
          <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                     :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.businessLicense" :src="ruleForm.businessLicense" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
          <p>请上传门店营业执照，支持 JPG、PNG</p>
        </el-form-item>
        <el-form-item label="销售渠道" prop="distributionChannels">
          <el-checkbox-group v-model="ruleForm.distributionChannels">
            <el-checkbox label="到家" name="type" value="1"></el-checkbox>
            <el-checkbox label="海博" name="type" value="2"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="设为默认账号" prop="account">
          <el-switch v-model="ruleForm.account"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm(ruleFormRef)">确定</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {Plus} from '@element-plus/icons-vue'
import ElNotification from 'element-plus'
import {reactive, ref, watch} from 'vue';

export default {
  components: {
    Plus
  },
  // props:{
  //   activeName:{
  //     type:Number
  //   }
  // },
  setup(props) {

    // const activeNames = ref(props.activeName)

    // activeNames.value = activeNames.value * 2

    // watch(question, async (newQuestion, oldQuestion) => {
    //   console.log(question,'22')
    // })

    const ruleFormRef = ref(null)
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入有效手机号'));
      } else {
        if (/^1[34578]\d{9}$/.test(value)) {
          callback();
        } else {
          callback(new Error('请输入有效手机号'));
        }
      }
    };
    const ruleForm = reactive({
      activeName: '',
      storeList: '',
      phone: '',
      activeStartTime: '',
      activeEndTime: '',
      freightType: '',
      businessLicense: '',
      distributionChannels: [],
      account: true
    })
    const rules = reactive({
      activeName: [
        {required: true, message: '促销名称不能为空', trigger: 'blur'},
        {min: 1, max: 20, message: '促销名称不能超过20个字', trigger: 'blur'}
      ],
      storeList: [
        {required: true, message: '门店范围不能为空', trigger: 'blur'}
      ],
      phone: [
        {required: true, message: '电话不能为空', trigger: 'blur'},
        {validator: validatePhone, trigger: 'blur'}
      ],
      activeStartTime: [
        {type: 'date', required: true, message: '请选择日期', trigger: 'blur'}
      ],
      activeEndTime: [
        {type: 'date', required: true, message: '请选择时间', trigger: 'blur'}
      ],
      freightType: [
        {required: true, message: '运费类型不能为空', trigger: 'blur'},
      ],
      businessLicense: [
        {required: true, message: '营业执照不能为空', trigger: 'blur'},
      ],
      distributionChannels: [
        {type: 'array', required: true, message: '销售渠道必选', trigger: 'blur'}
      ]
    })
    const submitForm = async () => {
      console.log(ruleFormRef, 'formRef')
      await ruleFormRef.value.validate((valid) => {
        if (valid) {
          const obj = ruleForm
          console.log(obj, 'formobj')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    const resetForm = () => {
      ruleFormRef.value.resetFields();
    }
    const handleAvatarSuccess = () => {

    }
    const beforeAvatarUpload = (file) => {
      console.log(file, 'file')
      const type = file.type
      const typeArr = ['image/png', 'image/jpg']
      if (!typeArr.includes(type)) {
        ElNotification({
          title: 'Error',
          message: '只支持png，jpg格式！',
          type: 'error',
        })
        return false
      }
    }

    return {
      // activeNames,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      resetForm,
      handleAvatarSuccess,
      beforeAvatarUpload
    }
  }
}
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
<style scoped>
.demo-ruleForm {
  width: 500px;
}
</style>