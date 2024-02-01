<script setup lang="ts">
import { computed } from 'vue';
import { getItemSizeStyle } from './drag';

const props = withDefaults(
  defineProps<{
    /** 容器格子宽 */
    width: number;
    /** 容器格子高 */
    height: number;
    /** 格子间隔 */
    gap: number;
    /** 拖拽元素列数 */
    column: number;
    /** 拖拽元素行数 */
    row: number;
    /** 拖拽元素 x 坐标 */
    x: number;
    /** 拖拽元素 y 坐标 */
    y: number;
    /** 是否可以放置 */
    isPutDown: boolean;
  }>(),
  {
    width: 0,
    height: 0,
    gap: 0,
    column: 0,
    row: 0,
    x: 0,
    y: 0,
    isPutDown: false,
  }
);

const maskStyle = computed(() =>
  getItemSizeStyle(
    props.width,
    props.height,
    props.x,
    props.y,
    props.gap,
    props.column,
    props.row
  )
);
// grid-area 无过渡动画
// {
// 'grid-area': `${props.y + 1} / ${props.x + 1} / ${props.y + props.row + 1}/ ${
//   props.x + props.column + 1
// }`,
// }
</script>
<template>
  <div class="move-mask" :style="maskStyle">
    <slot>
      <div
        class="move-mask__default"
        :style="{
          backgroundColor: props.isPutDown ? '#2867f91c' : '#ff00001c',
          borderColor: props.isPutDown ? '#2c68f3' : '#ff000079',
        }"
      ></div>
    </slot>
  </div>
</template>
<style scoped lang="scss">
.move-mask {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  transition: all 0.2s;
  z-index: 2;
  opacity: 1;

  &__default {
    height: 100%;
    border-radius: 6px;
    box-sizing: border-box;
    border: 2px solid #2867f979;
    background-color: #2867f91c;
    border-color: #f56f6f;
    background-color: #ff00001f;
  }
}
</style>
