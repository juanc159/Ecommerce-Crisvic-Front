<script lang="ts" setup>
import object1 from "@/assets/img/imageNotAvailableTbl.png";
import { useAuthenticationStore } from '@/stores/authentication'
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import { storeToRefs } from 'pinia';
import type IShoppingCart from '@/interfaces/Authentication/IShoppingCart';
import FormPay from '@/pages/Pw/Wompi/Components/FormPay.vue';

const configGlobal = useConfigGlobal()
const authenticationStore = useAuthenticationStore()
const { shoppingCart, directions, directionSelected } = storeToRefs(authenticationStore)

const decrement = (item: IShoppingCart) => {
  item.quantity--
}
const increment = (item: IShoppingCart) => {
  item.quantity++
}

</script>

<template>
  <div>
    <!--== Start Blog Area Wrapper ==-->
    <section class="shopping-cart-area">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="shopping-cart-form table-responsive mb-5">
              <form action="#" method="post">
                <table class="table table-striped text-center border-0">
                  <thead class="border-0">
                    <tr class="border-0">
                      <!-- <th class="bg-primary product-remove">&nbsp;</th> -->
                      <th class="bg-primary product-thumbnail border-0 rounded-bottom-0 rounded-start">
                        <i class="fa fa-file-image-o fs-5 text-white"></i>
                      </th>
                      <th class="bg-primary text-white product-name">
                        Producto
                      </th>
                      <th class="bg-primary text-white product-price">
                        Precio
                      </th>
                      <th class="bg-primary text-white product-quantity">
                        quantity
                      </th>
                      <th class="bg-primary text-white product-subtotal border-0 rounded-bottom-0 rounded-end">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    <tr class="tbody-item" v-for="(item, index) in shoppingCart" :key="index">
                      <!-- <td class="product-remove p-0">
                        <a class="remove" href="javascript:void(0)" @click="authenticationStore.syncUpShoppingCart(item,'delete')">×</a>
                      </td> -->
                      <td class="product-thumbnail p-0">
                        <div class="thumb">
                          <a href="single-product.html">
                            <img :src="configGlobal.baseUrl + item.image" :style="{ width: '75', height: '75' }">
                          </a>
                        </div>
                      </td>
                      <td class="product-name p-0">
                        <a class="title" href="single-product.html">{{ item.nombre }}</a>
                      </td>
                      <td class="product-price p-0">
                        <span class="price">{{ item.price_invoicing_app }}</span>
                      </td>
                      <td class="product-quantity p-0">
                        <div class="pro-qty">
                          <input type="text" class="form-control quantity rounded-start" title="Quantity"
                            :value="item.quantity">
                          <div class="inc qty-btn" @click="increment(item)" style="font-size: 16px;">
                            <i class="fa fa-plus mt-1"></i>
                          </div>
                          <div class="dec qty-btn" @click="decrement(item)" style="font-size: 16px;">
                            <i class="fa fa-minus"></i>
                          </div>
                        </div>
                        <button class="btn btn-outline-danger btn-sm rounded-circle ms-3 border-0"
                          @click="authenticationStore.syncUpShoppingCart(item, 'delete')">
                          <i class="fa fa-trash-o fs-6 pt-1 px-1" aria-hidden="true"></i>
                        </button>
                        <!-- <button class="btn btn-outline-danger rounded-circle ms-3" @click="authenticationStore.syncUpShoppingCart(item,'delete')" >
                          <i class="fa fa-times fs-6 pt-1 fs-5" aria-hidden="true"></i>
                        </button> -->
                      </td>
                      <td class="product-subtotal p-0">
                        <span class="price">{{ item.quantity * (item.price_invoicing_app ?? 0) }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="coupon-wrap">
              <h4 class="title">Coupon</h4>
              <p class="desc">Enter your coupon code if you have one.</p>
              <input type="text" class="form-control" placeholder="Coupon code">
              <button type="button" class="btn-coupon">Apply coupon</button>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="cart-totals-wrap">
              <h2 class="title">Cart totals</h2>
              <table>
                <tbody>
                  <tr class="cart-subtotal">
                    <th>Subtotal</th>
                    <td>
                      <span class="amount">{{ authenticationStore.subTotalProductsShoppingCart }}</span>
                    </td>
                  </tr>
                  <tr class="order-total">
                    <th>Total</th>
                    <td>
                      <span class="amount">{{ authenticationStore.subTotalProductsShoppingCart }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="my-5">
                <label for="">Selecciona una dirección</label>
                <select class="form-select" v-model="directionSelected">
                  <option v-for="(item) in directions" :value="item.id">{{ item.nombre }} - {{ item.direccion }}</option>
                </select>
              </div>
              <div class="text-end">
                <FormPay :class="'checkout-button'" textButton="Pasar por la caja" v-if="directionSelected !== null">
                </FormPay>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--== End Blog Area Wrapper ==-->
  </div></template> 
