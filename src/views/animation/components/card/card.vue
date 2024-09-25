<template>
    <div class="container">
      <!-- 方块盒子 -->
      <div class="item" ref="cardRef1"></div>
      <!-- 方块盒子 -->
      <div class="item" ref="cardRef2"></div>
      <!-- 方块盒子 -->
      <div class="item" ref="cardRef3"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useLightCard } from './use-light-card';
  
  const { cardRef: cardRef1 } = useLightCard();
  const { cardRef: cardRef2 } = useLightCard({
    light: {
      color: '#ffffff',
      width: 100,
    },
  });
  const { cardRef: cardRef3 } = useLightCard({
    light: {
      color: 'yellow',
    },
  });
  </script>
  
  <style scoped lang="scss">
  .container {
    background: black;
    width: 100%;
    height: 100%;
    padding: 200px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  
    .item {
      position: relative;
      width: 125px;
      height: 125px;
      background: #1c1c1f;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  </style>