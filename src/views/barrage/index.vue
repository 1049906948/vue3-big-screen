<template>
  <div class="home p-4 bg-gray-50 min-h-screen">
    <h2 style=" text-align: center;">Vue-barrage 基于vue的弹幕组件</h2>
    <div class="ck-content">
      <!-- 确保父元素是相对定位，弹幕容器是绝对定位 -->
      <v-barrage :arr="arr" :isPause="isPause" :percent="100"></v-barrage>
    </div>
    <div class="barrage-control">
      <input id="sendContent" v-model="sendContent" placeholder="回车发送" type="text" @keyup.enter="sendBarrage"/>
      方向:
      <select v-model="direction" style="margin:0px 12px;">
        <option value="default">默认</option>
        <option value="top">顶部</option>
      </select>
      <input v-model="isJs" type="checkbox"/> js弹幕(直接写代码)
      <button id="sendBarrageBtn" style="margin-left:25px;" @click="sendBarrage">发送</button>
      <button id="pauseBtn" @click="isPause=true">暂停</button>
      <button id="startBtn" @click="isPause=false">开始</button>
    </div>
  </div>
</template>

<script>
import VBarrage from './components/ck-barrage/index.vue'

export default {
  name: 'home',
  components: {
    VBarrage
  },
  data() {
    return {
      arr: [],
      isPause: false,
      sendContent: null,
      isJs: false,
      direction: 'default'
    }
  },
  mounted() {
    this.initTestData();
  },
  methods: {
    // 初始化模拟弹幕数据
    initTestData() {
      let arr = [
        '这是一条有弹幕',
        '今天去打LOL',
        '可以吗？',
        '一起嗨！！！'
      ]
      for (let i = 0; i < 6; i++) {
        for (let index = 0; index < 1000; index++) {
          if (index % 2 == 0) {
            this.arr.push({
              direction: 'top',
              content: arr[parseInt(Math.random() * arr.length)]
            })
          } else {
            this.arr.push({
              direction: 'default',
              content: arr[parseInt(Math.random() * arr.length)]
            })
          }
        }
      }
    },
    // 发送弹幕
    sendBarrage() {
      if (this.arr.length > 1 && this.sendContent != '' && this.sendContent != null) {
        this.arr.unshift({
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: 'red',
            fontSize: '25px'
          },
          isJs: this.isJs
        });
      } else {
        this.arr.push({
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: 'red'
          },
          isJs: this.isJs
        });
      }
      this.sendContent = null;
    },
  }
}
</script>
<style lang="scss" scoped>
.ck-content {
  height: 400px;
  width: 800px;
  position: relative;
  margin: 0px auto;
  background: #000;
}

.barrage-control {
  text-align: center;
  margin: 10px 0px;
}
</style>
