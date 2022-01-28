import { createApp, reactive } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import io from 'socket.io-client'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App)

const waveui = new WaveUI(app, {})

app.
    use(createPinia()).
    use(router).
    provide('waveui', reactive(waveui)).
    provide('socket', io(process.env.VUE_APP_ROOT_API, { autoConnect: false })).
    mount('#app')