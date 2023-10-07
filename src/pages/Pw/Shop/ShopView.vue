<script lang="ts" setup>
import ProductItem from '../Home/Components/ProductItem.vue';
import ProductItem2 from '../Home/Components/ProductItem2.vue';
import BannerProductSingleItem from './Components/BannerProductSingleItem.vue';
import ShopTopBar from './Components/ShopTopBar.vue';
import ShopSidebar from './Components/ShopSidebar.vue';
import { useProductsStore } from '@/stores/products';
import ProductQuickViewModal from "@/components/Modals/ProductQuickViewModal.vue";
import ProductQuickWishlistModal from "@/components/Modals/ProductQuickWishlistModal.vue";
import ProductQuickAddCartModal from "@/components/Modals/ProductQuickAddCartModal.vue";
import { useAuthenticationStore } from '@/stores/authentication'
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import type IProduct from '@/interfaces/Products/IProduct';
import { useSinglePageStore } from '@/stores/singlePage'
import PageHeaderArea from '@/components/PageHeaderArea.vue';
const singlePageStore = useSinglePageStore()

const productStore = useProductsStore()
const { products, lastPage, currentPage, totalData } = storeToRefs(productStore)
const authenticationStores = useAuthenticationStore()
const { shoppingCart } = storeToRefs(authenticationStores)
const route = useRoute()

const page = ref<number>(1)

const eventFetch = (p: number) => {
  if (p > lastPage.value) {
    p = lastPage.value
  }
  if (p == 0) {
    p = 1
  }

  productStore.addFilter("page", p)
  page.value = p
  productStore.fetchAll()
}
onMounted(() => {
  for (const key in route.query) {
    productStore.addFilter(key, route.query[key])
  }
  productStore.addFilter("paginate", 30)
  productStore.fetchAll();
})

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
  price: null,
  nombre: null
})

const selectedItem = (data: IProduct) => {
  const info = shoppingCart.value.find(ele => ele.id == data.id);
  product.value = data

  if (info) product.value.quantity = info.quantity
  else product.value.quantity = 0


  singlePageStore.getInfo(product.value)
}

</script>

<template>
  <div>

    <Ecommerce>
      <PageHeaderArea title="Explorar todos los productos" :breadcrumb="['Inicio', 'home', 'Productos']">
      </PageHeaderArea>

      <main class="main-content bg-color-white">
        <!--== Start Product Area Wrapper ==-->
        <section class="product-area">
          <div class="container pt-5">
            <div class="row flex-md-row-reverse justify-content-between">
              <div class="col-lg-9">
                <div class="row" v-if="lastPage > 1 && products.length > 0">
                  <div class="col-lg-12">
                    <div class="axil-shop-top mb--40 d-flex justify-content-between">
                      <nav aria-label="Page navigation">
                        <ul class="pagination">
                          <li class="page-item" v-if="currentPage > 1 ? true : false">
                            <a class="page-link" href="#" @click="eventFetch(page - 1)">Anterior</a>
                          </li>
                          <li class="page-item" v-for="(item, index) in lastPage" :key="index">
                            <a v-if="index > 0 || index < lastPage" class="page-link"
                              :class="item == currentPage ? 'active' : ''" href="#" @click="eventFetch(item)">{{ item
                              }}</a>
                          </li>
                          <li class="page-item" v-if="lastPage == currentPage ? false : true">
                            <a class="page-link" href="#" @click="eventFetch(page + 1)">Siguiente</a>
                          </li>
                        </ul>
                      </nav>
                      <div class="category-select align-items-center justify-content-lg-end justify-content-between">
                        <!-- Start Single Select  -->
                        <span class="filter-results"> Mostrando
                          {{ (currentPage - 1) * products.length + 1 }} -
                          {{ Math.min(currentPage * products.length, totalData)
                          }}
                          de {{ totalData }} resultados</span>
                        <!-- End Single Select  -->
                      </div>
                      <div class="d-lg-none">
                        <button class="product-filter-mobile filter-toggle"><i class="fas fa-filter"></i> FILTER</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row row--15">
                  <div class="col-xl-4 col-sm-6" v-for="(item, index) in products" :key="index">
                    <div class="tab-content" id="nav-tabContent">
                      <ProductItem :product="item" @selected-item="selectedItem">
                      </ProductItem>
                    </div>
                  </div>
                </div>
                <div class="row" v-if="lastPage > 1 && products.length > 0">
                  <div class="col-lg-12">
                    <div class="axil-shop-top mb--40 d-flex justify-content-between">
                      <nav aria-label="Page navigation">
                        <ul class="pagination">
                          <li class="page-item" v-if="currentPage > 1 ? true : false">
                            <a class="page-link" href="#" @click="eventFetch(page - 1)">Anterior</a>
                          </li>
                          <li class="page-item" v-for="(item, index) in lastPage" :key="index">
                            <a v-if="index > 0 || index < lastPage" class="page-link"
                              :class="item == currentPage ? 'active' : ''" href="#" @click="eventFetch(item)">{{ item
                              }}</a>
                          </li>
                          <li class="page-item" v-if="lastPage == currentPage ? false : true">
                            <a class="page-link" href="#" @click="eventFetch(page + 1)">Siguiente</a>
                          </li>
                        </ul>
                      </nav>
                      <div class="category-select align-items-center justify-content-lg-end justify-content-between">
                        <!-- Start Single Select  -->
                        <span class="filter-results"> Mostrando
                          {{ (currentPage - 1) * products.length + 1 }} -
                          {{ Math.min(currentPage * products.length, totalData)
                          }}
                          de {{ totalData }} resultados</span>
                        <!-- End Single Select  -->
                      </div>
                      <div class="d-lg-none">
                        <button class="product-filter-mobile filter-toggle"><i class="fas fa-filter"></i> FILTER</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3">
                <ShopSidebar></ShopSidebar>
              </div>
            </div>

          </div>
        </section>
      </main>

      <ProductQuickViewModal :product="product"></ProductQuickViewModal>
      <ProductQuickWishlistModal :product="product"></ProductQuickWishlistModal>
      <ProductQuickAddCartModal :product="product"></ProductQuickAddCartModal>

    </Ecommerce>
  </div>
</template>
<style lang="scss">
/* stylelint-disable import-notation */
@import url("@/assets/main.scss");
</style>
<route lang="yaml">
name: shop
meta:
  layout: blank
</route>
      
      