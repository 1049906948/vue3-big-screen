<template>
  <div class="seating-container">
    <h1 class="title">班级座位表</h1>
    <div class="seating-grid">
      <div v-for="row in 6" :key="row" class="seat-row">
        <div v-for="col in 8" :key="col" class="seat-card">
          <div class="seat-content">
            <div class="seat-number">第{{ row }}排第{{ col }}座</div>
            <div class="student-number">学{{ getStudentNumber(row, col) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="action-buttons">
      <button class="action-btn clear" @click="clearSeats">清空座位</button>
      <button class="action-btn random" @click="randomAssign">随机分配</button>
      <button class="action-btn screenshot" @click="takeScreenshot">保存截图</button>
      <button class="action-btn save" @click="saveToLocal">保存布局</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import html2canvas from 'html2canvas'

const studentNumbers = ref<number[]>([])

const getStudentNumber = (row: number, col: number): number => {
  const index = (row - 1) * 8 + (col - 1)
  return studentNumbers.value[index] || 0
}

const clearSeats = () => {
  studentNumbers.value = new Array(48).fill(0)
}

const randomAssign = () => {
  const numbers = Array.from({ length: 48 }, (_, i) => i + 1)
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
  }
  studentNumbers.value = numbers
}

const takeScreenshot = async () => {
  const element = document.querySelector('.seating-container')
  if (element) {
    const canvas = await html2canvas(element as HTMLElement)
    const link = document.createElement('a')
    link.download = '班级座位表.png'
    link.href = canvas.toDataURL()
    link.click()
  }
}

const saveToLocal = () => {
  localStorage.setItem('seatingArrangement', JSON.stringify(studentNumbers.value))
}

onMounted(() => {
  const saved = localStorage.getItem('seatingArrangement')
  if (saved) {
    studentNumbers.value = JSON.parse(saved)
  } else {
    clearSeats()
  }
})
</script>

<style scoped>
.seating-container {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.title {
  color: #fff;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.seating-grid {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
}

.seat-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}

.seat-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.seat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.seat-content {
  text-align: center;
}

.seat-number {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.student-number {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.action-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;
}

.action-btn.clear {
  background-color: #ff9a9e;
}

.action-btn.random {
  background-color: #fad0c4;
}

.action-btn.screenshot {
  background-color: #a18cd1;
}

.action-btn.save {
  background-color: #fbc2eb;
}

.action-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.action-btn:active {
  transform: translateY(0);
}
</style>