import './assets/main.css'
import { createManager } from '@vue-youtube/core';
import { createApp } from 'vue';
import App from './App.vue'
import router from './router'

const manager = createManager({
    deferLoading: {
        enabled: true,
        autoLoad: true,
    },
});

const app = createApp(App).use(router).use(manager).mount('#app')
