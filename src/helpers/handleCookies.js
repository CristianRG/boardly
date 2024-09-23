import { ref } from "vue"

export const handleCookies = () => {

    const cookies = ref({})

    // Función para obtener todas las cookies en formato de objeto
    const getAllCookies = () => {
        const cookieObj = {}
        document.cookie.split(';').forEach(cookie => {
            const [key, value] = cookie.split('=')
            cookieObj[key.trim()] = decodeURIComponent(value)
        });
        cookies.value = cookieObj
        return cookieObj
    };

    // Función para obtener una sola cookie por su nombre
    const getCookie = (name) => {
        const allCookies = getAllCookies()
        return allCookies[name] || null
    };

    // Función para establecer una nueva cookie
    const setCookie = (name, value, options = {}) => {
        const optionsString = Object.entries(options)
            .map(([key, val]) => `${key}=${val}`)
            .join('; ')
        document.cookie = `${name}=${encodeURIComponent(value)}; ${optionsString}`
        getAllCookies(); // Actualiza el objeto de cookies
    }

    return {
        cookies,
        getAllCookies,
        getCookie,
        setCookie,
    }
}