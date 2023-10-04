<script lang="ts" setup>
  import { onMounted,computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useOrderStore } from '@/stores/orders'

  const orderStore = useOrderStore()

  const {
    orderSelected,
    typeAction
  } = storeToRefs(orderStore)


  const total_price = computed(() => {
    if(orderSelected.value) {
      return orderSelected.value.products.reduce((accum, item)=> {
        return accum + Number(item.pivot.amount)
      },0)
    }
    return 0
  })
  const total_cuantity = computed(() => {
    if(orderSelected.value) {
      return orderSelected.value.products.reduce((accum, item)=> {
        return accum + Number(item.pivot.cuantity)
      },0)
    }
  })
  const total_general = computed(() => {
    if(orderSelected.value) {
      return orderSelected.value.products.reduce((accum, item)=> {
        return accum + Number(item.pivot.cuantity) * Number(item.pivot.amount)
      },0)
    }
  })
</script>

<template>
  <div>
  <section class="intro">
    <div class="mask d-flex flex-column align-items-center h-100">
      <div class="container">
        <div class="row justify-content-center">
          <h2>Productos</h2>
          <button class="btn btn-success" @click="typeAction = 'order'">Volver</button>
          <div class="col-12 mt-2">
            <div class="card mask-custom">
              <div class="card-body">
                <div class="table-responsive bg-white" data-mdb-perfect-scrollbar="true" style="position: relative; height: 365px;">
                  <table class="table text-white mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">descripción</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in orderSelected?.products">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.descripcion }}</td>
                        <td>{{ item.pivot.amount }}</td>
                        <td>{{ item.pivot.cuantity }}</td>
                        <td class="fw-bolder">{{ Number(item.pivot.cuantity) * Number(item.pivot.amount) }}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr v-if="orderSelected?.products.length == 0">
                        <td colspan="10" class="text-center">
                          <span>No hay ordenes para mostrar</span>
                        </td>
                      </tr>
                      <tr class="table-active">
                        <td colspan="3" class="fw-bolder">
                          Total general:
                        </td>
                        <td class="fw-bolder">
                          {{ total_price }}
                        </td>
                        <td class="fw-bolder">
                          {{ total_cuantity }}
                        </td>
                        <td class="fw-bolder">
                          {{ total_general }}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  </div>
</template>

<style scoped>
</style>