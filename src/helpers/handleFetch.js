import User from "../models/User"
import store from "../store/store"
import { handleCookies } from "./handleCookies"
const { getCookie } = handleCookies()
export const handleFetch = () => {

    /**
     * 
     * @param {User} user 
     */
    const handleFetchBoards = async (user) => {
        const response = await fetch(`${store.SERVICE_API}/board/all`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idUser: user.id})
        })
        return response
    }

    const handleAuth = async () => {
        const token = getCookie('token')

        if (token) {
            const response = await fetch(`${store.SERVICE_API}/user/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            })
            return response
        }
        else {
            throw new Error("Token not found")
        }
    }

    return {
        handleAuth,
        handleFetchBoards
    }
}