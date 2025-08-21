import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/theme-chalk/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

createApp(App).mount('#app')

const media = window.matchMedia('(prefers-color-scheme: dark)')

function applyTheme(e) {
    if (e.matches) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

applyTheme(media)
media.addEventListener('change', applyTheme)