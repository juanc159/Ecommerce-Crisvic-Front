<script setup lang="ts">
import PageHeaderArea from '@/components/PageHeaderArea.vue';
import BlogArea from '@/pages/Pw/ShopCart/Components/BlogArea.vue';
</script>

<template>
  <Ecommerce>
    <main class="main-content">
      <PageHeaderArea title="Carrito de compra" :breadcrumb="['Inicio', 'home', '//', 'Carrito de compra']">
      </PageHeaderArea>
      <BlogArea></BlogArea>
    </main>
  </Ecommerce>
</template>

<route lang="yaml">
name: shopCart
meta:
  layout: blank
</route>
