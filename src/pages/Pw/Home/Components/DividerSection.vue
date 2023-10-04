<script lang="ts" setup>
import object1 from "@/assets/img/shape/paw-print-OCEFD9.png";
// import  object1 from "@/assets/img/shape/object1.png";
import  divider1 from "@/assets/img/photos/divider1.png";
import  divider2 from "@/assets/img/photos/divider2.png";
</script>

<template>
  <div>
    <!--== Start Divider Area Wrapper ==-->
    <section class="bg-theme-color position-relative z-index-1" style="overflow: hidden;">
      <div class="container-fluid p--0">
        <div class="row divider-style1">
          <div class="col-lg-3 col-xl-4">
            <div class="divider-thumb divider-thumb-left">
              <img :src="divider1" width="351" height="435" alt="Image-HasTech">
              <div class="shape-circle"></div>
            </div>
          </div>
          <div class="col-lg-6 col-xl-4">
            <div class="divider-content text-center">
              <h5 class="sub-title">&nbsp;</h5>
              <h2 class="title">&nbsp;</h2>
              <p class="desc mb-3">&nbsp;</p>
              <!-- <h5 class="sub-title">Save 50% Off</h5>
              <h2 class="title">Best Deal Offer</h2>
              <p class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                ut labore etlop.
              </p> -->
              <a class="btn btn-outline-principal btn-theme-basic mb-5" href="shop.html">Shop Now</a>
              <!-- <a class="btn btn-theme text-dark" href="shop.html">Shop Now</a> -->
              <img class="shape-object" :src="object1" width="316" height="302" alt="Image-HasTech">
            </div>
          </div>
          <div class="col-lg-3 col-xl-4">
            <div class="divider-thumb divider-thumb-right">
              <img :src="divider2" width="488" height="447" alt="Image-HasTech">
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--== End Divider Area Wrapper ==-->
  </div>
</template>