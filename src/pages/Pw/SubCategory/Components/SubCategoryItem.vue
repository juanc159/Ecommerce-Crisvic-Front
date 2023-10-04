<script lang="ts" setup>
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import { useProductsStore } from '@/stores/products'
import { useRouter } from "vue-router";
import qs from 'qs';
import { parseQuery } from 'vue-router';
import { ref } from 'vue';

const configGlobal = useConfigGlobal()
const productsStore = useProductsStore()
const router = useRouter()
const queryObj = ref()
const props = defineProps({
  subCategory: {
    type: Object,
    required: true,
  },
  to: {
    type: String,
    required: false,
    default: "",
  }
})

const search = (key: string, value: string | number | boolean | null) => {
  const newQuery = { ...router.currentRoute.value.query, [key]: value }
  const queryStr = qs.stringify(newQuery);
  queryObj.value = parseQuery(queryStr);
  router.push({ name: props.to, query: queryObj.value })
  productsStore.addFilter(key, value)
  productsStore.fetchAll()
}
</script>

<template>
  <div>
    <RouterLink @click="search('subCategory_id', props.subCategory.id)" :to="{}">
      <!--== Start Product Category Item ==-->
      <div class="product-category-item">
        <div class="thumb">
            <img :src="configGlobal.baseUrl + props.subCategory.imagen" :style="{ width: '200px', height: '200px' }"
              alt="Image-HasTech">
        </div>
        <div class="content">
          <h3 class="title">
            <RouterLink :to="{ name: props.to }">
              {{ props.subCategory.nombre }}
            </RouterLink>
          </h3>
        </div>
      </div>
    <!--== End Product Category Item ==-->
    </RouterLink>

  </div>
</template>