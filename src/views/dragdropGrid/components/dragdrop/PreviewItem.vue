<script setup lang="ts">
import { computed, ref } from 'vue';
import { dragStore } from './drag';

defineEmits(['close']);

const props = withDefaults(
  defineProps<{
    /** 元素放置信息 */
    data: DragItemData;
    /** 拖拽分组标识 */
    groupName?: string;
  }>(),
  {
    groupName: 'DrapDrop',
  }
);

const moveing = ref(false);
const previewStyle = computed(() => {
  return {
    'grid-area': `${props.data.y + 1} / ${props.data.x + 1} / ${
      props.data.y + props.data.row + 1
    }/ ${props.data.x + props.data.column + 1}`,
    ...(moveing.value
      ? {
        opacity: 0,
        // 将当前元素移出容器外,将元素占位空置出来
        transform: `translate(-999999999px, -9999999999px)`,
      }
      : {}),
  };
});

const onDragstart = (e) => {
  const data = props.data;
  data.offsetX = e.offsetX;
  data.offsetY = e.offsetY;
  dragStore.set(props.groupName, data);
  // 拖拽开始立刻设置 opacity: 0 会导致拖拽默认样式也会为 opacity: 0 , 需要延迟设置
  setTimeout(() => (moveing.value = true));
};

const onDragend = () => {
  moveing.value = false;
  dragStore.remove(props.groupName);
};
</script>

<template>
  <div
    class="preview-item"
    :style="previewStyle"
    draggable="true"
    @dragstart="onDragstart"
    @dragend="onDragend"
  >
    <slot>
      <div class="preview-item__default"></div>
    </slot>
    <slot name="close">
      <div class="close-btn" :size="20" @click="$emit('close')"></div>
    </slot>
  </div>
</template>
<style lang="scss" scoped>
.preview-item {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  pointer-events: all;
  opacity: 1;
  user-select: none;

  &__default {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: red;
    user-select: none;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #efefef;
    border: 2px solid #2c68f325;
    &:hover {
      border-color: #2c68f399;
      transition: all 0.2s;
    }
  }

  .close-btn {
    position: absolute;
    cursor: pointer;
    right: 4px;
    top: 4px;
    height: 20px;
    width: 20px;

    &:after,
    &:before {
      content: '';
      background: #666;
      width: 16px;
      height: 2px;
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
    &:before {
      transform: rotate(-225deg);
      top: 0;
    }
    &:after {
      transform: rotate(225deg);
      top: 0;
    }
  }
}
</style>
