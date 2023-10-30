<script lang="ts" setup>
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import InfoArea from '@/pages/Pw/SinglePage/Components/InfoArea.vue';
import { storeToRefs } from 'pinia';
import { useSinglePageStore } from '@/stores/singlePage'
const singlePageStore = useSinglePageStore()
const { product } = storeToRefs(singlePageStore)

const changeImg = (img: string) => {
  product.value.image_principal.path = img
}



</script> 

<template>
  <div>

    <!-- Product Quick View Modal Start -->
    <div class="modal fade quick-view-product" id="action-QuickViewModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              {{ product.name }}
            </h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="single-product-thumb">
              <div class="row">
                <div class="col-lg-7 mb--40">
                  <div class="row">
                    <div class="col-lg-10 order-lg-2">
                      <div
                        class="single-product-thumbnail product-large-thumbnail axil-product thumbnail-badge zoom-gallery">
                        <div class="thumbnail">
                          <img :src="product.image_principal?.path">
                          <!-- <div class="label-block label-right">
                            <div class="product-badget">20% OFF</div>
                          </div> -->
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 order-lg-1">
                      <div class="product-small-thumb small-thumb-wrapper" v-for="(item, index) in product.images"
                        :key="index" @click="changeImg(item.path)">
                        <div class="small-thumb-img">
                          <img :src="item.path">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-5 mb--40">
                  <InfoArea :all-info="false"></InfoArea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product Quick View Modal End -->
  </div>
</template>
 
<style lang="scss" scoped>
.quick-view-product .modal-header {
  padding: 10px !important;
}

.modal-title {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
}
</style>

 
