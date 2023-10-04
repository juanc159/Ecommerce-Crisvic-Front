<script lang="ts" setup>
import { useSpeciesStore } from '@/stores/species';
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

const speciesStore = useSpeciesStore()
const { species } = storeToRefs(speciesStore)
speciesStore.fetchAll();
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
          <ProductCategoryItem :category="item" v-for="(item, index) in species" :key="index" />
        </div>
      </div>
    </div>
    <!-- End Category Area  -->
  </div>
</template>
<style scoped>
.axil-section-gap {
  padding: 20px 0 !important
}

.section-title-wrapper {
  margin-bottom: 0px;
  padding-right: 50px;
}
</style>
