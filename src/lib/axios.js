import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    }
});

// Funzione per ottenere il cookie CSRF
const getCsrfToken = async () => {
    try {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
            withCredentials: true
        });
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
};

// Interceptor per le richieste
instance.interceptors.request.use(async config => {
    try {
        if (!document.cookie.includes('XSRF-TOKEN')) {
            await getCsrfToken();
        }
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
});

// Interceptor per le risposte
instance.interceptors.response.use(
    response => {
        if (response.status >= 400 && response.status < 500) {
            return Promise.reject({
                response: {
                    data: response.data,
                    status: response.status
                }
            });
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance; 