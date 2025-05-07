<template>
  <div class="seating-bg">
    <div style="display: flex; align-items: center; justify-content: center;">
      <h1>班级座位表</h1>
      <div class="student" style="margin-left: 20px;">共 {{ studentCount }} 名学生</div>
    </div>
    <div class="classroom">
      <div v-for="row in 8" :key="row" class="row">
        <div class="group">
          <div v-for="col in 2" :key="`seat-${row}-${col}`" class="seat"
            :class="{ dragging: isDragging(row, col), 'drag-over': isDragOver(row, col) }" draggable="true"
            @dragstart="handleDragStart(row, col)" @dragend="handleDragEnd" @dragover.prevent="handleDragOver(row, col)"
            @drop="handleDrop(row, col)" @touchstart="handleTouchStart($event, row, col)"
            @touchmove="handleTouchMove($event)" @touchend="handleTouchEnd($event)">
            <p class="position">第{{ row }}排{{ col }}座</p>
            <p class="name">{{ getSeatName(row, col) }}</p>
          </div>
        </div>
        <div class="group">
          <div v-for="col in 4" :key="`seat-${row}-${col + 2}`" class="seat"
            :class="{ dragging: isDragging(row, col + 2), 'drag-over': isDragOver(row, col + 2) }" draggable="true"
            @dragstart="handleDragStart(row, col + 2)" @dragend="handleDragEnd"
            @dragover.prevent="handleDragOver(row, col + 2)" @drop="handleDrop(row, col + 2)"
            @touchstart="handleTouchStart($event, row, col + 2)" @touchmove="handleTouchMove($event)"
            @touchend="handleTouchEnd($event)">
            <p class="position">第{{ row }}排{{ col + 2 }}座</p>
            <p class="name">{{ getSeatName(row, col + 2) }}</p>
          </div>
        </div>
        <div class="group">
          <div v-for="col in 2" :key="`seat-${row}-${col + 6}`" class="seat"
            :class="{ dragging: isDragging(row, col + 6), 'drag-over': isDragOver(row, col + 6) }" draggable="true"
            @dragstart="handleDragStart(row, col + 6)" @dragend="handleDragEnd"
            @dragover.prevent="handleDragOver(row, col + 6)" @drop="handleDrop(row, col + 6)"
            @touchstart="handleTouchStart($event, row, col + 6)" @touchmove="handleTouchMove($event)"
            @touchend="handleTouchEnd($event)">
            <p class="position">第{{ row }}排{{ col + 6 }}座</p>
            <p class="name">{{ getSeatName(row, col + 6) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button @click="clearSeats">清空座位</button>
      <button @click="randomAssign">随机分配</button>
      <button @click="sequentialAssign">顺序分配</button>
      <button @click="saveAsImage">保存截图</button>
      <button @click="saveToLocalStorage">保存布局</button>
      <input type="file" ref="fileInput" accept=".csv,.xlsx,.xls" style="display: none" @change="handleFileSelect" />
      <button @click="$refs.fileInput.click()">导入表格</button>
    </div>
    <div v-if="loading" class="import-loading">
      <div class="spinner"></div>
      <div>正在导入，请稍候...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'

// 1. 数据
const names = ref([])
const seatingData = reactive({})
const dragging = ref(null)
const dragOver = ref(null)
const fileInput = ref(null)
const loading = ref(false)

// 2. 工具函数
function seatKey(row, col) {
  return `${row}-${col}`
}
function getSeatName(row, col) {
  return seatingData[seatKey(row, col)] || ''
}
const studentCount = computed(() => {
  return Object.values(seatingData).filter(name => name).length
})

// 3. 拖拽/触摸
function isDragging(row, col) {
  return dragging.value && dragging.value.key === seatKey(row, col)
}
function isDragOver(row, col) {
  return dragOver.value && dragOver.value.key === seatKey(row, col)
}
function handleDragStart(row, col) {
  dragging.value = { row, col, key: seatKey(row, col) }
}
function handleDragEnd() {
  dragging.value = null
  dragOver.value = null
}
function handleDragOver(row, col) {
  dragOver.value = { row, col, key: seatKey(row, col) }
}
function handleDrop(row, col) {
  if (!dragging.value || dragging.value.key === seatKey(row, col)) return
  swapSeats(dragging.value.row, dragging.value.col, row, col)
  createFirework()
  handleDragEnd()
}

// 触摸事件
let touchDragging = null
function handleTouchStart(e, row, col) {
  touchDragging = { row, col }
}
function handleTouchMove(e) {
  // 可选：高亮目标座位
}
function handleTouchEnd(e) {
  const touch = e.changedTouches[0]
  const el = document.elementFromPoint(touch.clientX, touch.clientY)
  if (el && el.classList.contains('seat')) {
    const row = Number(el.dataset.row)
    const col = Number(el.dataset.col)
    if (touchDragging && (touchDragging.row !== row || touchDragging.col !== col)) {
      swapSeats(touchDragging.row, touchDragging.col, row, col)
      createFirework()
    }
  }
  touchDragging = null
}

// 4. 交换座位
function swapSeats(row1, col1, row2, col2) {
  const k1 = seatKey(row1, col1)
  const k2 = seatKey(row2, col2)
  const temp = seatingData[k1]
  seatingData[k1] = seatingData[k2]
  seatingData[k2] = temp
}

// 5. 分配/清空
function clearSeats() {
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      seatingData[seatKey(row, col)] = ''
    }
  }
  localStorage.removeItem('classSeating')
}
function randomAssign() {
  const shuffled = [...names.value].sort(() => Math.random() - 0.5)
  let idx = 0
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      seatingData[seatKey(row, col)] = shuffled[idx++] || ''
    }
  }
  createFirework()
}
function sequentialAssign() {
  let idx = 0
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      seatingData[seatKey(row, col)] = names.value[idx++] || ''
    }
  }
  createFirework()
}

// 6. 烟花特效
function createFirework(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  const colors = ['#FFB6C1', '#87CEEB', '#DDA0DD']
  const firework = document.createElement('div')
  firework.className = 'firework'
  firework.style.left = x + 'px'
  firework.style.top = y + 'px'
  firework.style.background = colors[Math.floor(Math.random() * colors.length)]
  document.body.appendChild(firework)
  setTimeout(() => firework.remove(), 800)
}

// 7. 截图
function saveAsImage() {
  import('html2canvas').then(({ default: html2canvas }) => {
    const buttons = document.querySelector('.buttons')
    const seatingBg = document.querySelector('.seating-bg')
    const classroom = document.querySelector('.classroom')
    // 记录原样式
    const oldClassroomBg = classroom.style.background
    const oldClassroomFilter = classroom.style.backdropFilter
    const oldClassroomBoxShadow = classroom.style.boxShadow
    const oldCardBg = []
    const oldCardBoxShadow = []
    const cards = classroom.querySelectorAll('.seat')
    cards.forEach(card => {
      oldCardBg.push(card.style.background)
      oldCardBoxShadow.push(card.style.boxShadow)
      // 统一卡片背景和阴影为淡蓝色
      card.style.background = '#e3f6fd'
      card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)'
    })
    // 临时设置classroom背景为淡蓝色
    classroom.style.background = 'rgba(227,246,253,0.95)'
    classroom.style.backdropFilter = 'none'
    classroom.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.18)'
    // 隐藏按钮但不影响布局
    buttons.style.opacity = '0'
    buttons.style.pointerEvents = 'none'
    html2canvas(seatingBg, { backgroundColor: null, useCORS: true }).then(canvas => {
      const link = document.createElement('a')
      link.download = '班级座位表.png'
      link.href = canvas.toDataURL()
      link.click()
      // 恢复样式
      buttons.style.opacity = '1'
      buttons.style.pointerEvents = ''
      classroom.style.background = oldClassroomBg
      classroom.style.backdropFilter = oldClassroomFilter
      classroom.style.boxShadow = oldClassroomBoxShadow
      cards.forEach((card, i) => {
        card.style.background = oldCardBg[i]
        card.style.boxShadow = oldCardBoxShadow[i]
      })
    })
  })
}

// 8. 本地存储
function saveToLocalStorage() {
  const arr = []
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      arr.push({ row, col, name: seatingData[seatKey(row, col)] })
    }
  }
  localStorage.setItem('classSeating', JSON.stringify(arr))
  createFirework()
}
function loadFromLocalStorage() {
  const saved = localStorage.getItem('classSeating')
  if (saved) {
    const arr = JSON.parse(saved)
    arr.forEach(item => {
      seatingData[seatKey(item.row, item.col)] = item.name
    })
  }
}

// 9. 导入 Excel
async function handleFileSelect(e) {
  loading.value = true
  await nextTick() // 确保 loading 遮罩渲染出来
  try {
    const file = e.target.files[0]
    if (!file) return
    const XLSX = await import('xlsx')
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(new Uint8Array(data), { type: 'array' })
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
    // 取第3列（索引2），跳过前两行
    const newNames = jsonData.slice(2).map(row => row[2]).filter(Boolean)
    names.value = newNames
    sequentialAssign()
  } finally {
    loading.value = false
  }
}

// 10. 初始化
onMounted(() => {
  // 初始化座位
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      seatingData[seatKey(row, col)] = ''
    }
  }
  loadFromLocalStorage()
})
</script>

<style scoped>
.seating-bg {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFB6C1, #87CEEB, #DDA0DD);
  font-family: "Microsoft YaHei", "YouYuan", sans-serif;
  color: #333;
}

.seating-bg h1 {
  font-family: "Comic Sans MS", "华文彩云", cursive;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  color: #fff;
}

.seating-bg .student {
  font-size: 1.2em;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  color: #fff;
  height: 30px;
  margin-top: 55px;
  margin-left: 20px;
}

.seating-bg .classroom {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.seating-bg .row {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.seating-bg .group {
  display: flex;
  gap: 5px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.seating-bg .group + .group {
  margin-left: 15px;
}

.seating-bg .seat {
  width: 82.5px;
  height: 60.5px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: move;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.seating-bg .seat p {
  margin: 5px 0;
  font-size: 12px;
}

.seating-bg .position {
  font-size: 13px;
  color: #666;
}

.seating-bg .seat:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.seating-bg .seat.drag-over {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border: 2px dashed #FFB6C1;
}

.seating-bg .seat.dragging {
  opacity: 0.8;
  transform: scale(0.95);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.seating-bg .name {
  font-size: 16px;
  font-weight: bold;
}

.seating-bg .buttons {
  margin-top: 20px;
  display: flex;
  gap: 15px;
}

.seating-bg button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #FFB6C1, #87CEEB);
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.seating-bg button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}

.seating-bg button:active {
  transform: translateY(1px);
}

@media (max-width: 768px) {
  .seating-bg .classroom {
    transform: scale(0.8);
  }
  .seating-bg .buttons {
    flex-direction: column;
  }
}

.seating-bg .firework {
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  pointer-events: none;
  animation: explode 0.8s ease-out forwards;
}

@keyframes explode {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(20);
    opacity: 0;
  }
}

.import-loading {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.7);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: #333;
}
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #FFB6C1;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
</style>