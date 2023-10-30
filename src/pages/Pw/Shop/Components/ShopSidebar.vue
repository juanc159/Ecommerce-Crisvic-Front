<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useProductsStore } from '@/stores/products';
import Check from '@/pages/Pw/Shop/Components/Check.vue';
import { useRouter } from "vue-router";
import qs from 'qs';
import { parseQuery } from 'vue-router';

const router = useRouter()

const productStore = useProductsStore()
const { subCategories, species, categories } = storeToRefs(productStore)

const searchWord = ref<string>("")
const sliderPrice1 = ref<number>(0)
const sliderPrice2 = ref<number>(99999)

const search = (key: string, value: string | number | boolean | null, remplace: boolean = false) => {
  let newQuery
  if (!remplace) {
    newQuery = { ...router.currentRoute.value.query, [key]: value }
  } else {
    newQuery = { [key]: value }
  }
  const queryStr = qs.stringify(newQuery);
  const queryObj = parseQuery(queryStr);
  router.push({ query: queryObj })
  productStore.addFilter("page", 1)
  productStore.addFilter(key, value)
  productStore.fetchAll()
}

const resetFilter = () => {
  router.push({ query: {} })

}

</script>

<template>
  <div>



    <div class="axil-shop-sidebar">
      <div class="d-lg-none">
        <button class="sidebar-close filter-close-btn">
          <i class="fa-regular fa-circle-xmark"></i>
        </button>
      </div>
      <div class="toggle-list product-categories active">
        <div class="shop-submenu">
          <form action="#">
            <input type="search" placeholder="Busqueda" v-model="searchWord">
            <button type="button" class="btn btn-primary" @click.prevent="search('searchWord', searchWord)">
              <i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
      </div>
      <div class="toggle-list product-categories active">
        <h6 class="title">CATEGORIES</h6>
        <div class="shop-submenu">
          <ul>
            <li v-for="(item, index) in categories" :key="index">
              <div class="form-check">
                <VRow>
                  <VCol sm="1">
                    <VIcon icon="tabler-check" v-show="router.currentRoute.value.query.category_id == item.id"></VIcon>

                  </VCol>
                  <VCol>

                    <label style="cursor: pointer;" @click="search('category_id', item.id, true)">
                      {{ item.name }} &nbsp;
                      <span>({{ item.count }})</span>
                    </label>
                  </VCol>
                </VRow>
              </div>

              <!-- <a type="button" @click="search('category_id', item.id, true)">
                {{ item.name }} &nbsp;
                <span>({{ item.count }})</span>
              </a> -->
            </li>
          </ul>
        </div>
      </div>
      <button class="axil-btn btn-bg-primary" @click="search('category_id', null, true)">Limpiar filtro</button>
    </div>
    <!-- End .axil-shop-sidebar -->

  </div>
</template>  
