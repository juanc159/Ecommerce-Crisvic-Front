<script setup lang="ts">
import logolight from "@/assets/img/logo.jpg"
import { useAuthenticationStore } from '@/stores/authentication'
import { useSpeciesStore } from '@/stores/species'
import { storeToRefs } from "pinia";
const authenticationStore = useAuthenticationStore();
const speciesStore = useSpeciesStore();
const { countProductsShoppingCart, countLikes, token, user } = storeToRefs(authenticationStore)
const { species } = storeToRefs(speciesStore)
</script>

<template>
  <div>
    <header class="header axil-header header-style-1">
      <!-- Start Mainmenu Area  -->
      <div class="axil-mainmenu">
        <div class="container ">
          <div class="header-navbar">
            <div class="header-brand">
              <a href="index-2.html" class="logo logo-dark">
                <img width="100" :src="logolight" alt="Site Logo">
              </a>
            </div>
            <div class="header-main-nav">
              <!-- Start Mainmanu Nav -->
              <nav class="mainmenu-nav">
                <button class="mobile-close-btn mobile-nav-toggler"><i class="fas fa-times"></i></button>
                <div class="mobile-nav-brand">
                  <a href="index-2.html" class="logo">
                    <img :src="logolight" alt="Site Logo">
                  </a>
                </div>
                <ul class="mainmenu justify-content-end">
                  <li>
                    <RouterLink :to="{ name: 'home' }">
                      Inicio
                    </RouterLink>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="/"><span>Tienda Comercial</span></a>
                    <ul class="axil-submenu">
                      <li>
                        <a href="#/" class="mega-title">Especies</a>
                        <ul>
                          <li v-for="(item, index) in species" :key="index">
                            <RouterLink :to="{ name: 'shop', query: { specie_id: item.id } }">
                              {{ item.name }}
                            </RouterLink>
                          </li>
                          <li>
                            <RouterLink :to="{ name: 'shop' }">
                              Todos
                            </RouterLink>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <!-- <li class="menu-item-has-children">
                    <RouterLink :to="(!token) ? { name: 'accountLogin' } : { name: 'profile' }">
                      <span>Cuenta</span>
                    </RouterLink>

                    <ul class="axil-submenu" v-if="!token">
                      <li>
                          <a href="account.html"><span>Account</span></a>
                        </li>
                      <li v-if="!token">
                        <RouterLink :to="{ name: 'accountLogin' }">
                          <span>Login</span>
                        </RouterLink>
                      </li>
                      <li v-if="!token">
                        <RouterLink :to="{ name: 'accountRegister' }">
                          <span>Registro</span>
                        </RouterLink>
                      </li>
                    </ul>
                  </li> -->
                  <li>
                    <RouterLink class="cart-dropdown-btn" :to="{ name: 'contact' }">
                      <span>Contacto</span>
                    </RouterLink>
                  </li>
                </ul>
              </nav>
              <!-- End Mainmanu Nav -->
            </div>






            <div class="header-action">
              <ul class="action-list">
                <li class="shopping-cart">
                  <RouterLink class="cart-dropdown-btn" :to="{ name: 'shopWishlist' }">
                    <span class="cart-count">{{ countLikes }}</span>
                    <i class="flaticon-heart"></i>
                  </RouterLink>
                </li>
                <li class="shopping-cart">
                  <a style="cursor: pointer;" href="#" class="cart-dropdown-btn" data-bs-toggle="offcanvas"
                    data-bs-target="#AsideOffcanvasCart" aria-controls="AsideOffcanvasCart">
                    <span class="cart-count">{{ countProductsShoppingCart }}</span>
                    <i class="flaticon-shopping-cart"></i>
                  </a>
                </li>

                <!-- <li class="my-account">
                  <RouterLink class="shopping-account-btn" :to="{ name: 'accountLogin' }">
                    <i class="flaticon-person"></i>
                  </RouterLink>
                </li> -->
                <li class="axil-mobile-toggle">
                  <button class="menu-btn mobile-nav-toggler">
                    <i class="flaticon-menu-2"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- End Mainmenu Area -->
    </header>
  </div>
</template>
<style scoped>
.infoUser {
  padding: 1rem;
  color: white;
  font-size: 1.5rem;
}
</style>
 