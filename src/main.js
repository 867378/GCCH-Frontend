import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeCsrfCookie } from './plugins/sanctum';
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// Update backend URL and CORS settings
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const app = createApp(App);

// Initialize CSRF cookie before app mount
async function bootstrap() {
    try {
        await initializeCsrfCookie();
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