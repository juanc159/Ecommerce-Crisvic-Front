<script lang="ts" setup>
import { useConfigGlobal } from '@/composables/useConfigGlobal';
import { useAuthenticationStore } from '@/stores/authentication'
import { useRoute } from 'vue-router';
const authenticationStore = useAuthenticationStore()
const configGlobal = useConfigGlobal()
const route = useRoute()
const props = defineProps({
  class: {
    type: String
  },
  textButton: {
    type: String
  },
  iconButton: {
    type: String
  },
})
 

</script>

<template>
  <div>
    <form action="https://checkout.wompi.co/p/" method="GET">
      <!-- OBLIGATORIOS -->
      <input type="hidden" name="public-key" :value="configGlobal.publicKeyWompi" />
      <input type="hidden" name="currency" value="COP" />
      <input type="hidden" name="amount-in-cents" :value="authenticationStore.subTotalProductsShoppingCart+ '00'" />
      <input type="hidden" name="reference" :value="authenticationStore.referenceWompi" />
      <input type="hidden" name="redirect-url" :value="configGlobal.webURL + 'Wompi?mode=notification'" />
      <!-- OPCIONALES -->
      <!-- <input type="hidden" name="signature:integrity" value="FIRMA_DE_INTEGRIDAD" />
      <input type="hidden" name="tax-in-cents:vat" value="IVA_EN_CENTAVOS" />
      <input type="hidden" name="tax-in-cents:consumption" value="IMPOCONSUMO_EN_CENTAVOS" />
      <input type="hidden" name="customer-data:email" value="CORREO_DEL_PAGADOR" />
      <input type="hidden" name="customer-data:full-name" value="NOMBRE_DEL_PAGADOR" />
      <input type="hidden" name="customer-data:phone-number" value="NUMERO_DE_TELEFONO_DEL_PAGADOR" />
      <input type="hidden" name="customer-data:legal-id" value="DOCUMENTO_DE_IDENTIDAD_DEL_PAGADOR" />
      <input type="hidden" name="customer-data:legal-id-type" value="TIPO_DEL_DOCUMENTO_DE_IDENTIDAD_DEL_PAGADOR" />
      <input type="hidden" name="shipping-address:address-line-1" value="DIRECCION_DE_ENVIO" />
      <input type="hidden" name="shipping-address:country" value="PAIS_DE_ENVIO" />
      <input type="hidden" name="shipping-address:phone-number" value="NUMERO_DE_TELEFONO_DE_QUIEN_RECIBE" />
      <input type="hidden" name="shipping-address:city" value="CIUDAD_DE_ENVIO" />
      <input type="hidden" name="shipping-address:region" value="REGION_DE_ENVIO" /> -->
      <button :class="props.class" style="width: 100% !important;" type="submit">
        {{props.textButton}}&nbsp;&nbsp;
        <i v-if="iconButton" :class="iconButton"></i>
      </button>
    </form>
  </div>
</template>

<style scoped></style>
  