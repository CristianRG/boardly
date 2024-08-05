<template>
    <div class="modal">
        <div class="modal-content">
            <!-- <span class="close" @click="close()">&times;</span> -->
            <div class="content" id="content">
                <span
                style="margin-bottom: 1rem;"
                >simon</span>
                
            </div>
            <div class="options">
                
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, onMounted } from 'vue'

const props = defineProps({
    modal: {
        type: Object
    }
})

const { modal } = props

const typesOfContent = {
    'input': () => { return document.createElement('input') },
}

onMounted(() => {
    const content = document.getElementById('content')
    modal.content.forEach(element => {
        if(element.target in typesOfContent){
            const newElement = typesOfContent[element.target]()
            
            element.options.forEach(option => {
                newElement[option.key] = option.value
            })
            console.log(newElement)
            content.appendChild(newElement)
        }
    });
})



</script>
<style scoped>
.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: var(--modal-color);
    margin: 15% auto;
    padding: 20px;
    border: 1px solid var(--text-color);
    border-radius: 5px;
    max-width: 400px;
    color: var(--text-color);
}

.content {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.content span {
    font-size: 30px;
    text-transform: uppercase;
}

.content p {
    margin-top: 10px;
    font-size: 16px;
    text-align: center;
}

.options {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.close {
    color: var(--text-color);
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: var(--text-color-danger);
    text-decoration: none;
    cursor: pointer;
}
</style>