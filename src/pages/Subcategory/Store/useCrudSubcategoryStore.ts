import { useToast } from '@/composables/useToast'
import IPromise from '@/interfaces/Axios/IPromise'
import type IForm from '@/pages/Subcategory/Interfaces/IForm'
import type IList from '@/pages/Subcategory/Interfaces/IList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

const toast = useToast()

export const useCrudSubcategoryStore = defineStore('useCrudSubcategoryStore', {
  state: () => ({
    loading: true as boolean,
    action: "list" as string,
    typeAction: "list" as string,
    subcategoryData: {} as IForm,
    keyList: 0 as number,
    subcategories: [] as Array<IList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      id: null,
      name: null,
      category_id: null,
      path: null
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
        path: null
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/subcategory-list',
        params,
      ).then(result => {
        this.loading = false
        this.subcategories = result.data.subcategories
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
        '/subcategory-dataForm'
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
      for (const key in this.formulario) {
        formData.append(key, this.formulario[key])
      }
      const preload = usePreloadStore()
      preload.isLoading = true
      return await axiosIns.post(
        '/subcategory-create',
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
        '/subcategory-delete/' + id
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
        `/subcategory-info/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.subcategoryData.id = id
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })

    },


    changeState(objeto: object, estado: number) {
      const preload = usePreloadStore()
      let t = ''
      estado == 0 ? (t = 'activar') : (t = 'inactivar')
      Swal.fire({
        title: `¿Está seguro de ${t} el Registro seleccionado?`,
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
        allowOutsideClick: false,
      }).then(result => {
        if (result.isConfirmed) {
          preload.isLoading = true
          axiosIns.post('/user-changeState', objeto)
            .then(res => {
              preload.isLoading = false
              if (res.data.code == 200)
                toast.toast('Éxito', res.data.msg, 'success')

              if (res.data.code == 500)
                toast.toast('Éxito', res.data.msg, 'danger')
            })
        }
        else {
          t == 'activar' ? objeto.state = 0 : objeto.state = 1
        }
      })
    },
  },
})
