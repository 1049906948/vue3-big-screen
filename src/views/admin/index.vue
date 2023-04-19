<template>
  <ckLoading>
      <div class="ck-wapper">
         <sidebal></sidebal>
      </div>
  </ckLoading>
</template>


<script lang="ts" setup>
import sidebal from "./sidebar/index.vue"
</script>

<style lang="scss" scoped>
.el-menu{
  border-right:none;
}

.ck-wapper{
  background: #ffffff;
  width: 100vw;
  height: 100vh;
}

</style>

