import { defineStore } from 'pinia'
import type IProduct from '@/interfaces/Products/IProduct'
import type IGlobal from '@/interfaces/Global/IGlobal'
export const useSinglePageStore = defineStore('singlePage', {
  state: () => ({
    product: {
      id: null,
      typeData: null,
      empresa_id: null,
      specie: null,
      quantity: 0,
      like: null,
      descripcion: null,
      categoria_nombre: null,
      sub_categoria_nombre: null,
      image:null
    } as IProduct|IGlobal,
  }),
  persist: true,
  getters: {
  },
  actions: {
    async getInfo(obj: IProduct|IGlobal): Promise<void> {
      this.product = obj
    }
  },
})
