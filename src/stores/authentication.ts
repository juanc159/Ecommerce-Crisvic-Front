import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'
import { useToast } from '@/composables/useToast'
import type IRegisterForm from '@/interfaces/Authentication/IRegisterForm'
import type IShoppingCart from '@/interfaces/Authentication/IShoppingCart'
import type IProduct from '@/interfaces/Products/IProduct'
import type IProductLike from '@/interfaces/Products/IProductLike'
import type IGlobal from '@/interfaces/Global/IGlobal'
import type IUser from '@/interfaces/Authentication/IUser'
import type IFavoriteProducts from '@/interfaces/Authentication/IFavoriteProducts'
const toast = useToast()

import { usePreloadStore } from "@/stores/usePreloadStore";
import type { LocationQuery, LocationQueryValue } from 'vue-router'



export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    empresa_id: 2,
    formulario: {} as IRegisterForm,
    user: null as IUser | null,
    token: null as string | null,
    shoppingCart: [] as Array<IShoppingCart>,
    likes: [] as Array<IProductLike>,
    objetoShoppingCart: {} as IShoppingCart,

    directions: [{
      nombre: "",
      direccion: "",
      delete: null,
    }] as Array<{
      id?: number,
      nombre: null | string,
      direccion: null | string,
      delete?: null | string,
    }>,
    directionsErrors: [{
      nombre: "",
      direccion: "",
    }] as Array<{
      nombre: string,
      direccion: string,
    }>,
    directionSelected: null as number | null
  }),
  persist: true,
  getters: {
    referenceWompi() {
      const fechaActual = new Date().toString();
      const javaScriptRelease = Date.parse(fechaActual);
      const randomNumber = Math.floor(Math.random() * 900000) + 100000;
      return 'vetszoo' + randomNumber + javaScriptRelease
    },
    subTotalProductsShoppingCart(store) {
      return store.shoppingCart.reduce((subTotal, currentValue) => {
        const multi = (currentValue.price ?? 0) * Number(currentValue.quantity)
        return subTotal + multi
      }, 0)
    },
    countProductsShoppingCart(store) {
      return store.shoppingCart.reduce((sum, currentValue) => {
        return sum + currentValue.quantity
      }, 0)
    },
    countLikes(store) {
      return store.likes.length
    },
  },
  actions: {
    //AUTHENTICATION
    async logout(): Promise<void> {
      this.$reset();
    },
    async login(): Promise<IGlobal> {
      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns.post(
        '/login',
        this.formulario,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.user = result.data.user

          if (result.data.user.shoppingCart.length > 0) {
            result.data.user.shoppingCart.forEach((element: IShoppingCart) => {
              this.shoppingCart.push({
                id: element.id,
                nombre: element.nombre,
                image: element.image,
                price: element.price,
                quantity: element.quantity
              })
            });
          }

          if (result.data.user.favoriteProducts.length > 0) {
            result.data.user.favoriteProducts.forEach((element: IFavoriteProducts) => {
              this.likes.push(element)
            });
          }
          if (result.data.user.directions.length > 0) {
            result.data.user.directions.forEach((element: any) => {
              this.directions.push(element)
              this.directionsErrors.push({
                nombre: "",
                direccion: ""
              })
            });
          }
          this.token = result.data.token
          this.customerFavoriteProductsSyncUp();
          this.customerShoppingCartSyncUp();
          toast.toast('Éxito', result.data.message, 'success')
        }
        if (result.data.code === 422) {
          toast.toast('Error', result.data.message, 'danger')
          return { error: result.data.errors, status: result.data.code };
        }
        if (result.data.code === 401) {
          toast.toast('Error', result.data.message, 'danger')
          return { status: result.data.code };
        }

        return { status: result.data.code };
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        if (error.response.data.code === 422) {
          toast.toast('Error', error.response.data.message, 'danger')
          return { error: error.response.data.errors, status: error.response.data.code };
        }
        if (error.response.data.code === 401) {
          toast.toast('Error', error.response.data.message, 'danger')
          return { status: error.response.data.code };
        }
        return error.response.status
      })
      return await response
    },
    async register(): Promise<IGlobal> {
      const preload = usePreloadStore()
      preload.isLoading = true
      this.formulario.direcciones = this.directions
      // this.formulario.empresa_id = 1
      this.formulario.empresa_id = 2
      const response = await axiosIns.post(
        '/register',
        this.formulario,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.user = result.data.user
          this.token = result.data.token
          toast.toast('Éxito', result.data.message, 'success')
        }
        if (result.data.code === 422) {
          toast.toast('Error', result.data.message, 'danger')
          return { error: result.data.errors, status: result.data.code };
        }

        return { status: result.data.code };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)

        return error.response.status
      })
      return await response
    },
    async update(): Promise<IGlobal> {
      const preload = usePreloadStore()
      preload.isLoading = true
      this.formulario.direcciones = this.directions
      const response = await axiosIns.post(
        '/updateUser',
        this.formulario,
      ).then(result => {
        preload.isLoading = false
        if (result.data.status === 200) {
          this.user = result.data.user
          this.directions = result.data.user.directions
          toast.toast('Éxito', result.data.message, 'success')
        }
        if (result.data.status === 422) {
          toast.toast('Error', result.data.message, 'danger')
          return { error: result.data.errors, status: result.data.status };
        }

        return { status: result.data.code };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        if (error.response.status === 422) {
          toast.toast('Error', error.response.data.message, 'danger')
          return { error: error.response.data.errors, status: error.response.data.status };
        }
        return error.response.status
      })
      return await response
    },

    //PRODUCTS FAVORITE
    syncUpLike(product: IProductLike | IGlobal) {
      const search = this.likes.find(ele => ele.id === product.id)
      if (search) {
        this.likes = this.likes.filter(ele => ele.id != search.id)
      } else {
        const objeto = {
          id: product.id,
          name: product.name,
          image: product.image_principal.path,
          category_name: product.category_name,
          subcategory_name: product.subcategory_name,
          price: product.price,
        }
        this.likes.push(objeto)
      }
      this.customerFavoriteProductsSyncUp();
    },
    async customerFavoriteProductsSyncUp(): Promise<void> {
      if (this.user?.id) {
        const favoriteProducts = this.likes.map((currentValue) => {
          return currentValue.id
        })

        const preload = usePreloadStore()
        preload.isLoading = true
        await axiosIns.post(
          '/customer-favoriteProducts-syncUp',
          {
            customer_id: this.user.id,
            favoriteProducts: favoriteProducts,
          },
        )
          .then(() => {
            preload.isLoading = false
          })
          .catch(async error => {
            preload.isLoading = false
            if (error.response.status === 500)
              toast.toast('Error', error.response.data.message, 'danger')
          })
      }
    },

    //SHOPPING CART 
    syncUpShoppingCart(product: IShoppingCart | IGlobal, type?: string) {
      const search = this.shoppingCart.find(ele => ele.id === product.id)
      if (search) {
        if (type == "addInput") search.quantity = product.quantity
        else if (type == "add") search.quantity++
        else if (type == "delete") {
          this.shoppingCart = this.shoppingCart.filter(ele => ele.id !== product.id)
        }
      } else {
        this.objetoShoppingCart = {
          id: product.id,
          name: product.name,
          image: product.image_principal.path,
          price: product.price,
          quantity: 0,
        }

        if (type == "addInput") this.objetoShoppingCart.quantity = product.quantity
        else this.objetoShoppingCart.quantity = 1

        this.shoppingCart.push(this.objetoShoppingCart)
        this.objetoShoppingCart = { id: null, image: "", name: "string", price: 0, quantity: 0 }
      }
      this.customerShoppingCartSyncUp()
    },
    async customerShoppingCartSyncUp(): Promise<void> {
      if (this.user?.id) {
        const shoppingCartProducts = this.shoppingCart.map((currentValue) => {
          return {
            id: currentValue.id,
            quantity: currentValue.quantity,
          }
        })
        const preload = usePreloadStore()
        preload.isLoading = true
        await axiosIns.post(
          '/customer-shoppingCart-syncUp',
          {
            customer_id: this.user.id,
            shoppingCart: shoppingCartProducts,
          },
        )
          .then(() => {
            preload.isLoading = false
          })
          .catch(async error => {
            preload.isLoading = false
            if (error.response.status === 500)
              toast.toast('Error', error.response.data.message, 'danger')
          })
      }
    },

    async fetchInfo() {
      const preload = usePreloadStore()
      preload.isLoading = true
      try {
        const result = await axiosIns.get('get-user', {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        })
        if (result.status == 200) {
          this.formulario = result.data.user

          if (result.data.user.shoppingCart.length > 0) {
            result.data.user.shoppingCart.forEach((element: IShoppingCart) => {
              this.shoppingCart.push({
                id: element.id,
                name: element.name,
                image: element.image,
                price: element.price,
                quantity: element.quantity
              })
            });
          }

          if (result.data.user.favoriteProducts.length > 0) {
            result.data.user.favoriteProducts.forEach((element: IFavoriteProducts) => {
              this.likes.push(element)
            });
          }
          if (result.data.user.directions.length > 0) {
            this.directions = []
            this.directionsErrors = []
            result.data.user.directions.forEach((element: any) => {
              this.directions.push(element)
              this.directionsErrors.push({
                nombre: "",
                direccion: ""
              })
            });
          }
        }
        preload.isLoading = false

      } catch (error) {
        preload.isLoading = false
      }
    },

    addDirection() {
      this.directions.push({
        nombre: "",
        direccion: "",
      })
      this.directionsErrors.push({
        nombre: "",
        direccion: ""
      })
    },
    removeDirection(i: number, mode: string | LocationQueryValue[]) {
      if (mode == 'edit') {
        this.directions[i].delete = "delete"
      } else {
        this.directions.splice(i, 1)
        this.directionsErrors.splice(i, 1)
      }
    }
  },
})
