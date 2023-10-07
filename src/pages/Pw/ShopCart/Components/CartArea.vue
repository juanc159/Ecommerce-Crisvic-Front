<script lang="ts" setup>
import object1 from "@/assets/img/imageNotAvailableTbl.png";
import { useAuthenticationStore } from '@/stores/authentication'
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import { storeToRefs } from 'pinia';
import type IShoppingCart from '@/interfaces/Authentication/IShoppingCart';
import FormPay from '@/pages/Pw/Wompi/Components/FormPay.vue';
import { formatNumberMiles } from "@/@core/utils/validators";
import IProduct from "@/interfaces/Products/IProduct";

const configGlobal = useConfigGlobal()
const authenticationStore = useAuthenticationStore()
const { shoppingCart, directions, directionSelected } = storeToRefs(authenticationStore)

const decrement = (item: IShoppingCart) => {
  item.quantity--
}
const increment = (item: IShoppingCart) => {
  item.quantity++
}

const clearCart = () => {
  shoppingCart.value = []
}


</script>

<template>
  <div>



    <!-- Start Cart Area  -->
    <div class="axil-product-cart-area axil-section-gap bg-color-white">
      <div class="container">
        <div class="axil-product-cart-wrap">
          <div class="product-table-heading">
            <h4 class="title">Your Cart</h4>
            <a href="#" class="cart-clear" @click="clearCart()">Limpiar carrito</a>
          </div>
          <div class="table-responsive">
            <table class="table axil-product-table axil-cart-table mb--40">
              <thead>
                <tr>
                  <th scope="col" class="product-remove"></th>
                  <th scope="col" class="product-thumbnail">Producto</th>
                  <th scope="col" class="product-title"></th>
                  <th scope="col" class="product-price">Precio</th>
                  <th scope="col" class="product-quantity">Cantidad</th>
                  <th scope="col" class="product-subtotal">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in shoppingCart" :key="index">
                  <td class="product-remove">
                    <a href="#" type="button" class="remove-wishlist"
                      @click="authenticationStore.syncUpShoppingCart(item, 'delete')" style="cursor: pointer;">
                      <i class="fal fa-times"></i>
                    </a>
                  </td>
                  <td class="product-thumbnail">
                    <a href="single-product.html">
                      <img :src="item.image" :style="{ width: '75', height: '75' }">
                    </a>
                  </td>
                  <td class="product-title">
                    <a href="single-product.html">{{ item.name }}</a>
                  </td>
                  <td class="product-price" data-title="Price">
                    <span class="currency-symbol">$</span>
                    {{ formatNumberMiles(item.price) }}
                  </td>
                  <td class="product-quantity" data-title="Qty">
                    <div class="pro-qty d-flex align-items-center">
                      <button @click="decrement(item)" type="button"
                        class="btn btn-light btn-sm  btn-add-quantity qtybtn ">
                        <i class="fa-solid fa-minus"></i>
                      </button>
                      <input type="number" v-model="item.quantity"
                        class="input-number-nocontrol form-control text-center mx-2">
                      <button @click="increment(item)" type="button" class="btn btn-light btn-sm  qtybtn">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td class="product-subtotal" data-title="Subtotal"><span class="currency-symbol">$</span>{{
                    formatNumberMiles(item.quantity * item.price) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="cart-update-btn-area">
            <div class="input-group product-cupon">
              <input placeholder="Enter coupon code" type="text">
              <div class="product-cupon-btn">
                <button type="submit" class="axil-btn btn-outline">Apply</button>
              </div>
            </div>
            <div class="update-btn">
              <a href="#" class="axil-btn btn-outline">Update Cart</a>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-5 col-lg-7 offset-xl-7 offset-lg-5">
              <div class="axil-order-summery mt--80">
                <h5 class="title mb--20">Order Summary</h5>
                <div class="summery-table-wrap">
                  <table class="table summery-table mb--30">
                    <tbody>
                      <tr class="order-subtotal">
                        <td>Subtotal</td>
                        <td>
                          {{ formatNumberMiles(authenticationStore.subTotalProductsShoppingCart) }}
                        </td>
                      </tr>
                      <tr class="order-shipping">
                        <td>Shipping</td>
                        <td>
                          <div class="input-group">
                            <input type="radio" id="radio1" name="shipping" checked>
                            <label for="radio1">Free Shippping</label>
                          </div>
                          <div class="input-group">
                            <input type="radio" id="radio2" name="shipping">
                            <label for="radio2">Local: $35.00</label>
                          </div>
                          <div class="input-group">
                            <input type="radio" id="radio3" name="shipping">
                            <label for="radio3">Flat rate: $12.00</label>
                          </div>
                        </td>
                      </tr>
                      <tr class="order-tax">
                        <td>State Tax</td>
                        <td>$8.00</td>
                      </tr>
                      <tr class="order-total">
                        <td>Total</td>
                        <td class="order-total-amount">$125.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <a href="checkout.html" class="axil-btn btn-bg-primary checkout-btn">Process to Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Cart Area  -->


  </div>
</template> 
