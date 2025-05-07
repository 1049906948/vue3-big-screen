<template>
  <div class="seating-container">
    <h1 class="title">班级座位表</h1>
    
    <div class="seating-grid">
      <div v-for="row in 6" :key="`row-${row}`" class="seat-row">
        <!-- 左侧座位组 -->
        <div class="seat-group left-group">
          <div v-for="col in 2" :key="`left-${row}-${col}`" 
               class="seat"
               :class="{ 'occupied': getSeatInfo(row, col).name }"
               draggable="true"
               @dragstart="handleDragStart($event, row, col)"
               @dragover.prevent
               @drop="handleDrop($event, row, col)">
            <div class="seat-content">
              <div class="seat-position">{{ `${row}-${col}` }}</div>
              <div class="student-name">{{ getSeatInfo(row, col).name || '空座' }}</div>
            </div>
          </div>
        </div>
        
        <!-- 中间座位组 -->
        <div class="seat-group middle-group">
          <div v-for="col in 4" :key="`middle-${row}-${col + 2}`"
               class="seat"
               :class="{ 'occupied': getSeatInfo(row, col + 2).name }"
               draggable="true"
               @dragstart="handleDragStart($event, row, col + 2)"
               @dragover.prevent
               @drop="handleDrop($event, row, col + 2)">
            <div class="seat-content">
              <div class="seat-position">{{ `${row}-${col + 2}` }}</div>
              <div class="student-name">{{ getSeatInfo(row, col + 2).name || '空座' }}</div>
            </div>
          </div>
        </div>
        
        <!-- 右侧座位组 -->
        <div class="seat-group right-group">
          <div v-for="col in 2" :key="`right-${row}-${col + 6}`"
               class="seat"
               :class="{ 'occupied': getSeatInfo(row, col + 6).name }"
               draggable="true"
               @dragstart="handleDragStart($event, row, col + 6)"
               @dragover.prevent
               @drop="handleDrop($event, row, col + 6)">
            <div class="seat-content">
              <div class="seat-position">{{ `${row}-${col + 6}` }}</div>
              <div class="student-name">{{ getSeatInfo(row, col + 6).name || '空座' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <button class="control-btn" @click="clearSeats">清空座位</button>
      <button class="control-btn" @click="randomAssign">随机分配</button>
      <button class="control-btn" @click="saveScreenshot">截图保存</button>
      <button class="control-btn" @click="saveToLocal">保存座位</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import html2canvas from 'html2canvas'

// 座位数据
const seatingData = ref({})
const draggedSeat = ref(null)

// 模拟学生数据
const students = [
  '张三', '李四', '王五', '赵六', '钱七', '孙八',
  '周九', '吴十', '郑十一', '王十二', '李十三', '赵十四',
  '钱十五', '孙十六', '周十七', '吴十八', '郑十九', '王二十',
  '李二十一', '赵二十二', '钱二十三', '孙二十四'
]

// 获取座位信息
const getSeatInfo = (row, col) => {
  const key = `${row}-${col}`
  return seatingData.value[key] || {}
}

// 拖拽开始
const handleDragStart = (event, row, col) => {
  draggedSeat.value = { row, col }
  event.target.classList.add('dragging')
}

// 拖拽结束处理
const handleDrop = (event, targetRow, targetCol) => {
  event.preventDefault()
  const elements = document.querySelectorAll('.dragging')
  elements.forEach(el => el.classList.remove('dragging'))

  if (!draggedSeat.value) return

  const sourceKey = `${draggedSeat.value.row}-${draggedSeat.value.col}`
  const targetKey = `${targetRow}-${targetCol}`

  // 交换座位信息
  const temp = { ...seatingData.value[targetKey] }
  seatingData.value[targetKey] = seatingData.value[sourceKey]
  seatingData.value[sourceKey] = temp

  draggedSeat.value = null
}

// 清空座位
const clearSeats = () => {
  seatingData.value = {}
}

// 随机分配
const randomAssign = () => {
  const shuffledStudents = [...students].sort(() => Math.random() - 0.5)
  let studentIndex = 0

  seatingData.value = {}
  for (let row = 1; row <= 6; row++) {
    for (let col = 1; col <= 8; col++) {
      if (studentIndex < shuffledStudents.length) {
        seatingData.value[`${row}-${col}`] = { name: shuffledStudents[studentIndex] }
        studentIndex++
      }
    }
  }
}

// 截图保存
const saveScreenshot = async () => {
  const element = document.querySelector('.seating-container')
  const canvas = await html2canvas(element)
  const link = document.createElement('a')
  link.download = '座位表.png'
  link.href = canvas.toDataURL()
  link.click()
}

// 保存到本地存储
const saveToLocal = () => {
  localStorage.setItem('seatingData', JSON.stringify(seatingData.value))
}

// 从本地存储加载数据
onMounted(() => {
  const savedData = localStorage.getItem('seatingData')
  if (savedData) {
    seatingData.value = JSON.parse(savedData)
  }
})
</script>

<style scoped>
:root {
  --primary-color: #FFB6C1;
  --secondary-color: #87CEEB;
  --accent-color: #FFD700;
  --background-start: #FFF0F5;
  --background-end: #E6E6FA;
  --seat-bg: rgba(255, 255, 255, 0.85);
  --shadow-color: rgba(0, 0, 0, 0.1);
}

.seating-container {
  padding: 2rem;
  min-height: 100vh;
  background: #fff;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Comic Sans MS', '华文彩云', sans-serif;
  color: #333;
  text-shadow: 2px 2px 4px var(--shadow-color);
  font-size: 2.5rem;
}

.seating-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.seat-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.seat-group {
  display: flex;
  gap: 1rem;
}

.seat {
  width: 120px;
  height: 120px;
  background: var(--seat-bg);
  border-radius: 15px;
  box-shadow: 0 4px 8px var(--shadow-color);
  transition: all 0.3s ease;
  cursor: move;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.seat:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px var(--shadow-color);
}

.seat.dragging {
  opacity: 0.5;
  transform: scale(0.95);
}

.seat-content {
  text-align: center;
}

.seat-position {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.student-name {
  font-family: '微软雅黑', '幼圆', sans-serif;
  font-size: 1.1rem;
  color: #333;
}

.control-panel {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.control-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  font-family: '微软雅黑', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px var(--shadow-color);
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow-color);
}

.control-btn:active {
  transform: translateY(1px);
}

@media (max-width: 1200px) {
  .seat {
    width: 100px;
    height: 100px;
  }
  
  .seat-row {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .seat {
    width: 80px;
    height: 80px;
  }
  
  .student-name {
    font-size: 0.9rem;
  }
  
  .control-panel {
    flex-wrap: wrap;
  }
}
</style>