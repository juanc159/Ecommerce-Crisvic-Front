import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosIns from '@/plugins/axios'


export const useBannersStore = defineStore('banners', {
  state: () => ({
    banners: [] as Array<object>,
    keyComponent: 1,

  }),
  getters: {

  },
  actions: {

    async fetchAll() {
      axiosIns.get("/banner-pw_list").then(resp => {
        this.banners = resp.data.banners
        this.keyComponent++
      })
        .catch(async error => {
          console.log(await error)
        })
    }
  },
})
