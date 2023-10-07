<script setup lang="ts">
import PageHeaderArea from '@/components/PageHeaderArea.vue';
import WishlistArea from '@/pages/Pw/ShopWishlist/Components/WishlistArea.vue';
</script>

<template>
  <Ecommerce>
    <main class="main-content">
      <PageHeaderArea title="Favoritos" :breadcrumb="['Inicio', 'home', 'Lista de deseos']"></PageHeaderArea>
      <WishlistArea></WishlistArea>
    </main>
  </Ecommerce>
</template>
 
<style lang="scss">
/* stylelint-disable import-notation */
@import url("@/assets/main.scss");
</style>

<route lang="yaml">
name: shopWishlist
meta:
  layout: blank
</route>
