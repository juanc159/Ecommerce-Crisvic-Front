import type { App } from 'vue'
// componentsGlobal
import HeaderAlertView from './components/HeaderAlertView.vue'
import Ecommerce from '@/layouts/Ecommerce.vue'

export default function registerGlobalComponents(app: App): void {
  app.component('HeaderAlertView', HeaderAlertView)
  app.component('Ecommerce', Ecommerce)
}
