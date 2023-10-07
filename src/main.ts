/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'

import * as $ from "jquery";

import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import Editor from '@tinymce/tinymce-vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import vue3GoogleLogin from 'vue3-google-login'
import registerGlobalComponents from './components'

import '@/assets/main.js'

const authClient = "683505111883-dn6k0to7mgfivvlqp60asmhr4arimc9n.apps.googleusercontent.com"
loadFonts()

// Create vue app
const app = createApp(App)
const pinia = createPinia()

registerGlobalComponents(app)

pinia.use(piniaPluginPersistedstate)


app.component('Editor', Editor)
// Use plugins
app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(layoutsPlugin)
app.use(vue3GoogleLogin, {
  clientId: authClient,
})

// Mount vue app
app.mount('#app')
