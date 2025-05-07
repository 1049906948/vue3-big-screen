<template>
  <div class="ck-container">
    <div class="box">
      <el-row :gutter="20">
        <el-col class="box" v-for="sub in data" :key="sub" :span="6">
          <el-card class="item" shadow="hover">
            <div class="card-content" @click="handleUrl(sub.url)">
              <span class="title">{{sub.name}}</span>
            </div>
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
  console.log(url,'444')
  router.push(url);
}
</script>

<style lang="scss" scoped>
.ck-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  padding: 30px 0;
}

.box {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  
  .item {
    margin-bottom: 15px;
    border-radius: 8px;
    transition: all 0.3s ease;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }

    .card-content {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 15px;
      
      .title {
        font-size: 16px;
        font-weight: 500;
        color: #2c3e50;
        transition: all 0.3s ease;
      }
    }

    &:hover .title {
      color: #3de7c9;
    }
  }
}

@media screen and (max-width: 768px) {
  .box {
    width: 95%;
  }
}
</style>
