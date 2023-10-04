<script setup lang="ts">
import PageHeaderArea from '@/components/PageHeaderArea.vue';
import AreaSubCategory from './Components/AreaSubCategory.vue';

import { onMounted } from 'vue';

onMounted(() => {
  // subCategoriesStore.fetchAll();
}) 
</script>
 
<template>
  <main class="main-content">
    <PageHeaderArea title="Sub categorias" :breadcrumb="['Inicio', 'home', '//', 'Sub categorias']">
    </PageHeaderArea>
    <AreaSubCategory></AreaSubCategory>
  </main>
</template>
