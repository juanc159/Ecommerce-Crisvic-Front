<script lang="ts" setup>
import InfoAreaVue from './Components/InfoArea.vue';
import ThumbnailArea from './Components/ThumbnailArea.vue';
import ProductQuickViewModal from "@/components/Modals/ProductQuickViewModal.vue";
import ProductQuickWishlistModal from "@/components/Modals/ProductQuickWishlistModal.vue";
import ProductQuickAddCartModal from "@/components/Modals/ProductQuickAddCartModal.vue";
</script>

<template>
  <div>
    <Ecommerce>

      <main class="main-wrapper">
        <!-- Start Shop Area  -->
        <div class="axil-single-product-area axil-section-gap pb--0 bg-color-white">
          <div class="single-product-thumb mb--40">
            <div class="container">
              <div class="row">
                <div class="col-lg-7 mb--40">
                  <ThumbnailArea></ThumbnailArea>
                </div>
                <div class="col-lg-5 mb--40">
                  <InfoAreaVue></InfoAreaVue>
                </div>
              </div>
            </div>
          </div>
          <!-- End .single-product-thumb -->

        </div>
        <!-- End Shop Area  -->

      </main>

    </Ecommerce>

    <ProductQuickViewModal></ProductQuickViewModal>
    <ProductQuickWishlistModal></ProductQuickWishlistModal>
    <ProductQuickAddCartModal></ProductQuickAddCartModal>
  </div>
</template>

<style lang="scss">
/* stylelint-disable import-notation */
@import url("@/assets/main.scss");
</style>

<route lang="yaml">
name: singlePage
meta:
  layout: blank
</route>

