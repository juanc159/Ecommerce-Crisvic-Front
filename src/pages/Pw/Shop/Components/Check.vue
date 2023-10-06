<script setup lang="ts">

</script>

<template>
  <div class="checkbox-wrapper-18">
    <div class="round">
      <input type="checkbox" id="checkbox-18" />
      <label for="checkbox-18"></label>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.checkbox-wrapper-18 .round {
  position: relative;
}

.checkbox-wrapper-18 .round label {
  display: block;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #fff;
  block-size: 28px;
  cursor: pointer;
  inline-size: 28px;
}

.checkbox-wrapper-18 .round label::after {
  position: absolute;
  border: 2px solid #fff;
  block-size: 6px;
  border-block-start: none;
  border-inline-end: none;
  content: "";
  inline-size: 12px;
  inset-block-start: 9px;
  inset-inline-start: 8px;
  opacity: 0;
  transform: rotate(-45deg);
}

.checkbox-wrapper-18 .round input[type="checkbox"] {
  display: none;
  opacity: 0;
  visibility: hidden;
}

.checkbox-wrapper-18 .round input[type="checkbox"]:checked+label {
  border-color: #66bb6a;
  background-color: #66bb6a;
}

.checkbox-wrapper-18 .round input[type="checkbox"]:checked+label::after {
  opacity: 1;
}
</style>
