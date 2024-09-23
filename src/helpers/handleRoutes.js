import store from "../store/store"
import { handleLocalStorage } from "./handleLocalStorage"
const { handleGetBoards } = handleLocalStorage()
import { handleFetch } from "./handleFetch";
import User from "../models/User";
import Board from "../models/Board";
const { handleAuth, handleFetchBoards } = handleFetch()

const { BOARDS, BOARD, HOME, LOGIN } = { BOARDS: 'Boards', BOARD: 'Board', HOME: 'Home', LOGIN: 'Login' };

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
    const beforeEachLogged = async (to, from, next) => {
        if (to.meta.requireAuth && !store.user && to.name !== LOGIN) {
            try {
                const response = await handleAuth()
                if (response.status == 200) {
                    const result = await response.json()
                    store.user = User.fromJSON(result.publicUser)
                    next()
                }
                else {
                    next({ name: LOGIN })
                }
            } catch (error) {
                next({ name: LOGIN })
            }
        }
        else if (to.name === LOGIN && !store.user) {
            try {
                const response = await handleAuth()
                if (response.status == 200) {
                    const result = await response.json()
                    store.user = User.fromJSON(result.publicUser)
                    next({ name: BOARDS })
                }
                else {
                    next()
                }
            } catch (error) {
                next()
            }
        }
        // execute when is logged (has a cookie called token), user is not defined and not is the main route
        if ((to.name !== HOME && to.name !== LOGIN) && !store.user) {
            try {
                const response = await handleAuth()
                if (response.status == 200) {
                    const result = await response.json()
                    store.user = User.fromJSON(result.publicUser)
                    next()
                }
                else {
                    next({ name: LOGIN })
                }
            } catch (error) {
                next({ name: LOGIN })
            }
        }
       
        else if (to.name == BOARDS && store.user) {
            try {
                const response = await handleFetchBoards(store.user)
                if (response.status == 200) {
                    let result = await response.json()
                    store.boards = result.map((board) => { return Board.fromJSON(board) })
                    next()
                }
            } catch (error) {

            }
        }
        else {
            next()
        }
    }

    return {
        beforeEachNotLogged,
        beforeEachLogged
    }
}