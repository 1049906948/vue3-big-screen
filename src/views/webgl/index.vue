<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <div>
      <div id="info">
        <h2>
          学习视频点击
        </h2>
        <h2>
          请确保你的浏览器支持 WebGL，可以点击
          <a href="https://get.webgl.org/" target="_blank">这里</a>
          进行检测。如果不支持，可百度处理方案。
        </h2>
        <h2 class="red">
          服务器比较慢（1M带宽），获取 3D
          模型耗时较长（实测一分钟左右），请耐心等待......
        </h2>
        <br/><br/>
        <span class="colorPicker">
    <input id="body-color" type="color" value="#ff0000"/>
    <br/>
    车身
   </span>
        <span class="colorPicker">
    <input id="details-color" type="color" value="#ffffff"/>
    <br/>
    轮毂
   </span>
        <span class="colorPicker">
    <input id="glass-color" type="color" value="#ffffff"/>
    <br/>
    玻璃
   </span>
      </div>
      <div id="container"></div>
    </div>
  </div>
</template>

<script setup>
// 导入Three.js库
import * as THREE from 'three'
// 导入轨道控制器OrbitControls
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 导入GLTF模型加载器
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// 导入DRACO解码器加载器
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
// 导入HDR贴图加载器
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
// 导入Vue的onMounted钩子函数
import { onMounted } from 'vue'

// 定义相机、场景、渲染器对象
let camera, scene, renderer

// 定义网格帮助器对象
let grid
// 定义控制器对象
let controls

// 定义一个数组用于存储车轮模型对象
const wheels = []

function init() {
  // 获取容器元素
  const container = document.getElementById('container')

  // 创建WebGL渲染器对象，启用抗锯齿
  renderer = new THREE.WebGLRenderer({ antialias: true })
  // 设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio)
  // 设置渲染器的大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染循环函数
  renderer.setAnimationLoop(render)
  // 设置色调映射算法
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  // 设置曝光度
  renderer.toneMappingExposure = 0.85
  // 将渲染器的画布元素添加到容器中
  container.appendChild(renderer.domElement)

  // 监听窗口大小变化事件，调用onWindowResize函数
  window.addEventListener('resize', onWindowResize)

  // 创建透视相机对象
  camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
  )
  // 设置相机位置
  camera.position.set(4.25, 1.4, -4.5)

  // 创建轨道控制器对象
  controls = new OrbitControls(camera, container)
  // 启用阻尼效果
  controls.enableDamping = true
  // 设置控制器能够缩放的最大距离
  controls.maxDistance = 9
  // 设置控制器的焦点位置
  controls.target.set(0, 0.5, 0)
  // 更新控制器
  controls.update()

  // 创建场景对象
  scene = new THREE.Scene()
  // 设置场景的背景颜色为黑色
  scene.background = new THREE.Color(0x333333)

  // 加载HDR贴图作为场景的环境贴图
  scene.environment = new RGBELoader().load(
      // require('@/assets/venice_sunset_1k.hdr').default
  )
  // 设置环境贴图的映射方式为球形映射
  scene.environment.mapping = THREE.EquirectangularReflectionMapping
  // 创建雾效对象，设置雾的颜色和范围
  scene.fog = new THREE.Fog(0xffffff, 9, 15)

  // 创建网格帮助器对象，设置网格的大小和颜色
  grid = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff)
  // 设置网格材质的透明度
  grid.material.opacity = 0.2
  // 禁用网格材质的深度写入
  grid.material.depthWrite = false
  // 设置网格材质为透明材质
  grid.material.transparent = true
  // 将网格帮助器添加到场景中
  scene.add(grid)

  // 材料设置
  // 创建车身材质对象，设置颜色和物理属性
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1.0,
    roughness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    sheen: 0.5
  })

  // 创建细节材质对象，设置颜色和物理属性
  const detailsMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.5
  })

  // 创建玻璃材质对象，设置颜色和物理属性
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.25,
    roughness: 0,
    transmission: 1.0
  })

  // 获取车身颜色输入框元素
  const bodyColorInput = document.getElementById('body-color')
  // 监听车身颜色输入框的变化，设置车身材质的颜色
  bodyColorInput.addEventListener('input', function () {
    bodyMaterial.color.set(this.value)
  })

  // 获取细节颜色输入框元素
  const detailsColorInput = document.getElementById('details-color')
  // 监听细节颜色输入框的变化，设置细节材质的颜色
  detailsColorInput.addEventListener('input', function () {
    detailsMaterial.color.set(this.value)
  })

  // 获取玻璃颜色输入框元素
  const glassColorInput = document.getElementById('glass-color')
  // 监听玻璃颜色输入框的变化，设置玻璃材质的颜色
  glassColorInput.addEventListener('input', function () {
    glassMaterial.color.set(this.value)
  })

  // 车辆设置
  // 加载车辆阴影贴图
  const shadow = new THREE.TextureLoader().load(
      // require('@/assets/ferrari_ao.png')
  )
  // 创建DRACO解码器加载器对象
  const dracoLoader = new DRACOLoader()

  // 设置DRACO解码器的路径
  dracoLoader.setDecoderPath('decoder/')

  // 创建GLTF模型加载器对象
  const loader = new GLTFLoader()
  // 设置模型加载器的DRACO解码器
  loader.setDRACOLoader(dracoLoader)

  loader.load(require('@/assets/ferrari.glb').default, function (gltf) {
    // 获取加载的模型对象
    const carModel = gltf.scene.children[0]
    // 设置车身部分的材质为车身材质
    carModel.getObjectByName('body').material = bodyMaterial

    // 设置前左轮辋的材质为细节材质
    carModel.getObjectByName('rim_fl').material = detailsMaterial
    // 设置前右轮辋的材质为细节材质
    carModel.getObjectByName('rim_fr').material = detailsMaterial
    // 设置后右轮辋的材质为细节材质
    carModel.getObjectByName('rim_rr').material = detailsMaterial
    // 设置后左轮辋的材质为细节材质
    carModel.getObjectByName('rim_rl').material = detailsMaterial
    // 设置车辆细节部分的材质为细节材质
    carModel.getObjectByName('trim').material = detailsMaterial
    // 设置玻璃部分的材质为玻璃材质
    carModel.getObjectByName('glass').material = glassMaterial

    // 将车辆的四个车轮模型对象添加到数组中
    wheels.push(
        carModel.getObjectByName('wheel_fl'),
        carModel.getObjectByName('wheel_fr'),
        carModel.getObjectByName('wheel_rl'),
        carModel.getObjectByName('wheel_rr')
    )

    // 阴影配置
    // 创建阴影平面模型
    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
        new THREE.MeshBasicMaterial({
          map: shadow,
          blending: THREE.MultiplyBlending,
          toneMapped: false,
          transparent: true
        })
    )
    // 设置阴影平面模型的旋转角度
    mesh.rotation.x = -Math.PI / 2
    // 设置阴影平面模型的渲染顺序
    mesh.renderOrder = 2
    // 将阴影平面模型添加到车辆模型中
    carModel.add(mesh)

    // 将车辆模型添加到场景中
    scene.add(carModel)
  })
}

function onWindowResize() {
  // 调整相机的纵横比
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机的投影矩阵
  camera.updateProjectionMatrix()

  // 调整渲染器的大小
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  // 更新控制器
  controls.update()

  // 获取当前时间
  const time = -performance.now() / 1000

  // 设置车轮的旋转角度
  for (let i = 0; i < wheels.length; i++) {
    wheels[i].rotation.x = time * Math.PI * 2
  }

  // 设置网格的位置
  grid.position.z = -time % 1

  // 渲染场景
  renderer.render(scene, camera)
}

// 在挂载时调用初始化函数
onMounted(() => {
  init()
})
</script>

<style scoped>

</style>
