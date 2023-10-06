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
  productStore.addFilter(key, value)
  productStore.fetchAll()
}

const aaa = ref([])
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
                <input :id="'radio' + item.id" :name="'radio'" v-model="aaa" @click="search('category_id', item.id, true)"
                  class="form-check-input" type="radio">
                <label class="form-check-label" :for="'radio' + item.id">
                  {{ item.name }} &nbsp;
                  <span>({{ item.count }})</span>
                </label>
              </div>

              <!-- <a type="button" @click="search('category_id', item.id, true)">
                {{ item.name }} &nbsp;
                <span>({{ item.count }})</span>
              </a> -->
            </li>
          </ul>
        </div>
      </div>
      <div class="toggle-list product-price-range active">
        <h6 class="title">SUB CATEGORIAS</h6>
        <div class="shop-submenu">
          <ul>
            <li v-for="(item, index) in subCategories" :key="index">
              <a type="button" @click="search('subCategory_id', item.id, true)">
                {{ item.name }} &nbsp;
                <span>({{ item.count }})</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button class="axil-btn btn-bg-primary">All Reset</button>
    </div>
    <!-- End .axil-shop-sidebar -->

  </div>
</template>  
