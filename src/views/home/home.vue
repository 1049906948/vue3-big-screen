<template>
  <div class="ck-container">


    <div class="box">
      <el-row :gutter="12">
        <el-col class="box" v-for="sub in data" :key="sub" :span="6">
          <el-card  class="item" shadow="always">
            <div @click="handleUrl(sub.url)">{{sub.name}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {data} from "@/views/home/com.config";
import { RouteLocationRaw, useRouter } from "vue-router";
const router = useRouter();

function handleUrl(url:any) {

  router.push(url);
}
</script>

<style lang="scss" scoped>
.box {
  width: 80%;
  margin: 0 auto 20px;
  //border: 1px solid red;
  .item {
    text-align: center;
    cursor: pointer;
    height: 80px;
    line-height: 40px;
    &:hover {
      background: #3de7c9;
    }
  }
}
</style>
