<script lang="ts" setup>

import { useConfigGlobal } from '@/composables/useConfigGlobal'
import { useAuthenticationStore } from '@/stores/authentication' 

import router from '@/router';
import { useSinglePageStore } from '@/stores/singlePage'
import { ref } from 'vue';
import type IProduct from '@/interfaces/Products/IProduct';
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

const emit = defineEmits(["selectedItem"])
const datap = ref<IGlobal>({ })
const selectedItem = (action: any) => {
  switch (action) {
    case 'add-like':    
      props.product.like = !props.product.like       
      authenticationStore.syncUpLike(props.product);
      break;
    case "add-cart":
      authenticationStore.syncUpShoppingCart(props.product,"add");
      break;
    case "single-page":
    for (const key in props.product) { 
        datap.value[key] = props.product[key]
      }
    singlePageStore.getInfo(datap.value)
      router.push({
        name:"singlePage",
        params:{
          id: props.product.id,
        },
        query:{ 
          product_name:props.product.nombre
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
    <div class="product-item product-list-item">
      <div class="row">
        <div class="col-lg-6">
          <div class="product-thumb" >
            <a :href="props.href" @click="selectedItem('single-page')">
              <img :src="configGlobal.baseUrl + props.product.image" :style="{ width: '270px', height: '320px' }"
                alt="Image-HasTech">
            </a>
            <div class="product-action">
              <button type="button" @click="selectedItem('add-like')" class="btn-product-wishlist" data-bs-toggle="modal"
                data-bs-target="#action-WishlistModal">
                <i class="text-danger fa" :class="(props.product.like) ? 'fa-heart':'fa-heart-o'"></i>
                <!-- <i :style="{ color: props.product.like ? 'red' : '' }" class="pe-7s-like"></i> -->
              </button>
              <div class="product-action-links">
                <button type="button" class="btn-product-quick-view text-primary-hover" @click="selectedItem('view')" data-bs-toggle="modal" data-bs-target="#action-QuickViewModal">
                  <i class="fa fa-eye"></i>
                  <!-- <i class="pe-7s-look"></i> -->
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="product-info" @click="selectedItem('single-page')">
            <h4 class="title">
              <a :href="props.href">{{ props.product.nombre }}</a>
            </h4>
            <div class="prices">
              <span class="price">{{ props.product.price_invoicing_app }}</span>
            </div>
            <p class="desc">{{ props.product.descripcion }}</p>
            <button type="button" class="btn-theme btn-sm" @click="selectedItem('add-cart')" data-bs-toggle="modal"
              data-bs-target="#action-CartAddModal">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--== End prPduct Item ==-->

     
  </div>
</template>