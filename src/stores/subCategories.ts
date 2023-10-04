import { defineStore } from 'pinia'
import axiosIns from '@/plugins/axios'
import type ISubCategory from '@/interfaces/SubCategories/ISubCategory'
import { ref } from 'vue'
import { usePreloadStore } from "@/stores/usePreloadStore";
import { useToast } from '@/composables/useToast'
const toast = useToast()
export const useSubCategoriesStore = defineStore('subCategories', {
  state: () => ({
    subCategories: ref<Array<ISubCategory>>([])
  }),
  // persist:true,
  getters: {
  },
  actions: {
    async fetchAll(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      axiosIns.post("/subCategory-list", {
        typeData: "todos",
        empresa_id: 2
        // empresa_id: 1
      }).then(resp => {
        preload.isLoading = false
        this.subCategories = resp.data.subCategories
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
      })
    },
  },
})
