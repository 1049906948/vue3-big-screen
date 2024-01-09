// useTable.ts
import { ref } from "vue";
export function useTable(api: any) {
  const data = ref([]);
  const refresh = api;
  api().then((res: any) => {
    return (data.value = res);
  });
  return [data, refresh];
}



/***
 *
 * https://juejin.cn/post/7299849645206781963?utm_source=gold_browser_extension
 *
 * // api.ts
 * export const getTableDataApi = () => {
 *   const data = [
 *     {
 *       date: '2016-05-03',
 *       name: 'Tom',
 *       address: 'No. 189, Grove St, Los Angeles',
 *     },
 *     {
 *       date: '2016-05-02',
 *       name: 'Tom',
 *       address: 'No. 189, Grove St, Los Angeles',
 *     },
 *     {
 *       date: '2016-05-04',
 *       name: 'Tom',
 *       address: 'No. 189, Grove St, Los Angeles',
 *     },
 *     {
 *       date: '2016-05-01',
 *       name: 'Tom',
 *       address: 'No. 189, Grove St, Los Angeles',
 *     },
 *   ]
 *   return new Promise(resolve => {
 *     setTimeout(() => {
 *       resolve(data)
 *     }, 100);
 *   })
 * }
 *
 * <template>
 *   <el-table :data="tableData" style="width: 100%">
 *     <el-table-column prop="date" label="Date" width="180" />
 *     <el-table-column prop="name" label="Name" width="180" />
 *     <el-table-column prop="address" label="Address" />
 *   </el-table>
 *   <button @click="refresh">refresh</button>
 * </template>
 *
 * <script lang="ts" setup>
 * import { onMounted, ref } from "vue";
 * import { getTableDataApi } from "./api.ts";
 *
 * const tableData = ref([]);
 * const refresh=async () => {
 *   const data = await getTableDataApi();
 *   tableData.value = data;
 * }
 *
 * onMounted(refresh);
 * </script>
 *
 *
 * <script lang="ts" setup>
 * import { onMounted, ref } from "vue";
 * import { getTableDataApi1, getTableDataApi2, getTableDataApi3 } from "./api.ts";
 * import { useTable } from './useTable.ts'
 *
 * const [tableData1, refresh1] = useTable(getTableDataApi1);
 * const [tableData2, refresh2] = useTable(getTableDataApi2);
 * const [tableData3, refresh3] = useTable(getTableDataApi3);
 *
 * onMounted(refresh1);
 * </script>
 *
 */
