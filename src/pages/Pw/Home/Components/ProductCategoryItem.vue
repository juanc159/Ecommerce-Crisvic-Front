<script lang="ts" setup>
import { useConfigGlobal } from '@/composables/useConfigGlobal'
import { useSubCategoriesStore } from "@/stores/subCategories";
import { useRouter } from "vue-router";
import qs from 'qs';
import { parseQuery } from 'vue-router';
const subCategoriesStore = useSubCategoriesStore()
const configGlobal = useConfigGlobal()
const router = useRouter()
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  to: {
    type: String,
    required: false,
    default: "",
  }
})

const search = (key: string, value: string | number | boolean | null) => {
  const newQuery = { ...router.currentRoute.value.query, [key]: value }
  const queryStr = qs.stringify(newQuery);
  const queryObj = parseQuery(queryStr);
  router.push({ name: props.to, query: queryObj })

  subCategoriesStore.fetchAll();
}
</script>

<template>
  <div>
    <!--== Start Product Category Item ==-->
    <div class="col">
      <div class="service-box how-to-sell">
        <div>
          <VImg :src="props.category.path" class="img-fluid   rounded" />
        </div>
        <h6 class="title mt-5">
          {{ props.category.name }}
        </h6>
        <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quas expedita veritatis ipsum, culpa,
          asperiores.</p> -->
      </div>
    </div>
    <!--== End Product Category Item ==-->
  </div>
</template>
