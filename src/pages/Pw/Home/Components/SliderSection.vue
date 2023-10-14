<script lang="ts" setup>

import { useBannersStore } from '@/stores/banners';

const bannersStore = useBannersStore()
const { banners, keyComponent } = storeToRefs(bannersStore)

onMounted(async () => {
  await bannersStore.fetchAll()
})
</script>

<template>
  <div>
    <v-carousel v-if="banners.length > 0" hide-delimiters show-arrows="hover">

      <v-carousel-item v-for="(item, index) in banners" :key="index" :src="item.path" cover></v-carousel-item>

    </v-carousel>
  </div>
</template>
 