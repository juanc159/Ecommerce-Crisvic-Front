import { defineStore } from 'pinia'
import axiosIns from '@/plugins/axios'
import type ICategory from '@/interfaces/Categories/ICategory'
import { ref } from 'vue'
import { usePreloadStore } from "@/stores/usePreloadStore";
import { useToast } from '@/composables/useToast'
const toast = useToast()
export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: ref<Array<ICategory>>([])
  }),
  persist: true,
  getters: {
  },
  actions: {
    async fetchAll(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      axiosIns.post("/category-list", {
        typeData: "all",
      }).then(resp => {
        preload.isLoading = false
        this.categories = resp.data.categories
      })
        .catch(async error => {
          preload.isLoading = false
          console.log(await error)
          if (error.response.status === 500)
            toast.toast('Error', error.response.data.message, 'danger')
        })
    }
  },
})
