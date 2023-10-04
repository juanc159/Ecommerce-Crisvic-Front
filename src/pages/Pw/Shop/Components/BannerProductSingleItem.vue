<script lang="ts" setup>
import { useConfigGlobal } from '@/composables/useConfigGlobal'
const configGlobal = useConfigGlobal()

const props = defineProps({
    image:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    subTitle:{
        type:String,
        required:false,
        defauly:"",
    },
    href:{
        type:String,
        required:false,
        defauly:"#",
    },
})
</script>

<template>
    <div>
        <div class="banner-product-single-style2-item">
            <div class="thumb">
                <a :href="props.href">
                    <img :src="configGlobal.baseUrl +props.image" :style="{ width: '870px', height: '247px' }"  alt="Image-HasTech">
                </a>
            </div>
            <div class="content">
                <h5 v-if="props.subTitle" class="sub-title">{{props.subTitle}} </h5>
                <h5 class="title">{{props.title}}</h5>
                <a class="btn-theme-link" :href="props.href">Compra ahora</a>
            </div>
        </div>
    </div>
</template>