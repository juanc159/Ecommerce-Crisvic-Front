<script lang="ts" setup>
import { useAuthenticationStore } from "@/stores/authentication";
import Error from "@/components/Error.vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
import type IRegisterForm from "@/interfaces/Authentication/IRegisterForm";


const authenticationStore = useAuthenticationStore()
const { formulario } = storeToRefs(authenticationStore)
const router = useRouter()

const errors = ref<IRegisterForm>({
  nombre: "",
  correo: "",
  password: "",
  telefono: ""
});

const login = async () => {
  errors.value = {
    nombre: "",
    correo: "",
    password: "",
    telefono: ""
  }
  let exito = true
  if (!formulario.value.correo) {
    exito = false
    errors.value.correo = "el campo es obligatorio"
  }
  if (!formulario.value.password) {
    exito = false
    errors.value.password = "el campo es obligatorio"
  }

  if (exito) {
    const data = await authenticationStore.login()
    if (data.status === 422) errors.value = data.error; //muestra error del back 
    if (data.status === 200) {
      if (authenticationStore.shoppingCart.length > 0) {
        router.push({ name: 'shopCart' })
      }
      else {
        router.push({ name: 'home' })
      }
    }
  }
}
</script>

<template>
  <div>
    <!--== Start My Account Area Wrapper ==-->
    <section class="account-area">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="login-form-content">
              <form action="#">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label for="username">Correo <span class="required">*</span></label>
                      <input id="username" class="form-control" v-model="formulario.correo" type="email">
                      <Error v-if="errors['correo']">{{ errors['correo'][0] }}</Error>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="password">Password <span class="required">*</span></label>
                      <input id="password" class="form-control" v-model="formulario.password" type="password">
                      <Error v-if="errors['password']">{{ errors['password'][0] }}</Error>
                    </div>
                  </div>
                  <div class="col-12 text-center">
                    <a class="btn btn-outline-principal w-75 fs-6 py-3 fw-bold" @click="login()">
                      Iniciar sesión&nbsp;&nbsp;<i class="fa fa-sign-in"></i>
                    </a>
                    <!-- <button type="button" class="btn-login" @click="login()">Login</button> -->
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--== End My Account Area Wrapper ==-->
  </div>
</template>
