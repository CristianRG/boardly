import Board from "../../models/Board"
import BoardSection from "../../models/BoardSection"

export const useSectionFunctions = () => {
    /**
     * @param {Board} board
     * @param {BoardSection} boardSection 
     */
    const handleAddSection = (board, boardSection) => {
        board.sections.push(boardSection)
        return board
    }
    /**
     * @param {Board} board
     * @param {BoardSection} boardSection 
     */
    const handleRemoveSection = (board, boardSection) => {
        const index = board.sections.findIndex(s => s.id === boardSection.id)
        board.sections.splice(index, 1)
        return board
    }
    /**
     * @param {Board} board
     * @param {BoardSection} boardSection 
     */
    const handleUpdateSection = (board, boardSection) => {
        const index = board.sections.findIndex(s => s.id === boardSection.id)
        board.sections.splice(index, 1, boardSection)
        return board
    }
    /**
     * @param {Board} board
     * @param {String} id 
     */
    const handleFindSection = (board, id) => {
        const index = board.sections.findIndex(s => s.id === id)
        return board.sections[index]
    }

    return {
        handleAddSection,
        handleRemoveSection,
        handleUpdateSection,
        handleFindSection
    }
}