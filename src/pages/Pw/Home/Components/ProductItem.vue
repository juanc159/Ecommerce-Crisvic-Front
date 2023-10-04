<script lang="ts" setup>
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import router from '@/router';
import { useAuthenticationStore } from '@/stores/authentication'
import { useSinglePageStore } from '@/stores/singlePage'
import type IProduct from '@/interfaces/Products/IProduct'
import { ref } from 'vue';
import type IGlobal from '@/interfaces/Global/IGlobal';
const singlePageStore = useSinglePageStore()

const authenticationStore = useAuthenticationStore()
const configGlobal = useConfigGlobal()
const props = defineProps({
  product: {
    type: Object as () => IGlobal,
    required: true,
  },
  href: {
    type: String,
    required: false,
    default: "#",
  }
})

const datap = ref<IGlobal>({})
const emit = defineEmits(["selectedItem"])

const selectedItem = (action: any) => {
  switch (action) {
    case 'add-like':
      props.product.like = !props.product.like
      authenticationStore.syncUpLike(props.product);
      break;
    case "add-cart":
      authenticationStore.syncUpShoppingCart(props.product, "add");
      break;
    case "single-page":
      for (const key in props.product) {
        datap.value[key] = props.product[key];
      }
      singlePageStore.getInfo(datap.value)
      router.push({
        name: "singlePage",
        params: {
          id: props.product.id,
        },
        query: {
          product_name: props.product.nombre
        }
      })

      break;
    default:
      console.log("nada");
      break;

  }
  emit("selectedItem", props.product)
}

const formatNumberMiles = (number: number | string) => {  
  const partes = number.toString().split(',');
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return partes.join(',');
}

</script>

<template>
  <div>
    <!--== Start Product Item ==-->

    <div class="axil-product product-style-one">
      <div class="thumbnail">


        <div @click="selectedItem('single-page')">
          <a :href="props.href">
            <img :src="configGlobal.baseUrl + props.product.image" class="main-img" alt="Image-HasTech">
          </a>
        </div>


        <div class="label-block label-right">
          <div class="product-badget">20% Off</div>

        </div>

        <div class="product-hover-action">
          <ul class="cart-action">
            <li class="quickview">
              <!-- <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view-modal">
                <i class="far fa-eye"></i>
              </a> -->

              <a   @click="selectedItem('view')" type="button"
              data-bs-toggle="modal" data-bs-target="#action-QuickViewModal">
              <i class="fa-solid fa-eye"></i>  
              </a>
            </li>

            <li class="select-option">
              <!-- <a href="single-product.html">
                Add to Cart
              </a> -->

              <a @click="selectedItem('add-cart')" type="button" data-bs-toggle="modal"
                data-bs-target="#action-CartAddModal">
                <i class="fa-solid fa-bag-shopping"></i>
                Añadir al carrito
              </a>


            </li>
            <li class="wishlist">
 
              <!-- <a   href="#" ><i class="far fa-heart"></i></a> -->
              <a @click="selectedItem('add-like')" type="button" class="btn-product-wishlist" data-bs-toggle="modal"
                data-bs-target="#action-WishlistModal">
                <i :class="(props.product.like) ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'"></i>
              </a>


            </li>
          </ul>
        </div>
      </div>

      <div class="product-content">
        <div class="inner">
          <div class="product-rating">
            <span class="icon">
              <i class="fa-solid fa-star"></i> 
              <i class="fa-solid fa-star"></i> 
              <i class="fa-solid fa-star"></i> 
              <i class="fa-solid fa-star"></i> 
              <i class="fa-solid fa-star"></i> 
            </span>
            <span class="rating-number">(64)</span>
          </div>
          <h5 class="title"><a :href="props.href">{{ props.product.nombre }}</a></h5>
          <div class="product-price-variant">
            <span class="price current-price">{{ formatNumberMiles(props.product.price_invoicing_app) }}</span>
            <span class="price old-price">$49.99</span>
          </div>
        </div>
      </div>
    </div>

    <!--== End prPduct Item ==-->
  </div>
</template>
<!-- 
<style>
.btn-product-wishlist {
  background-color: #ffffff;
  border-radius: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}
</style> -->