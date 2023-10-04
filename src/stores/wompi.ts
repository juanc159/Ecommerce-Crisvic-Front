import { defineStore } from 'pinia'
import type IProduct from '@/interfaces/Products/IProduct'
import type IGlobal from '@/interfaces/Global/IGlobal'
import axiosIns from '@/plugins/axios'
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import { useAuthenticationStore } from './authentication'
import type { LocationQueryValue } from 'vue-router'


const configGlobal = useConfigGlobal()

export const useWompiStore = defineStore('useWompiStore', {
  state: () => ({
    stateTransaction: null as string | null,
    loading: false  as boolean
  }),
  persist: true,
  getters: {
  },
  actions: {
    async getTransactionResponse (id: number | string | LocationQueryValue[]) {
      this.loading  = true
      try {
        const res = await axiosIns.get(`${configGlobal.environment}/transactions/${id}`)
        this.loading  = false
        if(res.status == 200) {
          if(res.data.data.status == 'APPROVED') {
            this.stateTransaction = 'APPROVED'
            this.finishPay()
          }
          if(res.data.data.status == 'DECLINED') {
            this.stateTransaction = 'DECLINED'
          }
          if(res.data.data.status == 'VOIDED') {
            this.stateTransaction = 'VOIDED'
          }
          if(res.data.data.status == 'ERROR') {
            this.stateTransaction = 'ERROR'
          }
        }
      } catch (error) {
        this.stateTransaction = 'ERROR'
      }


    },

    async finishPay() {
      const authStore = useAuthenticationStore()
      const body = {
        directionSelected: authStore.directionSelected
      }
      const header = {
        'Authorization': `Bearer ${authStore.token}`,
      }
      try {
        const res = await axiosIns.post('order_store',body,{ headers: header })
        if(res.status == 200) {
          authStore.shoppingCart.forEach((item) => {
            authStore.syncUpShoppingCart(item,'delete')
          })
        }
      } catch (error) {
        
      }
    }
  },
})
