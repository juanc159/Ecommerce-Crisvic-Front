<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/orders'

const orderStore = useOrderStore()

const {
  orders,
  typesState,
  typeSelected,
  orderSelected,
  typeAction
} = storeToRefs(orderStore)

const countProducts = computed(() => {
  return (i: number) => {
    const productInOrder: any = orders.value[i]
    return productInOrder.products.reduce((accum: any, item: any) => {
      return accum + Number(item.pivot.cuantity) * Number(item.pivot.amount)
    }, 0)
  }
})

const handleUpdate = () => {
  orderStore.getOrders()
}

const handleSelect = (i: number) => {
  let order: any = orders.value[i]
  orderSelected.value = order
  typeAction.value = 'product'
}

onMounted(async () => {
  await orderStore.getOrders()
})
</script>

<template>
  <div>
    <section class="intro">
      <div class="mask d-flex flex-column align-items-center h-100">
        <div class="my-4">
          <div class="row justify-content-center">
            <h2>Mis ordenes</h2>
            <div class="col-12">
              <div class="card mask-custom">
                <div class="card-body">
                  <div class="row my-4">
                    <div class="cols-8">
                      <div class="form-group">
                        <label>filtrar por Estado</label>
                        <select class="form-control" v-model="typeSelected" style="cursor: pointer;"
                          @change="handleUpdate">
                          <option :value="null">Todos</option>
                          <option v-for="item in  typesState" :value="item.id">{{ item.name }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive bg-white" data-mdb-perfect-scrollbar="true"
                    style="position: relative; height: 365px;">
                    <table class="table text-white mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Item</th>
                          <th scope="col">Cantidad de productos</th>
                          <th scope="col">Dirección</th>
                          <th scope="col">Fecha de creación</th>
                          <th scope="col">Fecha de entrega</th>
                          <th scope="col">Total</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in orders">
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item.products.length }}</td>
                          <td>{{ item.customer_address_name }} - {{ item.customer_address }}</td>
                          <td>{{ new Date(item.created_at).getFullYear() }}/{{ new Date(item.created_at).getMonth() }}/{{
                            new Date(item.created_at).getDate() }}</td>
                          <td>{{ new Date(item.deliver_date).getFullYear() }}/{{ new Date(item.deliver_date).getMonth()
                          }}/{{ new Date(item.deliver_date).getDate() }}</td>
                          <td class="fw-bolder">${{ countProducts(index) }}</td>
                          <td class="badge">{{ item.state_name }}</td>
                          <td><button class="btn btn-success" @click="handleSelect(index)">Ver Productos</button></td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr v-if="orders.length == 0">
                          <td colspan="10" class="text-center">
                            <span>No hay ordenes para mostrar</span>
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

<style scoped></style>
