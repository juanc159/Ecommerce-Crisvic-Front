<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSinglePageStore } from '@/stores/singlePage'
import { useAuthenticationStore } from '@/stores/authentication'
import router from '@/router';
import { formatNumberMiles } from "@/@core/utils/validators";
const authenticationStore = useAuthenticationStore()

const singlePageStore = useSinglePageStore()
const { product } = storeToRefs(singlePageStore)

const props = defineProps({
  allInfo: {
    type: Boolean,
    default: true,
  }
})

const decrement = () => {
  if (product && product.value && product.value.quantity > 1) {
    product.value.quantity--;
  }
}

const increment = () => {
  if (product && product.value) {
    product.value.quantity++
  }
}

const selectedItem = (action: any, type: string = "add") => {
  switch (action) {
    case 'add-like':
      product.value.like = !product.value.like
      authenticationStore.syncUpLike(product.value);
      break;
    case "add-cart":
      authenticationStore.syncUpShoppingCart(product.value, type);
      break;
    case "single-page":
      router.push({
        name: "singlePage",
        params: {
          id: product.value.id,
        },
        query: {
          product_name: product.value.nombre
        }
      })
      break;
    default:
      console.log("nada");
      break;
  }
}

</script>

<template>
  <div class="single-product-content">
    <div class="inner">
      <h3 class="product-title">{{ product.name }}</h3>
      <span class="price-amount">$ {{ formatNumberMiles(product.price) }}</span>
      <ul class="product-meta">
        <li>
          <span>Código:</span> &nbsp;
          {{ product.code }}
        </li>
        <li>
          <span>Categoria: </span> &nbsp;
          <a href="href">{{ product.category_name }}</a>
        </li>
        <li>
          <span>Sub Categoria: </span> &nbsp;
          <a href="href">{{ product.subcategory_name }}</a>
        </li>
      </ul>
      <p class="description">{{ product.description }}</p>

      <div class="product-variations-wrapper">

        <!-- Start Product Variation  -->
        <!-- <div class="product-variation">
          <h6 class="title">Color:</h6>
          <div class="color-variant-wrapper">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
              <label class="form-check-label" for="inlineRadio1" style="color: green;">Verde</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
              <label class="form-check-label" for="inlineRadio2" style="color: blue;">Azul</label>
            </div>

          </div>
        </div> -->
        <!-- End Product Variation  -->

        <!-- Start Product Variation  -->
        <!-- <div class="product-variation">
          <h6 class="title">Peso:</h6>

          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option1">
            <label class="form-check-label" for="inlineRadio3">1KG</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option1">
            <label class="form-check-label" for="inlineRadio4">1.5KG</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="option1">
            <label class="form-check-label" for="inlineRadio5">2KG</label>
          </div>
        </div> -->
        <!-- End Product Variation  -->

      </div>

      <!-- Start Product Action Wrapper  -->
      <div class="product-action-wrapper d-flex-center">
        <!-- Start Product Action  -->
        <ul class="product-action d-flex-center mb--0">
          <li>
            <div class="pro-qty d-flex align-items-center">
              <button type="button" @click="decrement()" class="btn btn-light btn-sm  btn-add-quantity qtybtn ">
                <i class="fa-solid fa-minus"></i>
              </button>
              <input type="number" v-model="product.quantity"
                class="input-number-nocontrol form-control text-center mx-2">
              <button type="button" @click="increment()" class="btn btn-light btn-sm  qtybtn">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </li>
          <li class="add-to-cart">
            <a style="cursor: pointer;" @click="selectedItem('add-cart', 'addInput')" class="axil-btn btn-bg-primary"
              data-bs-toggle="modal" data-bs-target="#action-CartAddModal">Añadir al carrito</a>
          </li>


          <li class="wishlist">
            <a style="cursor: pointer;" class="axil-btn wishlist-btn" @click="selectedItem('add-like')">
              <i :class="(product.like) ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'"></i>

            </a>
          </li>
        </ul>
        <!-- End Product Action  -->

      </div>
      <!-- End Product Action Wrapper  -->
    </div>
  </div>
</template>

<style scoped>
.qtybtn {
  display: block;
  border: 2px solid rgba(0, 0, 0, 0%);
  border-radius: 50%;
  background: #f6f7fb;
  block-size: 32px;
  color: #000;
  cursor: pointer;
  float: inline-start;
  font-size: 16px;
  font-weight: 300;
  inline-size: 32px;
  line-height: 26px;
  text-align: center;
  transition: 0.3s;
}
</style>
