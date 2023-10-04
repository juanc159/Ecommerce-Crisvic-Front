<script setup lang="ts">

import Form from '@/pages/Category/Components/Form.vue';
import TableList from '@/pages/Category/Components/TableList.vue';
import { useCrudCategoryStore } from '@/pages/Category/Store/useCrudCategoryStore';
const storeCategory = useCrudCategoryStore()
const { typeAction } = storeToRefs(storeCategory)

onUnmounted(() => {
  storeCategory.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeCategory.keyList" />
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: category.index
</route>

