<template>
  <div class="bg-gray-50 min-h-screen pt-20">
    <div class="w-40 m-auto">
      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="c in cols">{{ c }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in cells[0].length">
            <th>{{ i - 1 }}</th>
            <td v-for="(c, j) in cols">
              <cell :r="i - 1" :c="j"></cell>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import cell from "./components/Cell.vue";
import { cells } from "./com.config";
const cols = cells.map((_, i) => String.fromCharCode(65 + i));
</script>

<style scoped>
body {
  margin: 0;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

th {
  background-color: #eee;
}

tr:first-of-type th {
  width: 100px;
}

tr:first-of-type th:first-of-type {
  width: 25px;
}

td {
  border: 1px solid #ccc;
  height: 1.5em;
  overflow: hidden;
}
.cell,
.cell input {
  height: 1.5em;
  line-height: 1.5;
  font-size: 15px;
}

.cell span {
  padding: 0 6px;
}

.cell input {
  width: 100%;
  box-sizing: border-box;
}
</style>
