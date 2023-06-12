import { ref, nextTick } from 'vue'

export function testNextTick(){
    const count = ref(0)
    async function increment() {
        count.value++
        // DOM 还未更新
        console.log(document.getElementById('counter'))
        // console.log(document.getElementById('counter').textContent) // 0
        await nextTick()
        // DOM 此时已经更新
        console.log(document.getElementById('counter').textContent) // 1
    }
    return {
        increment,
        count
    };
}
