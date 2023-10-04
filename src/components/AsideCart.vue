<script lang="ts" setup>
import { useAuthenticationStore } from '@/stores/authentication'
import { storeToRefs } from 'pinia';
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import FormPayVue from '@/pages/PwWompi/Components/FormPay.vue';
const configGlobal = useConfigGlobal()


const authenticationStore = useAuthenticationStore()
const { shoppingCart, subTotalProductsShoppingCart } = storeToRefs(authenticationStore)

const formatNumberMiles = (number: number | string) => {
  const partes = number.toString().split(',');
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return partes.join(',');
}

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
    <aside class="aside-cart-wrapper offcanvas offcanvas-end " tabindex="-1" id="AsideOffcanvasCart"
      aria-labelledby="offcanvasRightLabel">
      <div class="cart-content-wrap">
        <button class="btn-aside-cart-close" id="btnCloseOffcanvasRightLabel" data-bs-dismiss="offcanvas"
          aria-label="Close">
          Carrito de compra&nbsp;
          <i class="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
      <div class="offcanvas-body px-4">
        <ul class="aside-cart-product-list">
          <li class="aside-product-list-item mb-2" v-for="(item, index) in shoppingCart" :key="index">
            <a href="javascript:void(0)" class="remove" @click="authenticationStore.syncUpShoppingCart(item, 'delete')">
              ×
            </a>
            <a href="single-product.html">
              <img :src="configGlobal.baseUrl + item.image" width="90" height="110" alt="Image-HasTech">
              <span class="product-title">{{ item.nombre }}</span>
            </a>
            <span class="product-price">{{ item.quantity }} × {{ item.price_invoicing_app }}</span>
          </li>
        </ul>
        <p class="cart-total">
          <span>Subtotal:</span><span class="amount">{{ formatNumberMiles(subTotalProductsShoppingCart) }}</span>
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
    </aside>
    <!--== End Aside Cart ==-->
  </div>
</template>
