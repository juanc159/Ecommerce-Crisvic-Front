<script lang="ts" setup>
import { useAuthenticationStore } from "@/stores/authentication";
import { storeToRefs } from "pinia";

const authenticationStore = useAuthenticationStore();
const { user, directions } = storeToRefs(authenticationStore)
</script>

<template>
  <section class="h-100 gradient-custom-2">
    <div class=" py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-9 col-xl-7">
          <div class="card">
            <div class="rounded-top text-white d-flex flex-row" style=" height: 150px;background-color: #701b63;">
              <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
              </div>
              <div class="ms-3 text-white" style="margin-top: 50px;">
                <h5 class="text-white">{{ user?.nombre }}</h5>
                <p>{{ user?.correo }}</p>
              </div>
            </div>
            <div class="p-4 text-black" style="height: 85px;background-color: #f8f9fa;">
              <div class="d-flex justify-content-end text-center py-1 position-relative">
                <div class="position-absolute start-0">
                  <RouterLink to="AccountRegister?mode=edit" type="button" class="btn btn-outline-dark"
                    data-mdb-ripple-color="white">
                    Editar perfil
                  </RouterLink>
                </div>
                <div class="position-absolute end-0">
                  <RouterLink to="SeeOrders" type="button" class="btn btn-outline-dark" data-mdb-ripple-color="white">
                    Ver mis ordenes
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="card-body p-4 text-black">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <p class="lead fw-bold mb-0">Direcciones: </p>
              </div>
              <div class="row g-2 pa-5">
                <table class="table table-striped mb-0">
                  <thead style="background-color: #002d72;">
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Dirección</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in directions">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.direccion }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
