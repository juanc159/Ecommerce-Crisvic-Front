<script lang="ts" setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: false,
    default: "#",
  }
})
</script>

<template>
  <div>
    <!--== Start Product Banner Item ==-->
    <div class="banner-product-single-item">
      <div class="thumb">
        <a :href="props.href">
          <img :src="props.image" :style="{width: '570px', height: '300px'}" alt="Image-HasTech">
        </a>
      </div>
      <div class="content">
        <h5 class="sub-title">{{props.subTitle}}</h5>
        <h5 class="title">{{props.title}}</h5>
        <a class="btn-theme btn-theme-color btn-sm" :href="props.href">Shop Now</a>
      </div>
    </div>
    <!--== End Product Banner Item ==-->
  </div>
</template>