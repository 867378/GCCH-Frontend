import axios from 'axios';

export async function initializeCsrfCookie() {
  try {
    await axios.get('https://gcch-backend.onrender.com/sanctum/csrf-cookie');
    console.log('CSRF cookie initialized');
  } catch (error) {
    console.error('Failed to initialize CSRF cookie', error);
    throw error;
  }
}
