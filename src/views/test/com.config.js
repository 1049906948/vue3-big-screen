import { ref, nextTick } from 'vue'


/**
 * <button class="button" id="counter" @click="increment">{{ count }}</button>
 * import {testNextTick} from "./com.config"
 * const {increment,count} = testNextTick()
 * @returns {{count: Ref<UnwrapRef<number>>, increment: ((function(): Promise<void>)|*)}}
 */
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


const {increment,count} = testNextTick()