<script lang="ts" setup>
import { useAuthenticationStore } from '@/stores/authentication'
import { storeToRefs } from 'pinia';
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import FormPayVue from '@/pages/Pw/Wompi/Components/FormPay.vue';
import { formatNumberMiles } from '@/@core/utils/validators';
const configGlobal = useConfigGlobal()


const authenticationStore = useAuthenticationStore()
const { shoppingCart, subTotalProductsShoppingCart } = storeToRefs(authenticationStore)


const closeAsideOffcanvasCart = (number: number | string) => {
  setTimeout(() => {
    let button = document.getElementById("btnCloseOffcanvasRightLabel");
    button?.click()
  }, 30);
}

</script>

<template>
  <div>
    <!--== Start Aside Cart ==-->

    <!-- <aside class="modal fade quick-view-product aside-cart-wrapper offcanvas offcanvas-end" id="AsideOffcanvasCart"
      tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              la lista de deseos!
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            a
          </div>
        </div>
      </div>
    </aside> -->

    <div class="offcanvas offcanvas-end aside" tabindex="-1" id="AsideOffcanvasCart"
      aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 style="margin: 0;">
          Revisión del carrito
        </h5>
        <button type="button" class="boton" data-bs-dismiss="offcanvas"><i class="fas fa-times"></i></button>
      </div>
      <div class="offcanvas-body">
        <div class="offcanvas-body px-4">
          <ul class=" " style="list-style: none;">
            <li class="prueba" v-for="(item, index) in shoppingCart" :key="index">
              <a href="javascript:void(0)" class="remove" @click="authenticationStore.syncUpShoppingCart(item, 'delete')">
                ×
              </a>
              <a href="single-product.html">
                <img :src="item.image" width="90" height="110" alt="Image-HasTech">
                <span class="product-title">{{ item.name }}</span>
              </a>
              <span class=" ">{{ item.quantity }} × {{ formatNumberMiles(item.price) }}</span>
            </li>
          </ul>
          <p class="cart-total">
            <span>Subtotal: </span><span class="amount"> {{ formatNumberMiles(subTotalProductsShoppingCart) }}</span>
          </p>

          <div class="group-btn d-flex justify-content-around">
            <RouterLink class="axil-btn btn-bg-primary " :to="{ name: 'shopCart' }" @click="closeAsideOffcanvasCart">
              Ver carrito
            </RouterLink>

            <RouterLink class="axil-btn btn-bg-secondary   " :to="{ name: 'shopCart' }" @click="closeAsideOffcanvasCart">
              Checkout
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!--== End Aside Cart ==-->
  </div>
</template>



<style lang="scss" scoped>
.boton {
  border-radius: 50% !important;
  block-size: 40px !important;
  color: var(--color_black) !important;
  font-size: 16px !important;
  inline-size: 40px !important;
}

.boton:hover {
  background-color: var(--color-primary) !important;
  color: var(--color-white) !important;
}

.offcanvas .offcanvas-body {
  flex: auto;
  padding-block: 30px;
  padding-inline: 0;
}

.prueba {}
</style>
