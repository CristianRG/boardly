import { ref } from "vue"

export const useFetch = () => {

    const URL = ref(null)
    const data = ref(null)
    const resultResponse = ref(null)

    const fetchData = async () => {
        const response = await fetch(URL.value)
        resultResponse.value = await response.json()
    }

    const postData = async () => {
        const response = await fetch(URL.value, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.value)
        })
        if (!response.ok) {
            throw new Error('HTTP error! status: ${response.status}')
        }
        resultResponse.value = await response.json()
    }

    return {
        URL,
        data,
        resultResponse,
        postData,
        fetchData
    }
}