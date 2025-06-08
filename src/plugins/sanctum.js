import axios from 'axios';

export async function initializeCsrfCookie() {
    try {
        await axios.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('CSRF initialization failed:', error);
        throw error;
    }
}
