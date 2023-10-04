<script lang="ts" setup>
import { storeToRefs } from "pinia";
import SubCategoryItem from "./SubCategoryItem.vue";
import { useSubCategoriesStore } from "@/stores/subCategories";
const subCategoriesStore = useSubCategoriesStore()
const { subCategories } = storeToRefs(subCategoriesStore)
</script>

<template>
  <div>
    <!--== Start Product Category Area Wrapper ==-->
    <section class="product-area product-category-area bg-color-f2">
      <div class="container"> 
        <div
          class="row d-flex justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gutter-43">
          <div class="col" v-for="(item, index) in subCategories" :key="index">
            <SubCategoryItem to="shop" :subCategory="item" />
          </div>
        </div>
      </div>
    </section>
    <!--== End Product Category Area Wrapper ==-->
  </div>
</template> 