import { defineStore } from 'pinia'
import axiosIns from '@/plugins/axios'
import type ICategory from '@/interfaces/Categories/ICategory'
import { ref } from 'vue'
import { usePreloadStore } from "@/stores/usePreloadStore";
import { useToast } from '@/composables/useToast';
import type IOrder from '@/interfaces/Orders/IOrder';
import { useAuthenticationStore } from './authentication';

const toast = useToast()
export const useOrderStore = defineStore('useOrderStore', {
  state: () => ({
    orders: [] as Array<IOrder>,
    typesState: [] as Array<{
      id: number
      nombre: string
    }>,
    typeSelected: null as null | number,
    orderSelected: null as null | {
      products: Array<{
        nombre: string
        descripcion: string
        pivot: {
          amount: string
          cuantity: string
        }
      }>
    },
    typeAction: 'order' as 'order' | 'product'
  }),
  getters: {
  },
  actions: {
    async getOrders() {
      const authentication = useAuthenticationStore()
      const headers = {
        'Authorization': `Bearer ${authentication.token}`,
      }
      const preload = usePreloadStore()
      let url = 'order_list'
      if (this.typeSelected !== null) {
        url = 'order_list?state=' + this.typeSelected
      }
      try {
        preload.isLoading = true
        const res = await axiosIns.get(url, { headers })
        if (res.status == 200) {
          this.orders = res.data.orders
          this.typesState = res.data.typesState
        }
        preload.isLoading = false
      } catch (error) {
        preload.isLoading = false
      }
    }
  },
})
