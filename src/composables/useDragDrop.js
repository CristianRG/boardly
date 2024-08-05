import { ref } from "vue"

export const useDragDrop = () => {
    let data = ref(null)

    const drag = (ev, item) => {
        ev.dataTransfer.setData('application/json', JSON.stringify(item))
    }

    const drop = (ev) => {
        ev.preventDefault()
        data.value = JSON.parse(ev.dataTransfer.getData('application/json'))
    }

    return {
        data,
        drag,
        drop,
    }
}