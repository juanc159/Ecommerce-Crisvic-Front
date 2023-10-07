<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import object1 from "@/assets/img/imageNotAvailableTbl.png";
import { useAuthenticationStore } from '@/stores/authentication'
import ProductQuickViewModal from "@/components/Modals/ProductQuickViewModal.vue";
import { ref } from 'vue';
import type IGlobal from '@/interfaces/Global/IGlobal'
import type IProductLike from '@/interfaces/Products/IProductLike';
import { formatNumberMiles } from '@/@core/utils/validators';

const authenticationStore = useAuthenticationStore()
const { likes } = storeToRefs(authenticationStore)

const product = ref<IGlobal>({})
const removeLikeItem = (item: IProductLike) => {
  authenticationStore.syncUpLike(item);
}
const selectedItem = (item: IGlobal) => {
  for (const key in item) {
    product.value[key] = item[key]
  }
  const search = authenticationStore.shoppingCart.find(ele => ele.id === product.value.id)
  if (search) {
    product.value.quantity = search.quantity
  }
}
</script>

<template>
  <div>

    <!-- Start Wishlist Area  -->
    <div class="axil-wishlist-area axil-section-gap bg-color-white">
      <div class="container">
        <div class="product-table-heading">
          <h4 class="title">Mi lista de deseos</h4>
        </div>
        <div class="table-responsive">
          <table class="table axil-product-table axil-wishlist-table">
            <thead>
              <tr>
                <th scope="col" class="product-remove"></th>
                <th scope="col" class="product-thumbnail text-center"><i class="fa-solid fa-image"></i></th>
                <th scope="col" class="product-title">Nombre Producto</th>
                <th scope="col" class="product-price">Precio unitario</th>
                <th scope="col" class="product-stock-status">Stock Status</th>
                <th scope="col" class="product-add-cart text-center"><i class="fa-solid fa-cart-plus"></i></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in likes" :key="index">
                <td class="product-remove text-center">
                  <a @click="removeLikeItem(item)" style="cursor: pointer;" class="remove-wishlist">
                    <i class="fa-solid fa-xmark"></i>
                  </a>
                </td>
                <td class="product-thumbnail text-center">
                  <a href="single-product.html">
                    <img :src="item.image">
                  </a>
                </td>
                <td class="product-title">
                  <RouterLink :to="{ name: 'singlePage', params: { id: item.id } }">
                    {{ item.name }}
                  </RouterLink>
                </td>
                <td class="product-price" data-title="Price">
                  <span class="currency-symbol">$</span> {{ formatNumberMiles(item.price) }}
                </td>
                <td class="product-stock-status" data-title="Status">In Stock</td>
                <td class="product-add-cart text-center">
                  <a style="cursor: pointer;" class="axil-btn btn-outline" @click="selectedItem(item)"
                    data-bs-toggle="modal" data-bs-target="#action-QuickViewModal">
                    Ver información&nbsp;
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- End Wishlist Area  -->

    <ProductQuickViewModal :product="product"></ProductQuickViewModal>
  </div>
</template> 
 