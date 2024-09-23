import { reactive } from "vue"
import { uuid } from "vue-uuid"

import User from "../models/User.js"
import Board from "../models/Board.js"
import BoardSection from "../models/BoardSection.js"
import Activity from "../models/Activity.js"
import Comment from "../models/Comment.js"
import Notification from "../models/NotificationModel.js"

const userFunctions = {
    /**
     * @param {User} user
     * @param {boolean} isLogged
     */
    setUser(user, isLogged){
        if(!isLogged){
            user = new User(
                uuid.v4(),
                `Uknow#${Math.round(Math.random()*1000)}`,
                'uknow@gmail.com',
                'https://avatar.iran.liara.run/public/2'
            )
            return user
        }
        return user
    },
    /**
     * @param {User} user
     */
    removeUser(user){
        user = null
        return user
    }
}

const boardFunctions = {
    /**
     * @param {Board} board
     * @param {[Board]} boards 
     */
    addBoard(board, boards){
        boards.push(board)
        return boards
    },
    /**
     * @param {Board} board
     * @param {[Board]} boards
     */
    removeBoard(board, boards){
        boards.splice(boards.indexOf(board), 1)
        return boards
    },
    /**
     * @param {Board} board
     * @param {[Board]} boards
     */
    updateBoard(board, boards){
        const index = boards.findIndex(b => b.id === board.id)
        boards.splice(index, 1, board)
        return boards
    }
}

const boardSectionFunctions = {
    /**
     * @param {Board} board
     * @param {BoardSection} boardSection 
     */
    addSection(board, boardSection){
        board.sections.push(boardSection)
        return board
    },
    /**
     * @param {Board} board
     * @param {BoardSection} boardSection 
     */
    removeSection(board, boardSection){
        board.sections.splice(board.sections.indexOf(boardSection), 1)
        return board
    },
    /**
     * @param {Board} board
     * @param {BoardSection} boardSection 
     */
    updateSection(board, boardSection){
        board.sections.splice(board.sections.indexOf(boardSection), 1, boardSection)
        return board
    }
}

const activityFunctions = {
    /**
     * @param {BoardSection} boardSection
     * @param {Activity} activity
     */
    addActivity(boardSection, activity){
        boardSection.activities.push(activity)
        return boardSection
    },
    /**
     * @param {BoardSection} boardSection
     * @param {Activity} activity
     */
    removeActivity(boardSection, activity){
        const index = boardSection.activities.findIndex(act => act.id === activity.id)
        boardSection.activities.splice(index, 1)
        return boardSection
    },
    /**
     * @param {BoardSection} boardSection
     * @param {Activity} activity
     */
    updateActivity(boardSection, activity){
        boardSection.activities.splice(boardSection.activities.indexOf(activity), 1, activity)
        return boardSection
    }
}

const commentFunctions = {
    /**
     * @param {Activity} activity
     * @param {Comment} comment
     */
    addComment(activity, comment){
        activity.comments.push(comment)
        return activity
    },
    /**
     * @param {Activity} activity
     * @param {Comment} comment
     */
    removeComment(activity, comment){
        activity.comments.splice(activity.comments.indexOf(comment), 1)
        return activity
    },
    /**
     * @param {Activity} activity
     * @param {Comment} comment
     */
    updateComment(activity, comment){
        activity.comments.splice(activity.comments.indexOf(comment), 1, comment)
        return activity
    }
}

/**
 * 
 * @param {User} user 
 * @returns {[BoardSection]}
 */
function defaultBoardSections(user){
    return [
        new BoardSection(
            uuid.v4(),
            'Por hacer',
            'Actividades aún no iniciadas',
            user,
            [new Activity(
                uuid.v4(),
                'Empieza',
                'En esta sección podrás redactar tus actividades por realizar. Para mover de sección cierra la nota y arrastra la actividad a la sección deseada',
                user,
                []
            )]
        ),
        new BoardSection(
            uuid.v4(),
            'En progreso',
            'Actividades en progreso',
            user,
            [new Activity(
                uuid.v4(),
                'Continua',
                'En esta sección podrás redactar tus actividades en proceso u arrastrar aquellas que estaban en el inicio. Para mover de sección cierra la nota y arrastra la actividad a la sección deseada',
                user,
                []
            )]
        ),
        new BoardSection(
            uuid.v4(),
            'Completadas',
            'Actividades completadas',
            user,
            [new Activity(
                uuid.v4(),
                'Termina',
                'En esta sección podrás redactar tus actividades completadas. Para mover de sección cierra la nota y arrastra la actividad a la sección deseada',
                user,
                []
            )]
        )
    ]
}

const store = reactive({
    logged: false,
    user: null,
    users: [],
    boards: [],
    board: null,
    theme: null,
    notifications: [],
    defaultBoardSections,
    URL_BASE: 'http://localhost:3000',
    SERVICE_API: 'http://localhost:3000/api/v1/boardly'
})


export default store