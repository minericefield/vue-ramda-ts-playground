import { createApp } from 'vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue' // https://github.com/bootstrap-vue/bootstrap-vue/issues/5196
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

// app.use(BootstrapVue)
// app.use(IconsPlugin)
app.use(store)
app.use(router)

app.mount('#app')
