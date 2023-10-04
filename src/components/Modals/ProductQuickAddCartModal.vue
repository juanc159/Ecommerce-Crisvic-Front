<script lang="ts" setup>
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import { useSinglePageStore } from '@/stores/singlePage'
import { storeToRefs } from 'pinia';
const singlePageStore = useSinglePageStore()
const { product } = storeToRefs(singlePageStore)
const configGlobal = useConfigGlobal()

const props = defineProps({
  product: {
    type: Object,
    required: false,
  },
  href: {
    type: String,
    required: false,
    default: "#",
  }
})  
</script> 

<template>
  <div>
    <!--== Start Product Quick Add Cart Modal ==-->
    <aside class="product-action-modal modal fade" id="action-CartAddModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="product-action-view-content">
              <button type="button" class="btn-close" data-bs-dismiss="modal">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <div class="modal-action-messages">
                <i class="pe-7s-check"></i> Añadido al carrito con éxito!
              </div>
              <div class="modal-action-product">
                <div class="thumb">
                  <img :src="configGlobal.baseUrl + product.image" :style="{ width: '466', height: '320' }">
                </div>
                <h4 class="product-name"><a :href="href">{{ product.nombre }}</a></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <!--== End Product Quick Add Cart Modal ==-->
  </div>
</template>