import { ref } from "vue"

export const useFetch = () => {

    //const resultResponse = ref(null)

    const fetchData = async (data) => {
        const response = await fetch(data.URL)
        return await response.json()
    }

    const postData = async (data) => {
        const response = await fetch(data.URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.body)
        })
        return response
    }

    return {
        postData,
        fetchData
    }
}