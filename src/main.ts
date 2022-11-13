import Kakao from 'kakao-js-sdk';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import './utils/styles';

const app = createApp(App);

if (!Kakao.isInitialized()) {
  Kakao.init('276ca335211bcebd261cd53d447469fb');
}

app.use(createPinia()).use(router).mount('#app');
