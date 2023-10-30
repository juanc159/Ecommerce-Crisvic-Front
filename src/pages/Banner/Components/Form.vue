<script lang="ts" setup  >
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
// --- --- --- Store --- --- ---
import { useCrudBannerStore } from '@/pages/Banner/Store/useCrudBannerStore';
import { useImageUpload } from '@/composables/useImageUpload';
const storeBanner = useCrudBannerStore()
const { action, formulario } = storeToRefs(storeBanner)

// --- --- END Store --- --- ---

// File
const archive = ref(useImageUpload())
const aExtImage = ['jpg', 'jpeg', 'png']
archive.value.allowedExtensions = aExtImage

const errors = ref<Array<string>>([])

const formValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  archive.value.key++
  storeBanner.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back')
    storeBanner.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeBanner.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

const addFile = (e: Event) => {
  archive.value.handleImageSelected(e)
  setTimeout(() => {
    formulario.value.path = archive.value.imageFile

  }, 1000)
}

</script>

<template>
  <div>

    <HeaderAlertView sub-title="Cargo" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen" />

    <VContainer class="bg-vwhite" fluid>
      <VForm ref="formValidation" lazy-validation>
        <VRow>
          <VCol cols="12" sm="3">
            <VFileInput accept="image/*" :rules="[requiredValidator]" :key="archive.key" @change="addFile($event)"
              @click:clear="archive.clearData">
              <template #label>
                Imagen&nbsp;<b class="text-warning">*</b>
              </template>
            </VFileInput>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12">
            <VImg :src="archive.imageUrl ?? formulario.path"></VImg>
            <VCard>
            </VCard>
          </VCol>
        </VRow>
      </VForm>
      <VDivider class="border-opacity-75 my-4" color="csecundary" :thickness="3" />
      <VRow class="pt-0">
        <VCol cols="12" class="text-center">
          <VTooltip text="Guardar" location="top">
            <template v-slot:activator="{ props }">
              <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="submitForm()">
                Guardar&nbsp;
                <VIcon size="large" color="success" icon="mdi-content-save-outline" />
              </VBtn>
            </template>
          </VTooltip>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
