import {custData} from "@/views/grid/mock";

/**
 * @Description: 列表
 * @author caokun
 * @date 2024/1/17
 */
export function fetchList(query?: Object) {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(custData)
    },500)
  })
}
