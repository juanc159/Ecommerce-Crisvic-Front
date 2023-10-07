<script setup lang="ts">

import { ref } from 'vue'
import { useToast } from '@/composables/useToast'
const toast = useToast()
// Store
import { ContactStore } from './Store/ContactStore'
const contactStore = ContactStore()
const { formulario } = storeToRefs(contactStore)
import { useAuthenticationStore } from '@/stores/authentication'
const authenticationStore = useAuthenticationStore()
const { empresa_id } = storeToRefs(authenticationStore)


import type IContactForm from './Interfaces/IContactForm'
import { storeToRefs } from 'pinia';
import { each, map } from 'jquery'
import PageHeaderArea from '@/components/PageHeaderArea.vue'
const errors = ref({});

const enviarMensaje = async () => {
  let exito = true
  if (!formulario.value.name) {
    exito = false
    errors.value.name = "El campo es obligatorio"
  }
  // Validar Email
  const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (!formulario.value.email || !validateEmail.test(formulario.value.email)) {
    exito = false
    errors.value.email = (!formulario.value.email) ? 'El campo es obligatorio' : 'El correo no es válido'
  }
  if (!formulario.value.subject_email) {
    exito = false
    errors.value.subject_email = "El campo es obligatorio"
  }
  if (!formulario.value.message) {
    exito = false
    errors.value.message = "El campo es obligatorio"
  }

  if (exito) {
    formulario.value.empresa_id = empresa_id.value
    const result = await contactStore.fetchSave()
  } else {
    console.log(errors.value)
    let sField = '';
    let nTime = 5000;
    Object.entries(errors.value).forEach(([clave, message]) => {
      switch (clave) {
        case 'name': sField = 'Nombre'; break;
        case 'email': sField = 'Correo electrónico'; break;
        case 'subject_email': sField = 'Asunto'; break;
        default: sField = 'Nombre'; break;
      }
      if (message !== null) {
        toast.toast(sField, message, 'info', nTime)
      }
      nTime += 2000
    });
    // errors.value.forEach( sError => {
    //   console.log( sError )
    // });
    // toast.toast('Éxito <br> asdasd', 'xxxxx', 'warning')
  }
}

</script>

<template>
  <div>
    <Ecommerce>

      <PageHeaderArea title="Contacta con nosotros" :breadcrumb="['Inicio', 'home', 'Contacto']"></PageHeaderArea>

      <!-- Start Contact Area  -->
      <div class="axil-contact-page-area axil-section-gap bg-color-white">
        <div class="container">
          <div class="axil-contact-page">
            <div class="row row--30">
              <div class="col-lg-8">
                <div class="contact-form">
                  <h3 class="title mb--10">Nos encantaría saber de usted..</h3>
                  <p>Si tiene excelentes productos que está fabricando o desea trabajar con nosotros, envíenos un correo.
                  </p>
                  <form id="contact-form" class="axil-contact-form">
                    <div class="row row--10">
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label for="contact-name">Nombre <span>*</span></label>
                          <input v-model="formulario.name" type="text" name="contact-name" id="contact-name">
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label for="contact-phone">Teléfono <span>*</span></label>
                          <input type="text" name="contact-phone" id="contact-phone">
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label for="contact-email">Correo <span>*</span></label>
                          <input type="email" v-model="formulario.email" name="contact-email" id="contact-email">
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label for="contact-email">Asunto <span>*</span></label>
                          <input type="email" v-model="formulario.subject_email" name="contact-email" id="contact-email">
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label for="contact-message">Mensaje</label>
                          <textarea v-model="formulario.message" name="contact-message" id="contact-message" cols="1"
                            rows="2"></textarea>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group mb--0">
                          <button name="submit" type="button" @click="enviarMensaje()" id="submit"
                            class="axil-btn btn-bg-primary">
                            Enviar mensaje</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="contact-location mb--40">
                  <h4 class="title mb--20">Dirección</h4>
                  <span class="address mb--20">Barrio Sucre parte Baja casa 1-53 y cuadra arriba de la urb.
                    Bajumbal</span>
                  <span class="phone">Teléfono: 0424-7401580 / 0424-7515985</span>
                  <span class="email">Correo: Crisvicakes@gmail.com</span>
                </div>
                <div class="opening-hour">
                  <h4 class="title mb--20">Horario de apertura:</h4>
                  <p> Lunes a Domingo 8am - 9pm </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Start Google Map Area  -->
          <div class="axil-google-map-wrap axil-section-gap pb--0">
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe width="1080" height="500" id="gmap_canvas"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247.07702289961583!2d-72.2089687!3d7.765165!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e666d9144008d5b%3A0xee4b102d3bbc56a6!2sCrisvic%20Cakes!5e0!3m2!1ses-419!2sco!4v1696088531754!5m2!1ses-419!2sco"></iframe>
              </div>
            </div>
          </div>
          <!-- End Google Map Area  -->
        </div>
      </div>
      <!-- End Contact Area  -->
    </Ecommerce>


  </div>
</template>

<style lang="scss">
/* stylelint-disable import-notation */
@import url("@/assets/main.scss");
</style>



<style>
.hover-link:hover {
  text-decoration: underline;
}
</style>
 
<route lang="yaml">
name: contact
meta:
  layout: blank
</route>
  