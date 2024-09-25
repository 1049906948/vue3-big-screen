<template>
    <el-affix :offset="16" style="height: 74px; width: 100%">
      <div class="btn-container">
        <el-button   type="primary" @click="() => (drawer = true)">
          查看 JSON
        </el-button>
        <el-button type="primary" @click="saveAsPng">
          保存图片
        </el-button>
        <div class="slider">
          <el-button  type="primary"  icon="el-icon-minus" style="margin-right: 16px; width: 32px" @click="zoom -= 0.1" />
          <el-slider v-model="zoom" :marks="marks" :min="0.1" :max="5" :step="0.1" height="200px" />
          <el-button  type="primary" icon="el-icon-plus" style="margin-left: 16px; width: 32px" @click="zoom += 0.1" />
        </div>
      </div>
    </el-affix>
    <div  class="affix-container" :style="`transform: scale(${zoom})`" style="transform-origin: 0 0">
<!--      <sc-workflow class="workflow" ref="workflowRef" id="content-to-capture" v-model="data.nodeConfig" />-->
      <el-drawer  v-model="drawer" size="500px" class="drawer" :append-to-body="true" :modal="false" :with-header="false">
        <div style="height: 100vh">
          <div style="padding: 1px; background-color: #3883fa">
            <el-button   type="primary" plain @click="copyParseJson">
              复制格式化后的 JSON
            </el-button>
            <el-button type="primary" plain  @click="copyJson">
              复制压缩后的 JSON
            </el-button>
            <el-button type="primary" plain @click="drawer = false">
              关闭弹窗
            </el-button>
          </div>
          <json-editor-vue  class="editor" language="zh-CN" current-mode="view" v-model="data" />
        </div>
      </el-drawer>
    </div>
  </template>
  <script setup name="Workflow">
  // import { ref, reactive, onMounted } from 'vue'
  import html2canvas from 'html2canvas'
  import useClipboard from 'vue-clipboard3'







  // import scWorkflow from './scWorkflow/index.vue'
  import { mockData } from './com.config'
  const zoom = ref(1)
  const marks = reactive({
    0.1: 'min',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: 'max'
  })

  const drawer = ref(false)

  const data = ref(mockData)

  const { toClipboard } = useClipboard()

  const copyParseJson = async () => {
    await toClipboard(JSON.stringify(data.value, null, '  '))
  }

  const copyJson = async () => {
    await toClipboard(JSON.stringify(data.value))
  }

  const handleWeel = (e) => {
    e.preventDefault()
    if (e.wheelDelta < 0) {
      zoom.value -= 0.1
    } else {
      zoom.value += 0.1
    }

    if (zoom.value <= 0.1) {
      zoom.value = 0.1
    } else if (zoom.value >= 5) {
      zoom.value = 5
    }
  }

  const saveAsPng = async () => {
    const element = document.getElementById('content-to-capture')
    element.parentElement.style.transform = 'scale(1)'
    const canvas = await html2canvas(element, {
      backgroundColor: '#efefef'
    })
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    let link = document.createElement('a')
    link.download = `flowlong-${Date.now()}.png`
    link.href = image
    link.click()
  }

  onMounted(() => {
    document.getElementById('app').onwheel = (e) => handleWeel(e)
  })
  </script>

  <style>
  :root {
    --el-drawer-padding-primary: 0;
  }

  body {
    margin: 0;
    background-color: #efefef;
  }

  .affix-container {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
  }

  .editor {
    width: 500px;
    height: calc(100vh - 36px);
  }

  .editor .jsoneditor-poweredBy,
  .editor .jsoneditor-transform,
  .editor .jsoneditor-repair,
  .editor .full-screen {
    display: none !important;
  }

  .workflow {
    padding: 10px;
  }

  .jsoneditor-menu > button.jsoneditor-copy {
    background-position: -48px 0px;
  }

  .el-drawer__body {
    padding: 0 !important;
  }

  .btn-container {
    display: flex;
    height: 42px;
    margin-left: 16px;
  }

  .slider {
    margin-left: 16px;
    width: 300px;
    display: flex;
  }
  </style>
