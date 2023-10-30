<script lang="ts" setup  >
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
// --- --- --- Store --- --- ---
import { useCrudProductStore } from '@/pages/Product/Store/useCrudProductStore';
import { useImageUpload } from '@/composables/useImageUpload';
import { useToast } from '@/composables/useToast';
const storeProduct = useCrudProductStore()
const { action, formulario, selectedRadio, categories } = storeToRefs(storeProduct)
const { toast } = useToast()
// --- --- END Store --- --- ---

// File
const archive = ref(useImageUpload())
const aExtImage = ['jpg', 'jpeg', 'png']
archive.value.allowedExtensions = aExtImage


const errors = ref<Array<string>>([])

const formValidation = ref<VForm>()
const formImagesValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  storeProduct.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back')
    storeProduct.keyList++
}

const submitForm = async () => {
  if (imagesProducts.value.length == 0) {
    toast("Alerta", "Debe agregar almenos una imagen al producto", "danger")
    return false
  }
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeProduct.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

const subcategories = ref([])

const changeCategory = (event: number) => {
  subcategories.value = []
  formulario.value.subcategory_id = null
  const search = categories.value.find(ele => ele.value == event)
  if (search) {
    subcategories.value = search.subcategories
  }
}


onMounted(async () => {
  await storeProduct.fetchDataForm()
})


//funcionalidad imagenes 
const imagesProducts = computed(() => {
  return formulario.value.images.filter(ele => ele.delete != 1)
})


const loadingFile = ref<boolean>(false)
const addImage = (e: Event) => {
  loadingFile.value = true
  const resp = archive.value.handleImageSelected(e)

  if (!resp) {
    loadingFile.value = false
    return false
  }

  setTimeout(() => {
    formulario.value.images.push({
      id: null,
      imageFile: archive.value.imageFile,
      path: archive.value.imageUrl,
      principal: 0,
      delete: 0
    })
    archive.value.clearData()
    loadingFile.value = false


  }, 1000)
}

const checked = (index: number) => {
  formulario.value.images.forEach(element => {
    element.principal = 0
  });

  selectedRadio.value = index
  formulario.value.images[index].principal = 1
}

const deleteImg = (obj: object) => {
  obj.delete = 1
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
            <VSelect clearable :items="categories" v-model="formulario.category_id" :rules="[requiredValidator]"
              @update:model-value="changeCategory($event)" :error-messages="errors.category_id">
              <template #label>
                Categoria&nbsp;<b class="text-warning">*</b>
              </template>
            </VSelect>
          </VCol>
          <VCol cols="12" sm="3">
            <VSelect clearable :items="subcategories" item-title="name" item-value="id"
              v-model="formulario.subcategory_id" :rules="[requiredValidator]" :error-messages="errors.subcategory_id">
              <template #label>
                Categoria&nbsp;<b class="text-warning">*</b>
              </template>
            </VSelect>
          </VCol>
          <VCol cols="12" sm="3">
            <VTextField clearable v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name"
              @keypress="errors.name = ''">
              <template #label>
                Nombre&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" sm="3">
            <VTextarea clearable v-model="formulario.description" :rules="[requiredValidator]"
              :error-messages="errors.description" @keypress="errors.description = ''">
              <template #label>
                Descripción&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextarea>
          </VCol>
          <VCol cols="12" sm="3">
            <VTextField clearable v-model="formulario.iva" :rules="[requiredValidator]" :error-messages="errors.iva"
              @keypress="errors.iva = ''">
              <template #label>
                Iva&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" sm="3">
            <VTextField clearable v-model="formulario.code" :rules="[requiredValidator]" :error-messages="errors.code"
              @keypress="errors.code = ''">
              <template #label>
                Código&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" sm="3">
            <VTextField clearable v-model="formulario.price" :rules="[requiredValidator]" :error-messages="errors.price"
              @keypress="errors.price = ''">
              <template #label>
                Precio&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
        </VRow>
        <VDivider class="border-opacity-75 my-4" color="csecundary" :thickness="3" />

      </VForm>

      <VForm ref="formImagesValidation" lazy-validation>
        <VRow>
          <VCol cols="12" sm="3">
            <VFileInput :loading="loadingFile" :disabled="loadingFile" accept="image/*" :rules="[requiredValidator]"
              :key="archive.key" @change="addImage($event)" @click:clear="archive.clearData">
              <template #label>
                Imagen&nbsp;
              </template>
            </VFileInput>
          </VCol>
          <!-- <VCol cols="12" sm="3">
            <VBtn size="30" icon color="success" @click="addImage()">
              <VIcon icon="tabler-plus"></VIcon>
            </VBtn>
          </VCol> -->
        </VRow>
      </VForm>

      <VRadioGroup v-model="selectedRadio" class="mt-5">
        <VRow>
          <VCol cols="12" lg="3" sm="5" v-for="(item, index) in imagesProducts" :key="index">
            <VCard max-width="344">
              <VImg :src="item.path" height="200px"></VImg>
              <VCardActions class="mt-3">
                <VRadio label="Principal" :value="index" @click="checked(index)"></VRadio>

                {{ index }}
                <VTooltip text="Eliminar" location="top">
                  <template v-slot:activator="{ props }">
                    <VBtn icon color="error" v-bind="props" @click="deleteImg(item)">
                      <VIcon icon="mdi-trash-can-outline"></VIcon>
                    </VBtn>
                  </template>
                </VTooltip>


              </VCardActions>
            </VCard>
          </VCol>
        </VRow>
      </VRadioGroup>


      <VRow class="mt-5">
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
