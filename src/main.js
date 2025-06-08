import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);

// Update backend URL and CORS settings
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

// Initialize CSRF cookie before app mount
async function bootstrap() {
  try {
    await axios.get('/sanctum/csrf-cookie');
    app.use(createPinia());
    app.use(router);
    app.mount("#app");
  } catch (error) {
    console.error('CSRF initialization failed:', error);
    // Still mount the app even if CSRF fails
    app.use(createPinia());
    app.use(router);
    app.mount("#app");
  }
}

// Set config before bootstrap
app.config.devtools = false;
app.config.debug = false;
app.config.silent = true;

bootstrap();