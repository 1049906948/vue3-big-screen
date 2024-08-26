<template>
    <div class="container">
        <canvas ref="canvas" id="canvas" width="1400" height="600"></canvas>
    </div>
</template>

<script setup>
import { useDraw } from './com.config'
import { ref, onMounted } from 'vue'
onMounted(() => {
    useDraw()
})

</script>
