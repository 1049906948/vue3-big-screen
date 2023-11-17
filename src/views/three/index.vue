<template>
  <div class="p-10 bg-gray-50 min-h-screen">
      <div id="my-three" ref="screenDom"></div>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {TrackballControls} from "three/addons/controls/TrackballControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { onMounted, ref } from "vue";
import {FlyControls} from "three/addons/controls/FlyControls";
import {PointerLockControls} from "three/addons/controls/PointerLockControls";


let screenDom = ref(null);

onMounted(() => {
  // 1.创建场景
  const scene = new THREE.Scene();

  // 2.创建透视投影相机
  const camera = new THREE.PerspectiveCamera(
      50,
      screenDom.value.clientWidth / screenDom.value.clientHeight,
      0.1,
      1000
  );
  // 设置相机位置
  camera.position.set(5, 10, 10);

  // 3.创建WebGLRenderer渲染器
  const renderer = new THREE.WebGLRenderer();

  // 通过setSize()方法设置渲染的长宽
  renderer.setSize(screenDom.value.clientWidth, screenDom.value.clientHeight);
  // 设置渲染位置
  screenDom.value.appendChild(renderer.domElement);

  // 4.创建一个长、宽、高均为5个单位的立方体
  const geometry = new THREE.BoxGeometry(5, 5, 5);

  // 5.创建Lambert网格材质
  const materialBasic = new THREE.MeshLambertMaterial({
    color: 0x00ff00, // 绿色
    wireframe: true, //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
  });

  // 6.创建一个网格模型对象
  const mesh = new THREE.Mesh(geometry, materialBasic); //网络模型对象Mesh
  // 把网格模型添加到三维场景
  scene.add(mesh);
  // 设置相机看向物体的方向(默认指向三维坐标系的原点)
  camera.lookAt(0, 0, 0);
  // 修改几何体位置
  mesh.position.set(3, 0, 0);

  // 7.创建光源
  const spotLight1 = new THREE.SpotLight(0xffffff, 1); //(光照颜色, 光照强度)
  // 设置光源位置
  spotLight1.position.set(10, 10, 10);
  const spotLight2 = new THREE.SpotLight(0xffffff, 1); //(光照颜色, 光照强度)
  // 设置光源位置
  spotLight2.position.set(-10, -10, -10);
  // 将光源添加到场景中
  scene.add(spotLight1, spotLight2);

  // 8.为了方便观察3D图像，添加三维坐标系对象
  const axes = new THREE.AxesHelper(8); // 坐标系轴长设置为8
  // 把三维坐标系 添加到场景中
  scene.add(axes);

  // 9.添加控制器  轨道控制器
  let control = new OrbitControls(camera, renderer.domElement);

  //轨迹球控制器
  // const controls = new TrackballControls(camera, renderer.domElement);
  //飞行控制器
  // const controls = new FlyControls(camera, renderer.domElement);
  //指针锁定控制器
  // const controls = new PointerLockControls(camera, renderer.domElement);


  // 10.动态渲染
  function render() {
    //循环调用
    requestAnimationFrame(render);
    //渲染
    renderer.render(scene, camera);
  }

  // // 创建 GLTFLoader
  // const loader = new GLTFLoader();
  //
  // // 加载 GLTF 格式的模型文件
  // loader.load('path/to/your/model.gltf', (gltf) => {
  //   const model = gltf.scene;
  //   scene.add(model);
  //   renderer.render(scene, camera);
  // });
  //
  //
  // // 创建 OBJLoader
  // const loaders = new OBJLoader();
  //
  // // 加载 OBJ 格式的模型文件
  // loaders.load('path/to/your/model.obj', (object) => {
  //   scene.add(object);
  //   renderer.render(scene, camera);
  // });





  render();
});
</script>

<style lang="scss" scoped>
#my-three {
  width: 100%;
  height: 90vh;
}
</style>

