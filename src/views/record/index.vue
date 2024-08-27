<template>
    <ckLoading>
        <div class="p-4 bg-gray-50 min-h-screen">
            <!-- https://www.tailwindcss.cn/docs/position -->
            <!-- https://element-plus.org/zh-CN/component/dialog.html -->

            <el-dialog v-model="isPlaying" title="视频录制" width="54%" class="relative h-5/6">
                <div v-if="isPlaying" id="replayer" ref="replayer" class="w-1/2 m-auto mt-20 absolute top-0 left-0">
                </div>
            </el-dialog>

            <!-- <el-dialog v-model="isPlaying" title="视频录制" width="54%" class="relative h-5/6">
                <div v-if="isPlaying" id="replayer" ref="replayer" class="w-1/2 m-auto mt-20 absolute top-0 left-0">
                    <div class="replayer-wrapper" id="wrapper">
                        <iframe id="replayIframe" style="width:53.85vw;"></iframe>
                    </div>
                </div>
            </el-dialog> -->


            <div class="w-1/2 border-1 m-auto mt-60 text-center">
                <el-button type="primary" @click="handleClick">api</el-button>
                <el-button type="primary" @click="handleStart">屏幕分享</el-button>
                <el-button type="primary" @click="handleRecord">开始录制</el-button>
                <el-button type="primary" @click="handleStop">结束录制</el-button>
                <el-button type="primary" @click="handleReplayer">回放</el-button>
                <!-- <el-button type="primary" @click="handleDownload">下载视频</el-button> -->
            </div>
            <div class="w-1/2 border-1 m-auto mt-20 text-center">
                <el-input type="textarea" v-model="numValue"></el-input>
            </div>
        </div>
    </ckLoading>
</template>

<script setup>
import { ref, watch } from 'vue';
import * as rrweb from 'rrweb';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
let recorder = ref(null);
const replayer = ref(null);
let events = ref([]);
let numValue = ref("");
const isPlaying = ref(false);
const replayInstance = ref(null);


watch(isPlaying, (newValue, OldValue) => {
    console.log(isPlaying.value, '111');
    if (!isPlaying.value) {
        replayInstance.value = null;
    }
});

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
function handleReplayer() {
    if (!recorder.value) return console.error('记录器未初始化。请先开始录制。');
    recorder.value();
    if (!events.value.length) return console.error('记录器未有数据。');
    isPlaying.value = true;

    // setTimeout(() => {
    //     replayInstance.value = new rrweb.Replayer(events.value, {
    //         root: replayer.value,
    //         // speed: 2, // 倍速回放
    //         // skipInactive: true, // 跳过不活跃时段
    //     });
    //     replayInstance.value.wrapper = document.getElementById('wrapper');
    //     replayInstance.value.iframe = document.getElementById('replayIframe');
    //     replayInstance.value.play()
    // }, 100);

    setTimeout(() => {
        replayInstance.value = new rrwebPlayer({
            target: replayer.value, // 可以自定义 DOM 元素
            // 配置项
            props: {
                events: events.value,
                skipInactive: false,	//是否快速跳过无用户操作的阶段
                showDebug: false, //是否在回放过程中打印 debug 信息
                showWarning: false, //是否在回放过程中打印警告信息
                autoPlay: true, //是否自动播放
                showControlle: true,	 //是否显示播放器控制 UI
                speedOption: [1, 2, 4, 8] //倍速播放可选值
            },
        });
        replayInstance.value.addEventListener("finish", (payload) => {
            console.log(payload, 2222);
        })
        // replayInstance.play()
    }, 100);

}

function handleDownload() {

}

</script>

<style scoped>
.replayer-wrapper {
    width: 50px;
    margin: 0 auto;
    left: 0;
    top: 0;
}
</style>