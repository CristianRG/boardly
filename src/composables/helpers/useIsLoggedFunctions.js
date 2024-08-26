import { ref } from "vue"
import store from '../../store/store'

export const useIsLoggedFuctions = () => {

    const isLogged = ref(store.logged)

    /**
     * @param {Array} boards
     */
    const handleSaveInLocalStorage = (boards) => {
        if(!isLogged.value){
            localStorage.setItem('boards', JSON.stringify(boards))
        }
    }

    return {
        handleSaveInLocalStorage
    }
}