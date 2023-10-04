import { useCrudDynamicMenuPageStore } from '@/pages/DynamicMenuPage/Store/useCrudDynamicMenuPageStore';
import PagePreview from "@/pages/DynamicPage/Components/PagePreview.vue";
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const authenticationStore = useAuthenticationStore() // Obtiene el usuario actual
  const { isAuthenticate, permissions } = storeToRefs(authenticationStore)

  // Si la ruta requiere autenticación y el usuario no está autenticado,
  // redirige al usuario al login
  if (requiresAuth && !isAuthenticate.value) {
    next('/login')
  } else {
    // Si el usuario está autenticado o la ruta no requiere autenticación,
    // permite el acceso a la ruta
    const requiredPermission = to.meta.requiredPermission

    if (requiredPermission && isAuthenticate.value && !permissions.value.includes(requiredPermission)) {
      next('/unauthorized') // redirige al usuario a una página de error si no tiene los permisos necesarios para acceder a la ruta protegida
    } else {
      next() // permite el acceso a la ruta protegida si el usuario está autenticado y tiene los permisos necesarios
    }
  }
})

export default router // importa tu servicio de autenticación
