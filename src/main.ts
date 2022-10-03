import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import './utils/styles';

const app = createApp(App);

app.use(createPinia()).use(router).mount('#app');
