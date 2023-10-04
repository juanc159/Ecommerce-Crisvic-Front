<script setup lang="ts">

import Loading from "@/components/Loading.vue";
import SliderSection from "@/pages/Pw/Home/Components/SliderSection.vue";
import ProductSection from "@/pages/Pw/Home/Components/ProductSection.vue";
import DividerSection from "@/pages/Pw/Home/Components/DividerSection.vue";
import ProductBannerSection from "@/pages/Pw/Home/Components/ProductBannerSection.vue";
import ProductCategorySection from "@/pages/Pw/Home/Components/ProductCategorySection.vue";


</script>

<template>
  <div>
    <Ecommerce>
      <Loading></Loading>
      <SliderSection></SliderSection>
      <ProductCategorySection></ProductCategorySection>
      <!-- <ProductBannerSection></ProductBannerSection> -->
      <ProductSection></ProductSection>
      <!-- <DividerSection></DividerSection> -->

    </Ecommerce>
  </div>
</template>
<style lang="scss">
@import url("../../../assets/main.scss");
</style>

<route lang="yaml">
path: /
name: home
meta:
  layout: blank
</route>
    
    

