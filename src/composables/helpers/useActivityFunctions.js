import Activity from "../../models/Activity"
import BoardSection from "../../models/BoardSection"

const useActivityFunctions = () => {

    /**
     * @param {BoardSection} boardSection
     * @param {Activity} activity
     */
    const handleAddActivity = (boardSection, activity) => {
        boardSection.activities.push(activity)
        return boardSection
    }
    /**
     * @param {BoardSection} boardSection
     * @param {Activity} activity
     */
    const handleUpdateActivity = (boardSection, activity) => {
        const index = boardSection.activities.findIndex(act => act.id === activity.id)
        boardSection.activities.splice(index, 1, activity)
        return boardSection
    }
    /**
     * @param {BoardSection} boardSection
     * @param {Activity} activity
     */
    const handleRemoveActivity = (boardSection, activity) => {
        const index = boardSection.activities.findIndex(act => act.id === activity.id)
        boardSection.activities.splice(index, 1)
        return boardSection
    }
    /**
     * @param {BoardSection} oldBoardSection
     * @param {BoardSection} newBoardSection
     * @param {Activity} activity
     */
    const handleMoveActivity = (oldBoardSection, newBoardSection, activity) => {
        const index = oldBoardSection.activities.findIndex(act => act.id === activity.id)
        oldBoardSection.activities.splice(index, 1)
        newBoardSection.activities.push(activity)
        return {
            oldBoardSection,
            newBoardSection,
        }
    }
    return {
        handleAddActivity,
        handleUpdateActivity,
        handleRemoveActivity,
        handleMoveActivity,
    }
}

export default useActivityFunctions