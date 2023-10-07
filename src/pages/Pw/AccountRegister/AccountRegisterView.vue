<script lang="ts" setup>
import { useAuthenticationStore } from "@/stores/authentication";
import Error from "@/components/Error.vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import type IRegisterForm from "@/interfaces/Authentication/IRegisterForm";
import { onMounted } from "vue";

const errors = ref<IRegisterForm>({
  nombre: "",
  correo: "",
  password: "",
  telefono: "",
});


const authenticationStore = useAuthenticationStore()
const { formulario, directions, directionsErrors } = storeToRefs(authenticationStore)
const router = useRouter()

const register = async () => {
  errors.value = {
    nombre: "",
    correo: "",
    password: "",
    telefono: ""
  }
  let exito = true
  for (let index = 0; index < directions.value.length; index++) {
    const item = directions.value[index];
    if (item.name == "" || !item.name) {
      directionsErrors.value[index].nombre = "El campo es obligatorio"
      // item.name = ''
      exito = false
    }
    if (item.direccion == "" || !item.direccion) {
      directionsErrors.value[index].direccion = "El campo es obligatorio"
      // item.direccion = ''
      exito = false
    }
  }
  if (!formulario.value.nombre) {
    exito = false
    errors.value.nombre = "El campo es obligatorio"
  }
  // Validar Email
  const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (!formulario.value.correo || !validateEmail.test(formulario.value.correo)) {
    exito = false
    // Prueba si el correo cumple con la expresión regular
    errors.value.correo = (!formulario.value.correo) ? 'El campo es obligatorio' : 'El correo no es válido'
  }
  if (!formulario.value.password) {
    exito = false
    errors.value.password = "El campo es obligatorio"
  }
  if (!formulario.value.telefono) {
    exito = false
    errors.value.telefono = "El campo es obligatorio"
  }

  if (exito) {
    let data: { error?: any, status?: any } = {}
    if (route.query.mode) {
      data = await authenticationStore.update();
    } else {
      data = await authenticationStore.register();

    }

    if (data.status === 422) errors.value = data.error;  //muestra error del back 
    if (data.status === 200) {
      if (authenticationStore.shoppingCart.length > 0) router.push({ name: 'shopCart' })
      else router.push({ name: 'home' })
    }
  }
}

const route = useRoute()
onMounted(() => {
  if (route.query.mode) {
    authenticationStore.fetchInfo()
  }
})
</script>

<template>
  <div>
    <!--== Start My Account Area Wrapper ==-->
    <section class="account-area">
      <VContainer>
        <div class="register-form-content">
          <form action="#">
            <div class="row">
              <div class="col-12">
                <VTextField :counter="48" maxlength="48" required v-model="formulario.nombre"
                  :error-messages="errors['nombre']">
                  <template #label>
                    <b class="fs-6">Nombre&nbsp;<span class="text-warning">*</span></b>
                  </template>
                </VTextField>
                <!-- <div class="form-group">
                  <label>Nombre <span class="required">*</span></label>
                  <input class="form-control" v-model="formulario.nombre">
                  <Error v-if="errors.nombre">{{ errors['nombre'][0] }}</Error>
                </div> -->
              </div>
              <div class="col-12 mt-2">
                <VTextField type="email" :counter="48" maxlength="48" required v-model="formulario.correo"
                  :error-messages="errors['correo']">
                  <template #label>
                    <b class="fs-6">Correo electrónico&nbsp;<span class="text-warning">*</span></b>
                  </template>
                </VTextField>
                <!-- <div class="form-group">
                    <label>Email address <span class="required">*</span></label>
                    <input class="form-control" v-model="formulario.correo" type="email">
                    <Error v-if="errors['correo']">{{ errors['correo'] }}</Error>
                  </div> -->
              </div>
              <div class="col-12 mt-2" v-if="route.query.mode == 'edit'">
                <div class="form-group mb-0">
                  <label>Contraseña Anterior<span class="required">*</span></label>
                  <input class="form-control" v-model="formulario.lastPassword" type="password">
                  <Error v-if="errors['lastPassword']">{{ errors['lastPassword'] }}</Error>
                </div>
              </div>
              <div class="col-12 mt-2">
                <div class="form-group mb-0">
                  <label>Contraseña<span class="required">*</span></label>
                  <input class="form-control" v-model="formulario.password" type="password">
                  <Error v-if="errors['password']">{{ errors['password'] }}</Error>
                </div>
              </div>
              <div class="col-12 mt-2">
                <VTextField type="number" :counter="30" max="30" required v-model="formulario.telefono"
                  :error-messages="errors['telefono']">
                  <template #label>
                    <b class="fs-6">Teléfono&nbsp;<span class="text-warning">*</span></b>
                  </template>
                </VTextField>
                <!-- <div class="form-group">
                  <label>Teléfono <span class="required">*</span></label>
                  <input class="form-control" v-model="formulario.telefono">
                  <Error v-if="errors['telefono']">{{ errors['telefono'] }}</Error>
                </div> -->
              </div>
              <div class="col-12 mt-2 text-center">
                <button class="btn btn-outline-principal mb-4" type="button"
                  @click="authenticationStore.addDirection()">Agregar dirección&nbsp;&nbsp;<i
                    class="fa fa-plus fa-sm"></i></button>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Nombre</th>
                      <th>Dirección</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in directions" v-show="!item.delete">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <VTextField :counter="30" max="30" v-model="item.name"
                          :error-messages="directionsErrors[index].nombre"
                          @update:model-value="directionsErrors[index].nombre = ''" label="Nombre dirección">
                        </VTextField>
                      </td>
                      <td>
                        <VTextField :counter="30" max="30" v-model="item.direccion"
                          :error-messages="(directionsErrors[index].direccion !== null) ? directionsErrors[index].direccion : ''"
                          @update:model-value="directionsErrors[index].direccion = ''" label="Dirección">
                        </VTextField>
                      </td>
                      <td><button class="btn btn-danger" type="button" v-if="index != 0"
                          @click="authenticationStore.removeDirection(index, (route.query.mode) ? route.query.mode : '')">Borrar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 mt-2 text-center">
                <button class="btn btn-outline-principal w-75 fs-6 py-3 fw-bold" @click="register()"
                  v-if="route.query.mode == 'edit'">
                  Actualizar&nbsp;&nbsp;<i class="fa fa-chevron-right fa-sm"></i>
                </button>
                <button class="btn btn-outline-principal w-75 fs-6 py-3 fw-bold" @click="register()"
                  v-if="route.query.mode !== 'edit'">
                  Regístrate&nbsp;&nbsp;<i class="fa fa-chevron-right fa-sm"></i>
                </button>
                <!-- <a class="btn-register" @click="register()">Register</a> -->
              </div>
            </div>
          </form>
        </div>
      </VContainer>
    </section>
    <!--== End My Account Area Wrapper ==-->
  </div>
</template>
