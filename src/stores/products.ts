import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosIns from '@/plugins/axios'
import type IFormProduct from '@/interfaces/Products/IFormProduct'
import { useSpeciesStore } from '@/stores/species'
import { useRoute, type LocationQueryValue } from 'vue-router'
import type IProduct from '@/interfaces/Products/IProduct'
import { usePreloadStore } from "@/stores/usePreloadStore";
import { useToast } from '@/composables/useToast'
import type ISubCategory from '@/interfaces/SubCategories/ISubCategory'
import type ISpecie from '@/interfaces/Species/ISpecie'
import ICategory from '@/interfaces/Categories/ICategory'
const toast = useToast()
export const useProductsStore = defineStore('products', {
  state: () => ({
    products: ref<Array<IProduct>>([]),
    lastPage: ref<number>(1),
    totalData: ref<number>(0),
    totalPage: ref<number>(0),
    subCategories: ref<Array<ISubCategory>>([]),
    species: ref<Array<ISpecie>>([]),
    categories: ref<Array<ICategory>>([]),
    currentPage: ref<number>(1),
    filter: ref<IFormProduct>({
      typeData: null,
    })
  }),
  getters: {
    specie() {
      const router = useRoute()
      const speciesStore = useSpeciesStore()
      if (router) {
        const specie = speciesStore.species.find(ele => ele.id == router.query.specie_id)
        if (specie) {
          return {
            id: specie.id,
            name: specie.nombre ?? '',
            foto_promotion: specie.foto_promotion ?? '',

          }
        } else return null
      } else return null
    }
  },
  actions: {
    clearFilter() {
      this.filter = {
        typeData: null,
      }
    },
    addFilter(key: string, value: string | number | boolean | null | LocationQueryValue[]) {
      (this.filter as any)[key] = value;
    },
    async fetchAll(Nopreload = false) {
      const preload = usePreloadStore()
      if (Nopreload) {
        preload.isLoading = true
      }
      axiosIns.post("/product-pw_list", this.filter).then(resp => {
        preload.isLoading = false
        this.categories = resp.data.categories

        this.subCategories = resp.data.subCategories
        this.products = resp.data.products
        this.lastPage = resp.data.lastPage ?? 1
        this.totalData = resp.data.totalData ?? 0
        this.totalPage = resp.data.totalPage ?? 0
        this.currentPage = resp.data.currentPage ?? 0
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
