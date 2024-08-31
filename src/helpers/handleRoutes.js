import store from "../store/store"
import { handleLocalStorage } from "./handleLocalStorage"
const {handleGetBoards} = handleLocalStorage()

const { BOARDS, BOARD, HOME, LOGIN } = { BOARDS: 'Boards', BOARD: 'Board', HOME: 'Home', LOGIN: 'Login'};

export const handleRoutes = () => {

    /**
     * 
     * @param {import("vue-router").RouteLocationNormalized} to 
     * @param {import("vue-router").RouteLocationNormalized} from 
     * @param {import("vue-router").NavigationGuardNext} next 
     */
    const beforeEachNotLogged = (to, from, next) => {
        if ((to.name !== HOME && to.name !== LOGIN) && !store.user) {
            next({ name: LOGIN })
        }
        else if (to.name === BOARDS || to.name === BOARD && (store.boards.length <= 0 || !store.boards) && store.user) {
            try {
                const boards = handleGetBoards();
                store.boards = boards
            } catch (error) {
                store.boards = []
            }
            next()
        }
        else {
            next()
        }
    }
    /**
     * 
     * @param {import("vue-router").RouteLocationNormalized} to 
     * @param {import("vue-router").RouteLocationNormalized} from 
     * @param {import("vue-router").NavigationGuardNext} next 
     */
    const beforeEachLogged = (to, from, next) => {
        if ((to.name !== HOME && to.name !== LOGIN) && !store.user) {
            next({ name: LOGIN })
        }
        else if (to.name === BOARDS || to.name === BOARD && (store.boards.length <= 0 || !store.boards) && store.user) {
            try {
                const boards = handleGetBoards();
                store.boards = boards
            } catch (error) {
                store.boards = []
            }
            next()
        }
        else {
            next()
        }
    }
    
    return {
        beforeEachNotLogged
    }
}