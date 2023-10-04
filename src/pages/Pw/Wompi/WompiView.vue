<script setup lang="ts">
import FormPay from "@/pages/Pw/Wompi/Components/FormPay.vue";
import ResponsePay from "@/pages/Pw/Wompi/Components/ResponsePay.vue";
import { vModelDynamic } from "vue";

import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from "vue-router";

const mode = ref('FormPay')
const route = useRoute()

onMounted(() => {
  // subCategoriesStore.fetchAll();
  if (route.query.mode == 'notification') {
    mode.value = 'notification'
  }
}) 
</script>

<template>
  <main class="main-content">
    <FormPay v-if="mode == 'FormPay'"></FormPay>
    <ResponsePay v-if="mode == 'notification'"></ResponsePay>
  </main>
</template>
