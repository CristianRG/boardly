import { ref } from "vue"

export const useDragDrop = () => {
    let data = ref(null)

    const drag = (ev, {item, sectionId}) => {
        ev.dataTransfer.setData('application/json', JSON.stringify({item, sectionId}))
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