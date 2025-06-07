import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeCsrfCookie } from './plugins/sanctum';

import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.baseURL = "https://gcch-backend.onrender.com/api";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const app = createApp(App);

async function bootstrap(){
    try {
        await initializeCsrfCookie();
        app.use(createPinia());
        app.use(router);
        app.mount("#app");
    } catch (error) {
        console.error("Failed to initialize CSRF cookie", error);
    }
}

bootstrap();

// Disable devtools
app.config.devtools = false;
app.config.debug = false;
app.config.silent = true;
