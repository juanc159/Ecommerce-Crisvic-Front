<script lang="ts" setup>
import { useCategoriesStore } from '@/stores/categories';
import { storeToRefs } from 'pinia';
import ProductCategoryItem from '@/pages/Pw/Home/Components/ProductCategoryItem.vue';
import { useProductsStore } from '@/stores/products'
import { useSubCategoriesStore } from "@/stores/subCategories";
import SubCategoryItem from '@/pages/Pw/SubCategory/Components/SubCategoryItem.vue';
import { useRouter } from "vue-router";
import { onMounted } from 'vue';
const subCategoriesStore = useSubCategoriesStore()
const { subCategories } = storeToRefs(subCategoriesStore)

const productsStore = useProductsStore()
const { filter } = storeToRefs(productsStore)

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)
categoriesStore.fetchAll();
const router = useRouter()

onMounted(() => {
  subCategoriesStore.fetchAll()
})
</script>

<template>
  <div>
    <!-- Start Category Area  -->
    <div class="how-to-sell-area axil-section-gap">
      <div class="container">
        <div class="section-title-wrapper">
          <span class="title-highlighter highlighter-primary">
            <i class="fa-solid fa-tag"></i>
            Tags
          </span>
          <h2 class="title">Categorias</h2>
        </div>
        <div
          class="row row-cols-xl-4 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 row-cols-1 row--20 justify-content-center">
          <ProductCategoryItem :category="item" v-for="(item, index) in categories" :key="index" />
        </div>
      </div>
    </div>
    <!-- End Category Area  -->
  </div>
</template>
<style scoped>
.axil-section-gap {
  padding-block: 20px !important;
  padding-inline: 0 !important;
}

.section-title-wrapper {
  margin-block-end: 0;
  padding-inline-end: 50px;
}
</style>
