<template>
  <div class="bg-gray-50">
    <el-config-provider :locale="zhCn">
      <el-card class="box-card m-auto">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="activeName">
            <el-input v-model="ruleForm.activeName"></el-input>
          </el-form-item>
          <el-form-item label="门店范围" prop="storeList">
            <el-select v-model="ruleForm.storeList" placeholder="请选择门店范围" >
              <el-option label="测试门店" value="1"></el-option>
              <el-option label="测试商家" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="活动时段" prop="dateTime">
            <el-date-picker v-model="ruleForm.dateTime" type="datetimerange" start-placeholder="开始时间"  end-placeholder="结束时间"/>
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
            <el-upload  class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.businessLicense" :src="ruleForm.businessLicense" class="avatar"  />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
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
    </el-config-provider>
  </div>
</template>
<script>
import { Plus } from "@element-plus/icons-vue";
import ElNotification from "element-plus";
import { reactive, ref, watch } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { formatDay } from "./com.config";

export default {
  name:"ck-form",
  components: {
    Plus,
  },
  setup: function (props) {
    const ruleFormRef = ref(null);
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入有效手机号"));
      } else {
        if (/^1[34578]\d{9}$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入有效手机号"));
        }
      }
    };
    const ruleForm = reactive({
      activeName: "",
      storeList: "",
      phone: "",
      dateTime: [],
      activeStartTime: "",
      activeEndTime: "",
      freightType: "",
      businessLicense: "",
      distributionChannels: [],
      account: true,
    });
    const rules = reactive({
      activeName: [
        { required: true, message: "促销名称不能为空", trigger: "blur" },
        { min: 1, max: 20, message: "促销名称不能超过20个字", trigger: "blur" },
      ],
      storeList: [
        { required: true, message: "门店范围不能为空", trigger: "blur" },
      ],
      phone: [
        { required: true, message: "电话不能为空", trigger: "blur" },
        { validator: validatePhone, trigger: "blur" },
      ],
      dateTime: [
        {
          required: true,
          type: "array",
          message: "请选择工时时间段",
          fields: {
            0: {
              required: true,
              message: "请选择开始时间",
              trigger: "change",
              type: "date",
            },
            1: {
              required: true,
              message: "请选择结束时间",
              trigger: "change",
              type: "date",
            },
          },
        },
      ],
      // activeEndTime: [
      //   {type: 'date', required: true, message: '请选择时间', trigger: 'blur'}
      // ],
      freightType: [
        { required: true, message: "运费类型不能为空", trigger: "blur" },
      ],
      businessLicense: [
        { required: true, message: "营业执照不能为空", trigger: "blur" },
      ],
      distributionChannels: [
        {
          type: "array",
          required: true,
          message: "销售渠道必选",
          trigger: "blur",
        },
      ],
    });
    const submitForm = async () => {
      ruleForm.activeStartTime = formatDay(ruleForm.dateTime[0]);
      ruleForm.activeEndTime = formatDay(ruleForm.activeEndTime[1]);

      console.log(ruleForm, "ruleForm");
      console.log(ruleFormRef, "formRef");
      await ruleFormRef.value.validate((valid) => {
        if (valid) {
          const obj = ruleForm;
          console.log(obj, "formobj");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    const resetForm = () => {
      ruleFormRef.value.resetFields();
    };
    const handleAvatarSuccess = (e) => {
      console.log(e, "handleAvatarSuccess");
    };
    const beforeAvatarUpload = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // 读取成 data url
      reader.onload = function (e) {
        ruleForm.businessLicense = e.target.result;
      };
      // const type = file.type
      // const typeArr = ['image/png', 'image/jpg']
      // if (!typeArr.includes(type)) {
      //   ElNotification({
      //     title: 'Error',
      //     message: '只支持png，jpg格式！',
      //     type: 'error',
      //   })
      //   return false
      // }
    };

    return {
      zhCn,
      ElConfigProvider,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      resetForm,
      handleAvatarSuccess,
      beforeAvatarUpload,
    };
  },
};
</script>
<style scoped>
.demo-ruleForm {
  width: 500px;
}
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
