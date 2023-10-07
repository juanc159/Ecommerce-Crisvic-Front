<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSinglePageStore } from '@/stores/singlePage'
const singlePageStore = useSinglePageStore()
const { product } = storeToRefs(singlePageStore)
</script> 

<template>
  <div>
    <!--== Start Product Quick Wishlist Modal ==-->
    <div class="modal fade quick-view-product" id="action-WishlistModal" aria-hidden="true" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ product.like ? 'Añadida a' : 'Removida de' }} la lista de deseos!
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-center align-items-center flex-column">
              <img class="img-fluid rounded d-block" :src="product.image_principal.path"
                :style="{ width: '466', height: '320' }">
              <h4 class="my-3">{{ product.name }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--== End Product Quick Wishlist Modal ==-->
  </div>
</template>

<style lang="scss" scoped>
.quick-view-product .modal-dialog {
  max-inline-size: 500px !important;
}

.quick-view-product .modal-header {
  padding: 15px !important;
}

.quick-view-product .modal-body {
  padding: 15px;
}
</style>

 
