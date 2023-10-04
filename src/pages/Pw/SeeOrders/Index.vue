<script lang="ts" setup>
import { useOrderStore } from '@/stores/orders'
import Order from '@/pages/Pw/SeeOrders/Components/Order.vue'
import ProductInOrder from '@/pages/Pw/SeeOrders/Components/ProductInOrder.vue'
import { storeToRefs } from 'pinia'

const orderStore = useOrderStore()

const {
  orders,
  typesState,
  typeSelected,
  typeAction
} = storeToRefs(orderStore)
</script>

<template>
  <div>
    <Order v-if="typeAction == 'order'" />
    <ProductInOrder v-if="typeAction !== 'order'" />
  </div>
</template>

<style scoped></style>
