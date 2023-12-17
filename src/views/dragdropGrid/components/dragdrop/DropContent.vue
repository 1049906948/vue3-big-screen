<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue';
import { dragStore, useBoxSize, useBoxGrid } from './drag';
import { booleanWithin, booleanIntersects } from './drag';
import PreviewItem from './PreviewItem.vue';
import MoveMask from './MoveMask.vue';

type CallbackFun = (
  e: DragItemData,
  list: DragItemData[]
) => Promise<boolean> | boolean;

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(
  defineProps<{
    modelValue: DragItemData[];
    /** 拖拽分组标识 */
    groupName?: string;
    /** 容器需要分隔列数 */
    column?: number;
    /** 容器需要分隔行数 */
    row?: number;
    /** 容器格子间隔 */
    gap?: number;
    /** 是否显示拖拽预占位层 */
    mask?: boolean;
    /** 放置前的钩子 如果返回 false 则取消放置 */
    beforeDrop?: CallbackFun;
    /** 删除前的钩子 如果返回 false 则取消删除 */
    beforeRemove?: CallbackFun;
  }>(),
  {
    groupName: 'DrapDrop',
    column: 0,
    row: 0,
    gap: 0,
    mask: true,
    beforeDrop: () => true,
    beforeRemove: () => true,
  }
);

const list = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
});

const designerContentRef = ref<HTMLElement>();
const { columnCount, rowCount } = useBoxGrid(list, props.column, props.row);

// gird 格子
const boxSize = useBoxSize(
  designerContentRef,
  props.column,
  props.row,
  props.gap
);

// 拖拽中的元素
const current = reactive({
  show: <boolean>false,
  id: <undefined | number>undefined,
  column: <number>0, // 宽
  row: <number>0, // 高
  x: <number>0, // 列
  y: <number>0, // 行
});

// 是否可以放置
const isPutDown = computed(() => {
  const currentXy = [
    current.x,
    current.y,
    current.x + current.column,
    current.y + current.row,
  ];
  return (
    booleanWithin([0, 0, columnCount.value, rowCount.value], currentXy) &&
    list.value.every(
      (item) =>
        item.id === current.id ||
        !booleanIntersects(
          [item.x, item.y, item.x + item.column, item.y + item.row],
          currentXy
        )
    )
  );
});

// 删除行
const isDelRow = computed(() => {
  const rows = Math.max(props.row, rowCount.value - 1);
  return list.value.every((item) => item.y + item.row <= rows);
});

// 计算 x 坐标
const getX = (num) => parseInt(num / (boxSize.value.width + props.gap));
// 计算 y 坐标
const getY = (num) => parseInt(num / (boxSize.value.height + props.gap));

// 进入放置目标
const onDragenter = (e) => {
  e.preventDefault();
  const dragData = dragStore.get(props.groupName);
  if (dragData) {
    current.column = dragData.column;
    current.row = dragData.row;
    current.x = getX(e.offsetX) - getX(dragData?.offsetX ?? 0);
    current.y = getY(e.offsetY) - getY(dragData?.offsetY ?? 0);
    current.id = dragData.id;
    current.show = true;
  }
};

// 在目标中移动
const onDragover = (e) => {
  e.preventDefault();
  const dragData = dragStore.get(props.groupName);
  if (dragData) {
    current.x = getX(e.offsetX) - getX(dragData?.offsetX ?? 0);
    current.y = getY(e.offsetY) - getY(dragData?.offsetY ?? 0);
  }
};

// 离开目标
const onDragleave = (e) => {
  e.preventDefault();
  current.show = false;
  current.id = undefined;
};

// 放置在目标上
const onDrop = async (e) => {
  e.preventDefault();
  current.show = false;
  const item = dragStore.get(props.groupName); // JSON.parse(e.dataTransfer.getData('application/json'))
  if (
    isPutDown.value &&
    (await props.beforeDrop(
      {
        ...item,
        x: current.x,
        y: current.y,
      },
      list.value
    ))
  ) {
    if (item.id) {
      item.x = current.x;
      item.y = current.y;
    } else {
      list.value.push({
        ...item,
        x: current.x,
        y: current.y,
        id: new Date().getTime(),
      });
    }
  }
};

// 删除元素
const onRemovePreviewItem = (el) => {
  if (props.beforeRemove(el, list.value)) {
    list.value = list.value.filter((item) => item !== el);
  }
};

defineExpose({
  // 添加行
  addRow: () => (rowCount.value = rowCount.value + 1),
  // 删除行
  deleteRow: () =>
    isDelRow.value &&
    (rowCount.value = Math.max(props.row, rowCount.value - 1)),
});
</script>
<template>
  <div ref="designerContentRef" class="drop-content">
    <div
      class="drop-content__drop-container"
      @dragenter="onDragenter($event)"
      @dragover="onDragover($event)"
      @dragleave="onDragleave($event)"
      @drop="onDrop($event)"
    >
      <template v-for="x in rowCount">
        <div
          class="bg-column"
          v-for="y in columnCount"
          :key="`${x}-${y}`"
        ></div>
      </template>
    </div>
    <div class="drop-content__preview">
      <PreviewItem
        v-for="item in list"
        :key="item.id"
        :data="item"
        :group-name="groupName"
        :style="{
          pointerEvents:
            current.show && item.id !== current.id ? 'none' : 'all',
        }"
        @close="onRemovePreviewItem(item)"
      >
        <slot
          name="preview-item"
          :data="item"
          :moving="current.show && item.id !== current.id"
        ></slot>
      </PreviewItem>
      <MoveMask
        v-if="mask"
        v-show="current.show"
        v-bind="current"
        :width="boxSize.width"
        :height="boxSize.height"
        :gap="gap"
        :is-put-down="isPutDown"
      >
        <slot name="move-mask" v-bind="current" :is-put-down="isPutDown"></slot>
      </MoveMask>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.drop-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  overflow-y: auto;

  &__preview,
  &__drop-container {
    display: grid;
    row-gap: v-bind("gap+'px'");
    column-gap: v-bind("gap+'px'");
    grid-template-columns: repeat(
      v-bind('columnCount'),
        v-bind("boxSize.width+'px'")
    );
    grid-template-rows: repeat(
      v-bind('rowCount'),
        v-bind("boxSize.height+'px'")
    );
    .bg-column {
      background-color: #fff;
      border-radius: 6px;
      pointer-events: none;
    }
  }

  &__preview {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    overflow: hidden;
  }
}
</style>
