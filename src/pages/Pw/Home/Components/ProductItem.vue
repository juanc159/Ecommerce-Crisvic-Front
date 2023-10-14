<script lang="ts" setup>
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import router from '@/router';
import { useAuthenticationStore } from '@/stores/authentication'
import { useSinglePageStore } from '@/stores/singlePage'
import type IProduct from '@/interfaces/Products/IProduct'
import { ref } from 'vue';
import type IGlobal from '@/interfaces/Global/IGlobal';
import { formatNumberMiles } from '@/@core/utils/validators';
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
          product_name: props.product.name
        }
      })

      break;
    default:
      console.log("nada");
      break;

  }
  emit("selectedItem", props.product)
}


</script>

<template>
  <div>
    <!--== Start Product Item ==-->

    <div class="axil-product product-style-one">
      <div class="thumbnail">


        <div @click="selectedItem('single-page')" style="cursor: pointer;">
          <VImg :src="props.product.image_principal?.path" class="main-img img-fluid   rounded" />
        </div>


        <!-- <div class="label-block label-right">
          <div class="product-badget">20% Off</div>
        </div> -->

        <div class="product-hover-action">
          <ul class="cart-action">
            <li class="quickview">

              <a @click="selectedItem('view')" type="button" data-bs-toggle="modal"
                data-bs-target="#action-QuickViewModal">
                <VIcon icon="mdi-eye-outline"></VIcon>
              </a>
            </li>

            <li class="select-option">

              <a style="font-size: 1.2rem !important;" @click="selectedItem('add-cart')" type="button"
                data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                <i class="fa-solid fa-bag-shopping"></i>
                Añadir al carrito
              </a>


            </li>
            <li class="wishlist">

              <a @click="selectedItem('add-like')" type="button" class="btn-product-wishlist" data-bs-toggle="modal"
                data-bs-target="#action-WishlistModal">
                <VIcon class="text-danger" :icon="(props.product.like) ? 'mdi-heart ' : 'mdi-heart-outline'"></VIcon>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="product-content">
        <div class="inner">
          <div class="product-rating">
            <span class="icon">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </span>
            <!-- <span class="rating-number">(64)</span> -->
          </div>
          <h5 class="title"><a :href="props.href">{{ props.product.name }}</a></h5>
          <div class="product-price-variant">
            <span class="price current-price">COP {{ formatNumberMiles(props.product.price) }}</span>
            <!-- <span class="price old-price">$49.99</span> -->
          </div>
        </div>
      </div>
    </div>

    <!--== End prPduct Item ==-->
  </div>
</template> 
