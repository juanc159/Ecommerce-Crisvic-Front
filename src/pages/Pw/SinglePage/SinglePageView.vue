<script lang="ts" setup>
import InfoAreaVue from './Components/InfoArea.vue';
import ThumbnailArea from './Components/ThumbnailArea.vue';
import ProductQuickViewModal from "@/components/Modals/ProductQuickViewModal.vue";
import ProductQuickWishlistModal from "@/components/Modals/ProductQuickWishlistModal.vue";
import ProductQuickAddCartModal from "@/components/Modals/ProductQuickAddCartModal.vue";
</script>

<template>
  <div>
    <!--== Start Product Single Area Wrapper ==-->
    <section class="product-area product-single-area">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="product-single-item">
              <div class="row">
                <div class="col-lg-6">
                  <ThumbnailArea></ThumbnailArea>
                </div>
                <div class="col-lg-6">
                  <InfoAreaVue></InfoAreaVue>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--== End Product Single Area Wrapper ==-->

    <ProductQuickViewModal  ></ProductQuickViewModal>
    <ProductQuickWishlistModal  ></ProductQuickWishlistModal>
    <ProductQuickAddCartModal  ></ProductQuickAddCartModal>
  </div>
</template>

<style scoped></style>