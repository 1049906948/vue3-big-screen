<template>
    <ckLoading>
        <div class="p-4 bg-gray-50 min-h-screen">
            <div class="w-2/4 border-1 m-auto mt-20">
                <el-button type="primary" @click="handleClick">api</el-button>
                <el-button type="primary" @click="handleStart">屏幕分享</el-button>
                <el-button type="primary" @click="handleRecord">开始录制</el-button>
                <el-button type="primary" @click="handleStop">结束录制</el-button>
                <el-button type="primary" @click="handleDownload">下载视频</el-button>
            </div>
        </div>
    </ckLoading>
</template>

<script setup>
import { ref } from 'vue';
import * as rrweb from 'rrweb';
let recorder = ref(null);
let events = ref([]);
function handleClick() {
    console.log(rrweb);
}
function handleStart() {
    console.log(rrweb);
}
function handleRecord() {
    try {
        recorder.value = rrweb.record({
            // sampling: 0.5, // 每秒采样两次
            // ignore: ['input[type="password"]'], // 忽略密码输入框的变化
            // maxMissedFrames: 10, // 在性能问题时最多跳过10帧
            // checkDOMChange: false, // 禁用DOM变化检查
            // blockClass: 'do-not-record', // 不录制拥有该类名的元素内容
            emit(event) {
                // 在这里处理记录的事件，例如发送到服务器
                console.log(event, 'event');
                events.value.push(event);
                // if (events.value.length > 5) {
                //     // 当事件数量大于 100 时停止录制
                //     recorder.value();
                // }
                // 发送到服务器的代码
                // fetch('/api/log', {
                //   method: 'POST',
                //   body: JSON.stringify(event),
                //   headers: {
                //     'Content-Type': 'application/json',
                //   },
                // });
            },
            // 可以配置其他选项，如采样率、忽略某些事件等
        });
        // console.error('start:', recorder.value);
        // recorder.value.start();
    } catch (error) {
        console.error('Error creating recorder instance:', error);
    }
}
function handleStop() {
    if (!recorder.value) {
        console.error('记录器未初始化。请先开始录制。');
        return;
    }
    console.log('events:', events.value);
    recorder.value();
}
function handleDownload() {
    console.log(rrweb);
}

</script>