<script setup lang="ts">

import Form from '@/pages/Banner/Components/Form.vue';
import TableList from '@/pages/Banner/Components/TableList.vue';
import { useCrudBannerStore } from '@/pages/Banner/Store/useCrudBannerStore';
const storeBanner = useCrudBannerStore()
const { typeAction } = storeToRefs(storeBanner)

onUnmounted(() => {
  storeBanner.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeBanner.keyList" />
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: banner.index
</route>

