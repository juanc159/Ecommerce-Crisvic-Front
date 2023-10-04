<script lang="ts" setup>
import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer/FooterView.vue";
import AsideCart from "@/components/AsideCart.vue"

import { usePreloadStore } from "@/stores/usePreloadStore"

import { useSkins } from '@core/composable/useSkins'
import { useThemeConfig } from '@core/composable/useThemeConfig'

const preloadStore = usePreloadStore()
const { isLoading } = storeToRefs(preloadStore)

</script>

<template>
  <div>
    <div v-show="!isLoading">
      <Header></Header>
      <main class="main-wrapper">
        <AsideCart></AsideCart>
        <slot></slot>

        <Footer></Footer>
      </main>
    </div>
  </div>
</template>
 
