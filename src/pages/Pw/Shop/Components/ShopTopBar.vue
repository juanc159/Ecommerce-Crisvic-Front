<script lang="ts" setup>
import { useProductsStore } from '@/stores/products';
import { storeToRefs } from 'pinia';
const productStore = useProductsStore()
const { totalPage,totalData, products } = storeToRefs(productStore)
</script>

<template>
    <div>
        <div class="shop-top-bar">
            <div class="shop-top-left">
                <p class="pagination-line">{{ products.length }} encontrado de {{ totalData }}</p>
            </div>
            <div class="shop-top-center">
                <nav class="product-nav">
                    <div class="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-grid-tab" data-bs-toggle="tab" data-bs-target="#nav-grid"
                            type="button" role="tab" aria-controls="nav-grid" aria-selected="true"><i
                                class="fa fa-th"></i></button>
                        <button class="nav-link" id="nav-list-tab" data-bs-toggle="tab" data-bs-target="#nav-list"
                            type="button" role="tab" aria-controls="nav-list" aria-selected="false"><i
                                class="fa fa-list"></i></button>
                        <button class="nav-link" id="nav-grid2-tab" data-bs-toggle="tab" data-bs-target="#nav-grid2"
                            type="button" role="tab" aria-controls="nav-grid2" aria-selected="false"><i
                                class="fa fa-th-large"></i></button>
                    </div>
                </nav>
            </div>
            <!-- <div class="shop-top-right">
                <div class="shop-sort">
                    <span>Sort By :</span>
                    <select class="form-select" aria-label="Sort select example">
                        <option selected>Default</option>
                        <option value="1">Popularity</option>
                        <option value="2">Average Rating</option>
                        <option value="3">Newsness</option>
                        <option value="4">Price Low to High</option>
                    </select>
                </div>
            </div> -->
        </div>
    </div>
</template>
 