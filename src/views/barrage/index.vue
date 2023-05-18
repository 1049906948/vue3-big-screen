<template>
  <div class="home p-4 bg-gray-50 min-h-screen flex-c">
    <div class="ck-content">

      <vue-danmaku v-model:danmus="danmus" style="height:400px; width:400px;" ></vue-danmaku>

    </div>

  </div>
</template>

<script>
import vueDanmaku from 'vue3-danmaku'
import {ref} from "vue"

export default {
  setup(props) {
    const danmus = ref(['danmu1', 'danmu2', 'danmu3'])

    return { danmus }
  },
}
</script>
<style lang="scss" scoped>
.ck-content {
  height: 400px;
  width: 400px;
  position: relative;
  border: 1px solid red;
  overflow: hidden;
}

</style>
