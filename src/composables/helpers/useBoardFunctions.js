import Board from "../../models/Board"

export const useBoardFunctions = () => {

    /**
     * @param {Board} board
     * @param {[Board]} boards 
     */
    const handleAddBoard = (board, boards) => {
        boards.push(board)
        return boards
    }
    /**
     * @param {Board} board
     * @param {[Board]} boards
     */
    const handleRemoveBoard = (board, boards) => {
        const index = boards.findIndex(b => b.id === board.id)
        boards.splice(index, 1)
        return boards
    }
    /**
     * @param {Board} board
     * @param {[Board]} boards
     */
    const handleUpdateBoard = (board, boards) =>{
        const index = boards.findIndex(b => b.id === board.id)
        boards.splice(index, 1, board)
        return boards
    }

    return {
        handleAddBoard, 
        handleRemoveBoard,
        handleUpdateBoard
    }
}