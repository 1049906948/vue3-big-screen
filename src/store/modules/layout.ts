import {defineStore} from "pinia";


export const useLayoutStore = defineStore("layout", () => {
  const getStatus = {
    ACCESS_TOKEN: ""
  }
  const logout = () => {
  }
  return {getStatus, logout};
});
