<script lang="ts" setup>
import { Navigation, Pagination, Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/bundle";



import { storeToRefs } from "pinia";
import { useSinglePageStore } from '@/stores/singlePage'
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import '@/assets/js/swiper.min.js'
import { ref } from "vue";

const configGlobal = useConfigGlobal()

const singlePageStore = useSinglePageStore()
const { product } = storeToRefs(singlePageStore)
const imagenSelected = product.value.image
</script>

<template>
    <div>
        <!--== Start Product Thumbnail Area ==-->
        <div class="product-single-thumb ">
            <div class="swiper single-product-thumb single-product-thumb-slider">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"  > 
                        <a class="lightbox-image" data-fancybox="gallery" >
                            <img :src="configGlobal.baseUrl + imagenSelected" :style="{ width: '570px', height: '675px' }">
                        </a>
                    </div>
                </div>
            </div>

            <div class="product-single-swiper-wrap position-relative">
                <div class="swiper single-product-nav single-product-nav-slider"> 
                    <Swiper :slides-per-view="3" :space-between="10" :modules="[Navigation, Virtual]" navigation
                        :pagination="{ clickable: true, dynamicBullets: true }" grab-cursor>
                        <SwiperSlide v-for="(item, index) in product.images" :key="index" :virtual-index="index">
                            <img @click="imagenSelected = item.src" :src="configGlobal.baseUrl + item.src" :style="{ width: '127px', height: '127px' }">
                        </SwiperSlide> 
                    </Swiper> 
                </div> 
            </div>
        </div>
        <!--== End Product Thumbnail Area ==-->
    </div>
</template>

<style scoped></style>