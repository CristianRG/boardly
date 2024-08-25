import { ref } from "vue";
import { socket } from '../../socket.js'
import store from "../../store/store.js";
const useOnlineBoard = () => {
    const connected = ref(false)
    const data = ref(null)

    const turnOnline = () => {
        if(connected.value == true){
            return connected
        }

        socket.connect()
        connected.value = true

        socket.on('setBoard', (board) => {
            const boardRecived = JSON.parse(board)
            data.value = {status: 200, message: 'Board received', board: boardRecived}
        })

        socket.on('boardNotFound', (board) => {
            data.value = {status: 404, message: 'board not found', board}
        })

        socket.on('disconnect', () => console.log('disconnected from server'))
    }

    const disconnect = () => socket.disconnect(); connected.value = false

    const shareBoard = () => socket.emit('onlineBoard', JSON.stringify(store.board))

    const getBoard = (board) => socket.emit('getBoard', JSON.stringify(board))

    return {
        turnOnline,
        connected,
        disconnect,
        shareBoard,
        getBoard,
        data
    }
}

export default useOnlineBoard