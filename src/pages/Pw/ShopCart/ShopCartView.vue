<script setup lang="ts">
import PageHeaderArea from '@/components/PageHeaderArea.vue';
import CartArea from '@/pages/Pw/ShopCart/Components/CartArea.vue';
</script>

<template>
  <Ecommerce>
    <main class="main-content">
      <PageHeaderArea title="Carrito de compra" :breadcrumb="['Inicio', 'home', 'Carrito de compra']">
      </PageHeaderArea>
      <CartArea></CartArea>
    </main>
  </Ecommerce>
</template>

<style lang="scss">
/* stylelint-disable import-notation */
@import url("@/assets/main.scss");
</style>

<route lang="yaml">
name: shopCart
meta:
  layout: blank
</route>
