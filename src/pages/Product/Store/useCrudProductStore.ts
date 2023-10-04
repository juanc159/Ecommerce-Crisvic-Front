import { useToast } from '@/composables/useToast'
import IPromise from '@/interfaces/Axios/IPromise'
import type IForm from '@/pages/Product/Interfaces/IForm'
import type IList from '@/pages/Product/Interfaces/IList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'

const toast = useToast()

export const useCrudProductStore = defineStore('useCrudProductStore', {
  state: () => ({
    loading: true as boolean,
    action: "list" as string,
    typeAction: "list" as string,
    productData: {} as IForm,
    keyList: 0 as number,
    products: [] as Array<IList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      id: null,
      name: null,
      category_id: null,
      subcategory_id: null,
      description: null,
      iva: null,
      code: null,
      price: null,
      images: [],
    } as IForm,
    categories: [] as Array<object>

  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IForm>{
        id: null,
        name: null,
        category_id: null,
        subcategory_id: null,
        description: null,
        iva: null,
        code: null,
        price: null,
        images: [],
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/product-list',
        params,
      ).then(result => {
        this.loading = false
        this.products = result.data.products
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(error => {
        this.loading = false
        console.log("error", error)
      })
    },


    async fetchDataForm(): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/product-dataForm'
      ).then(result => {
        this.loading = false
        this.categories = result.data.categories
      }).catch(error => {
        this.loading = false
        console.log("error", error)
      })
    },


    async fetchSave(): Promise<IPromise> {

      const formData = new FormData()
      formData.append('id', this.formulario.id)
      formData.append('name', this.formulario.name)
      formData.append('category_id', this.formulario.category_id)
      formData.append('subcategory_id', this.formulario.subcategory_id)
      formData.append('description', this.formulario.description)
      formData.append('iva', this.formulario.iva)
      formData.append('code', this.formulario.code)
      formData.append('price', this.formulario.price)



      formData.append('cant_images', this.formulario.images.length)
      this.formulario.images.forEach((element, key) => {
        formData.append('image_id' + key, element.id)
        formData.append('image_principal' + key, element.principal)
        formData.append('image_file' + key, element.imageFile)
        formData.append('image_delete' + key, element.delete)
      });




      const preload = usePreloadStore()
      preload.isLoading = true
      return await axiosIns.post(
        '/product-create',
        formData,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          toast.toast('Éxito', result.data.message, 'success')
        } else
          toast.toast('Error', result.data.message, 'danger')

        return { message: result.data.message, code: result.data.code, errors: result.data.errors };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };
      })
    },

    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/product-delete/' + id
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')

      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },


    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.get(
        `/product-info/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.productData.id = id
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })

    },

  },
})
