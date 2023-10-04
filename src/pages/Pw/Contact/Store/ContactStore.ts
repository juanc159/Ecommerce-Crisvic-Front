import { defineStore } from 'pinia'
import axiosIns from '@/plugins/axios'
import { useToast } from '@/composables/useToast'
// --- --- --- store --- --- ---
import { usePreloadStore } from '@/stores/usePreloadStore'
import { useAuthenticationStore } from '@/stores/authentication'
// --- --- END store --- --- ---

// --- --- --- Interfaces --- --- ---
import type IPromise from '@/interfaces/Axios/IPromise'
import type IContactForm from './../Interfaces/IContactForm'
// import type ICompaniesList from '@/pages/Companies/Interfaces/ICompaniesList'
// --- --- END Interfaces --- --- ---

const toast = useToast()

export const ContactStore = defineStore('ContactStore', {
  state: () => ({
    loading: true as boolean,
    action: "list" as string,
    typeAction: "list" as string,
    contactData: {} as IContactForm,
    keyList: 0 as number,
    // // dataList: [] as Array<ICompaniesList>,
    // Pagination
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      id: null,
      name: '',
      email: '',
      subject_email: '',
      message: '',
    } as IContactForm,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IContactForm>{
        id: null,
        name: '',
        email: '',
        subject_email: '',
        message: '',
        empresa_id: null
      }
    },
    // async fetchAll(params: object): Promise<void> {
    //   this.loading = true
    //   await axiosIns.post('/company-list', params,).then(result => {
    //     this.loading = false
    //     this.dataList = result.data.dataList
    //     this.totalData = result.data.totalData
    //     this.totalPage = result.data.totalPage
    //     this.currentPage = result.data.currentPage
    //     this.lastPage = result.data.lastPage
    //   }).catch(error => {
    //     this.loading = false
    //     console.log("error", error)
    //   })
    // },
    async fetchSave(): Promise<IPromise> {
      return await axiosIns.post('/contact_store', this.formulario).then(result => {
        // preload.isLoading = false
        if( result.data.status === 200 ){
          toast.toast('Éxito', result.data.message, 'success', 9000)
          this.clearFormulario()
        }else{

          toast.toast('Error', result.data.message, 'danger')
        }
        return {
          status: result.data.status,
          message: result.data.message,
          validator: result.data.validator
        };
      }).catch(async error => {
        // preload.isLoading = false
        if (error.response.status === 422)
          toast.toast('Error', `${error.response.data.validator.message[0]}`, 'danger')
        // console.log(await error)
        return { validator: error.response.data.errors, status: error.response.data.code, message: error.response.data.message };
      })
    },
  },
})
