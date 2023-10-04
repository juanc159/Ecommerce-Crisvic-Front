<script lang="ts" setup>
import bg1 from "@/assets/img/photos/bg1.webp";
import type { RouteRecordName } from "vue-router";
const props = defineProps({
    image: {
        type: String,
        default: bg1,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    breadcrumb: {
        type: Array,
        required: true,
    },
})
</script>

<template>
    <div> 
        <!-- Start Breadcrumb Area  -->
        <div class="axil-breadcrumb-area">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-8">
                        <div class="inner">
                            <ul class="axil-breadcrumb">
                                <li class="axil-breadcrumb-item">
                                    <RouterLink :to="{ name: props.breadcrumb[1] as RouteRecordName }">
                                        {{ props.breadcrumb[0] }}
                                    </RouterLink>
                                </li>
                                <li class="separator"></li>
                                <li class="axil-breadcrumb-item active" aria-current="page">
                                    {{ props.breadcrumb[2] }}
                                </li>
                            </ul>
                            <h1 class="title">{{ props.title }}</h1>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <!-- End Breadcrumb Area  -->
    </div>
</template> 