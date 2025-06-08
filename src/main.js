import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// Update backend URL and CORS settings
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// Initialize CSRF cookie before app mount
async function bootstrap() {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.mount("#app");
  } catch (error) {
    console.error('CSRF initialization failed:', error);
  }
}

bootstrap();

// Disable devtools
app.config.devtools = false;
app.config.debug = false;
app.config.silent = true;