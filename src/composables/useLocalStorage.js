//import { ref } from "vue"

import Board from "../models/Board"
import store from "../store/store"

export const useLocalStorage = () => {

    const getItem = (key) => {
        const item = localStorage.getItem(key)
        if (item) {
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

    const addActivity = () => {
        // save in localStorage...
        const boards = JSON.parse(localStorage.getItem('boards'))
        const indexBoard = boards.findIndex(board => board.id == store.board.id)
        // replace element in boards than has the same id in the board
        boards[indexBoard] = store.board
        localStorage.setItem('boards', JSON.stringify(boards))
    }

    const updateActivityByDragDrop = () => {
        const boards = JSON.parse(localStorage.getItem('boards'))
        const indexBoard = boards.findIndex(board => board.id == store.board.id)

        boards[indexBoard] = store.board
        localStorage.setItem('boards', JSON.stringify(boards))
    }

    return {
        getItem,
        setItem,
        removeItem,
        addActivity,
        updateActivityByDragDrop
    }
}