import axios from 'axios';

export async function initializeCsrfCookie() {
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    console.log('CSRF cookie initialized');
  } catch (error) {
    console.error('Failed to initialize CSRF cookie', error);
    throw error;
  }
}
