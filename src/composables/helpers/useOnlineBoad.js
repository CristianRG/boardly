import { ref } from "vue";
import { socket } from '../../socket.js'
import store from "../../store/store.js";
const useOnlineBoard = () => {
    const connected = ref(false)

    const turnOnline = () => {
        socket.connect()

        socket.emit('onlineBoard', JSON.stringify(store.board))

        socket.on('receiveBoard', (board) => {
            const boardRecived = JSON.parse(board)
            console.log('received board', boardRecived)
        })

        socket.on('disconnect', () => console.log('disconnected from server'))
    }

    return {
        turnOnline,
        connected
    }
}

export default useOnlineBoard