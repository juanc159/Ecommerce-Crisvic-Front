<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useWompiStore } from '@/stores/wompi'
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';

  const route = useRoute()
  const wompiStore = useWompiStore()

  const {
    stateTransaction,
    loading
  } = storeToRefs(wompiStore)

  onMounted(() => {
    if(route.query.id) {
      wompiStore.getTransactionResponse(route.query.id)
    }
  })
</script>

<template>
  <div class="container fluid d-flex justify-content-center">
    <div class="card col-8">
      <h5 class="card-header">Estado de la transacción</h5>
      <div class="card-body text-center">
        <h5 class="card-title" v-if="stateTransaction == 'APPROVED'">Finalizada correctamente</h5>
        <h5 class="card-title" v-if="stateTransaction == 'DECLINED'">Ha sido rechazada</h5>
        <h5 class="card-title" v-if="stateTransaction == 'VOIDED'">Ha sido anulada</h5>
        <h5 class="card-title" v-if="stateTransaction == 'ERROR'">Ups... no se pudo completar el pago</h5>
        <h5 class="card-title" v-if="loading">Por favor espere...</h5>

        <p v-if="stateTransaction == 'APPROVED'">¡Gracias por su compra!</p>
        <RouterLink to="shop" class="btn btn-primary">Volver a la tienda</RouterLink>
      </div>
    </div>
  </div>
</template>
 