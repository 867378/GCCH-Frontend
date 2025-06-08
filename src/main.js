import { createApp } from "vue";
import { createPinia } from "pinia";
// Remove CSRF import
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";
// Remove CSRF related configs
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const app = createApp(App);

// Simplify bootstrap without CSRF
function bootstrap(){
  app.use(createPinia());
  app.use(router);
  app.mount("#app");
}

bootstrap();

// Disable devtools
app.config.devtools = false;
app.config.debug = false;
app.config.silent = true;