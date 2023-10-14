<script lang="ts" setup  >
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
// --- --- --- Store --- --- ---
import { useCrudCategoryStore } from '@/pages/Category/Store/useCrudCategoryStore';
import { useImageUpload } from '@/composables/useImageUpload';
const storeCategory = useCrudCategoryStore()
const { action, formulario } = storeToRefs(storeCategory)

// --- --- END Store --- --- ---

const errors = ref<Array<string>>([])

const formValidation = ref<VForm>()

// File
const archive = ref(useImageUpload())
const aExtImage = ['jpg', 'jpeg', 'png']
archive.value.allowedExtensions = aExtImage


const changeScreen = async (typeAction: string) => {
  storeCategory.typeAction = typeAction
  await formValidation.value?.resetValidation()
  arrayValidation.value = []
  archive.value.clearData()
  errors.value = []
  if (typeAction != 'back')
    storeCategory.keyList++
}

const submitForm = async () => {
  if (archive.value.imageFile) formulario.value.path = archive.value.imageFile

  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeCategory.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}
const arrayValidation = ref<Array<string | boolean>>([])

watch(formulario, (newValue, oldValue) => {
  if (!newValue.id)
    arrayValidation.value["photo"] = [requiredValidator(archive.value.imageUrl)]
  else
    arrayValidation.value["photo"] = []
}, { deep: true })

</script>

<template>
  <div>

    <HeaderAlertView sub-title="Categoria" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen" />

    <VContainer class="bg-vwhite" fluid>
      <VForm ref="formValidation" lazy-validation>
        <VRow>
          <VCol cols="12" sm="3">
            <VTextField clearable v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name"
              @keypress="errors.name = ''">
              <template #label>
                Nombre&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" sm="3">
            <VFileInput accept="image/*" :rules="arrayValidation.photo" :key="archive.key"
              @change="archive.handleImageSelected" @click:clear="archive.clearData">
              <template #label>
                Portada&nbsp;<b class="text-warning">*</b>
              </template>
            </VFileInput>
          </VCol>

        </VRow>
        <VRow>
          <VCol cols="12" v-show="archive.imageUrl || formulario.path">
            <VImg class="text-white" height="300" width="300" cover :src="archive.imageUrl ?? formulario.path">
              <VToolbar color="rgba(0, 0, 0, 0)" theme="dark">
                <VToolbarTitle class="text-h6">
                  <b class="bg-cprimary px-2" style="opacity: 0.7;">Vista previa</b>
                </VToolbarTitle>
              </VToolbar>
            </VImg>
          </VCol>
        </VRow>
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
      </VForm>
    </VContainer>
  </div>
</template>
