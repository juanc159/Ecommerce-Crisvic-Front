import { defineStore } from 'pinia'
import axiosIns from '@/plugins/axios'
import type ISpecie from '@/interfaces/Species/ISpecie'

import { usePreloadStore } from "@/stores/usePreloadStore";
import { useToast } from '@/composables/useToast'
const toast = useToast()

export const useSpeciesStore = defineStore('species', {
  state: () => ({
    species: [] as Array<ISpecie>,
  }),
  persist: true,
  getters: {
  },
  actions: {
    async fetchAll(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      axiosIns.post("/species-list", {
        typeData: "todos",
        empresa_id: 2
        // empresa_id: 1
      }).then(resp => {
        preload.isLoading = false
        this.species = resp.data.species
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
      })
    }
  },
})
