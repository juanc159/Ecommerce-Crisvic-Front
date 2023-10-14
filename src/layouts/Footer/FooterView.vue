<script lang="ts" setup>
import FooterMain from '@/layouts/Footer/Components/FooterMain.vue';
</script>

<template>
  <div>
    <!--== Start Footer Area Wrapper ==-->
    <footer class="footer-area footer-bottom ">
      <FooterMain></FooterMain>
    </footer>
    <!--== End Footer Area Wrapper ==-->
  </div>
</template>

<style lang="scss" scoped>
.footer-bottom {
  position: absolute;
  inline-size: 100%;
  inset-block-end: 0 !important;
}
</style>

 