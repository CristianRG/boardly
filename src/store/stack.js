import { reactive } from "vue";

const stack = reactive({
    lastData: null,
    lastDataStack: [],
    oldDataStack: []
})

export default stack