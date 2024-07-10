//import { ref } from "vue"

export const useLocalStorage = () => {

    const getItem = (key) => {
        const item = localStorage.getItem(key)
        if(item){
            return JSON.parse(item)
        }
        return null
    }

    const setItem = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    const removeItem = (key) => {
        localStorage.removeItem(key)
    }

    return {
        getItem,
        setItem,
        removeItem
    }
}