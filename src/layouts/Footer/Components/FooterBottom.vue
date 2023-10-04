<script setup lang="ts">
import payment from "@/assets/img/photos/payment.png"
</script>

<template>
  <div> 
      <!--== Start Footer Bottom ==-->
      <div class="footer-bottom">
        <div class="container pt--0 pb--0">
          <div class="row">
            <div class="col-12">
              <div class="footer-bottom-content">
                <p class="copyright">© 2021 Tuime. Made with <i class="fa fa-heart"></i> by <a target="_blank"
                    href="https://themeforest.net/user/codecarnival">Codecarnival.</a></p>
                <div class="payment">
                  <a href="account.html"><img :src="payment" :style="{ width: '192', height: '21' }"
                      alt="Payment Logo"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--== End Footer Bottom ==--> 
  </div>
</template>
 
 