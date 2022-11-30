import { createPinia, Pinia } from "pinia";
import piniaPluginPresistedstate from 'pinia-plugin-persistedstate'

const pinia: Pinia = createPinia()
pinia.use(piniaPluginPresistedstate)

export default pinia;