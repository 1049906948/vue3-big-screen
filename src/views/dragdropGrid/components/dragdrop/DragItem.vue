<script setup lang="ts">
import { dragStore } from './drag';

const props = withDefaults(
  defineProps<{
    data: DragItem;
    /** 拖拽分组标识 */
    groupName?: string;
  }>(),
  {
    groupName: 'DrapDrop',
  }
);

const onDragstart = (e) => dragStore.set(props.groupName, { ...props.data });
const onDragend = () => dragStore.remove(props.groupName);
</script>
<template>
  <div class="drag-item">
    <div
      class="drag-item__el"
      draggable="true"
      @dragstart="onDragstart"
      @dragend="onDragend"
    >
      <slot></slot>
    </div>
    <div class="drag-item__title">
      {{ data.title }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.drag-item {
  width: 100px;
  height: 88px;
  display: flex;
  flex-direction: column;

  &__el {
    width: 100px;
    height: 60px;
    border-radius: 4px;
    border: 1px solid #dddddd;
  }

  &__title {
    text-align: center;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #555555;
    line-height: 14px;
    margin-top: 14px;
  }
}
</style>
