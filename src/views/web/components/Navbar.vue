<template>
  <!-- nav 导航栏start-->
  <nav class="w-full flex md:justify-center justify-between items-center p-4">
    <div class="md:flex-[0.5] flex-initial justify-center items-center">
      <img alt="logo" class="w-8 h-8 cursor-pointer block" src="favicon.ico"/>
    </div>
    <ul class="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
      <li v-for="item in comments" class="mx-4 cursor-pointer">{{ item.title }}</li>
      <li class="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
        登录
      </li>
    </ul>
    <div class="flex relative">
      <div v-if="toggleMenu" class="text-white md:hidden cursor-pointer" @click="setToggleMenu(true)">
        <el-icon><Fold /></el-icon>
      </div>
      <div v-else class="text-white md:hidden cursor-pointer" @click="setToggleMenu(false)">
        <el-icon><Expand /></el-icon>
      </div>
      <ul v-if="!toggleMenu" class="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in bg-black-50 gradient-bg-welcome">
        <li class="text-xl w-full my-2">
          <div class="text-white md:hidden cursor-pointer" @click="setToggleMenu(false)">
            <el-icon>
              <CloseBold/>
            </el-icon>
          </div>
        </li>
        <li v-for="item in comments" class="mx-4 cursor-pointer my-10 text-lg text-black text-white">{{ item.title }}</li>
      </ul>
    </div>
  </nav>
  <!-- nav 导航栏end-->
</template>

<script setup>
import {ref, onMounted} from "vue";

const list = [
  {
    title: "交易",
    English: "Market"
  },
  {
    title: "兑换",
    English: "Exchange"
  },
  {
    title: "教程",
    English: "Tutorials"
  },
  {
    title: "钱包",
    English: "Wallets"
  }
]
const comments = ref(list);
const toggleMenu = ref(true);

function setToggleMenu(bol) {
  if (bol) {
    toggleMenu.value = false
  } else {
    toggleMenu.value = true
  }
}

</script>

<style scoped>
.gradient-bg-welcome {
  background-color: #0f0e13;
  background-image: radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%),
  radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%),
  radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%);
}
</style>
