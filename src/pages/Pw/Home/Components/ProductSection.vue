<script lang="ts" setup>
import { useProductsStore } from '@/stores/products';
import ProductItem from '@/pages/Pw/Home/Components/ProductItem.vue';
import ProductQuickViewModal from "@/components/Modals/ProductQuickViewModal.vue";
import ProductQuickWishlistModal from "@/components/Modals/ProductQuickWishlistModal.vue";
import ProductQuickAddCartModal from "@/components/Modals/ProductQuickAddCartModal.vue";
import { useAuthenticationStore } from '@/stores/authentication'
import { useSubCategoriesStore } from '@/stores/subCategories'
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useSinglePageStore } from '@/stores/singlePage'
import type IProduct from '@/interfaces/Products/IProduct';

const singlePageStore = useSinglePageStore()

const authenticationStores = useAuthenticationStore()
const subCategoriesStore = useSubCategoriesStore()
const { shoppingCart } = storeToRefs(authenticationStores)
const { subCategories } = storeToRefs(subCategoriesStore)

const productStore = useProductsStore()
const { products, filter } = storeToRefs(productStore)

const product = ref<IProduct>({
  id: null,
  typeData: null,
  empresa_id: null,
  specie: null,
  quantity: 0,
  like: null,
  descripcion: null,
  categoria_nombre: null,
  sub_categoria_nombre: null,
  image: null,
  nombre: null,
})
const selectedItem = (data: IProduct) => {
  const info = shoppingCart.value.find(ele => ele.id == data.id);
  product.value = data

  if (info) product.value.quantity = info.quantity
  else product.value.quantity = 0
  singlePageStore.getInfo(product.value)
}

const handleFilter = async (id: number | null) => {
  filter.value.subCategory_id = id
  productStore.fetchAll();
}
onMounted(() => {
  productStore.clearFilter()
  productStore.addFilter("paginate", 12)
  productStore.fetchAll(true);
})

</script>

<template>
  <div>
    <!-- Start Expolre Product Area  -->
    <div class="axil-product-area bg-color-white axil-section-gap">
      <div class="container">
        <div class="section-title-wrapper">
          <span class="title-highlighter highlighter-primary">
            <i class="fa-solid fa-basket-shopping"></i>
            Nuestros productos
          </span>
          <h2 class="title">Explora nuestros productos</h2>
        </div>
        <div class="new-arrivals-product-activation slick-layout-wrapper--15 axil-slick-arrow  arrow-top-slide">
          <div class="slick-single-layout">
            <div class="row row--15">
              <div class="col-xl-3 col-lg-4 col-sm-6 col-12 mb--30" v-for="(item, index) in products" :key="index">

                <ProductItem :product="item" :key="index" @selected-item="selectedItem" />
              </div>
              <!-- End Single Product  -->


            </div>
          </div>
          <!-- End .slick-single-layout -->
        </div>
        <div class="row">
          <div class="col-lg-12 text-center mt--20 mt_sm--0">
            <RouterLink class="axil-btn btn-bg-lighter btn-load-more" :to="{ name: 'shop' }">
              Ver todos los productos
            </RouterLink>
          </div>
        </div>

      </div>
    </div>
    <!-- End Expolre Product Area  -->


    <ProductQuickViewModal></ProductQuickViewModal>
    <ProductQuickWishlistModal></ProductQuickWishlistModal>
    <ProductQuickAddCartModal></ProductQuickAddCartModal>

  </div>
</template>
