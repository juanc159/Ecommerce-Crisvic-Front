<script setup lang="ts">

import Form from '@/pages/Subcategory/Components/Form.vue';
import TableList from '@/pages/Subcategory/Components/TableList.vue';
import { useCrudSubcategoryStore } from '@/pages/Subcategory/Store/useCrudSubcategoryStore';
const storeSubcategory = useCrudSubcategoryStore()
const { typeAction } = storeToRefs(storeSubcategory)

onUnmounted(() => {
  storeSubcategory.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeSubcategory.keyList" />
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: subcategory.index
</route>

