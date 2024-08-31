import Board from "../models/Board"

export const handleLocalStorage = () => {

    const handleGetBoards = () => {
        try {
            const JSONListOfboards = Array.from(JSON.parse(localStorage.getItem('boards')))
            const boards = JSONListOfboards.map(board => {
                return Board.fromJSON(board)
            })
            return boards
        } catch (error) {
            throw new Error('Not boards found')
        }
    }

    return {
        handleGetBoards
    }
}