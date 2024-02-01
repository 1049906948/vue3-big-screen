<template>
  <div class="bg-gray-50 min-h-screen pt-20">
    <el-config-provider :locale="zhCn">

    </el-config-provider>
  </div>
</template>

<script>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
export default {
  name: "demo",
  setup: function (props) {
    return{
      zhCn
    }
  }
}
</script>

<style scoped>

</style>
