<template>
  <div :title="cells[c][r]" class="cell" @click="editing = true">
    <input
        v-if="editing"
        :value="cells[c][r]"
        @blur="update"
        @change="update"
        @vnode-mounted="({ el }) => el.focus()"
    >
    <span v-else>{{ evalCell(cells[c][r]) }}</span>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { cells, evalCell } from '../com.config'
const editing = ref(false)

const props = defineProps({
  c: {
    type: String,
    default: '',
  },
  r: {
    type: String,
    default: '',
  },
})

function update(e) {
  editing.value = false
  cells[props.c][props.r] = e.target.value.trim()
}

</script>

<style scoped>

</style>
