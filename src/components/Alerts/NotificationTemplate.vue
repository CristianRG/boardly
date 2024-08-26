<template>
    <div class="content" :class="animation" v-if="show">
        <div class="notification">
            {{ notification.message }}
            <span class="close" @click="close">&times;</span>
        </div>
        <div class="bar"></div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    notification: {
        type: Object,
        required: true
    },
    show: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits(['close']);
const animation = ref('slide-in-right');

const startCloseAnimation = () => {
    animation.value = 'slide-out-right';
    setTimeout(() => {
        emits('close');
    }, 500); // Duración de la animación de salida
};

const close = () => {
    startCloseAnimation()
}

watch(() => props.notification, (value) => {
    animation.value = 'slide-in-right';

    setTimeout(() => {
        startCloseAnimation();
    }, 2500); // Tiempo antes de comenzar la animación de salida
});

watch(() => props.show, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            startCloseAnimation();
        }, 2500); // Tiempo antes de comenzar la animación de salida
    }
});
</script>

<style scoped>
.content {
    width: 15rem;
    height: fit-content;
    background: #242526;
    color: #fff;
    position: absolute;
    bottom: 60px;
    right: 10px;
    border-radius: 5px;
}

.notification {
    width: 100%;
    height: calc(100% - 5px);
    display: flex;
    align-items: center;
    padding: 5px;
}

.bar {
    width: 100%;
    height: 5px;
    animation-name: progress;
    animation-duration: 2.5s;
    animation-timing-function: ease-in-out;
}

@keyframes progress {
    0% {
        width: 100%;
        background: green;
    }
    25% {
        width: 75%;
        background: yellowgreen;
    }
    50% {
        width: 50%;
        background: yellow;
    }
    75% {
        width: 25%;
        background: orange;
    }
    100% {
        width: 0%;
        background: red;
    }
}

.close {
    height: fit-content;
    color: var(--text-color);
    float: right;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin: 0%;
    padding: 0%;
}

.close:hover,
.close:focus {
    color: var(--text-color-danger);
    text-decoration: none;
    cursor: pointer;
}

.slide-in-right {
    -webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-right {
    0% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slide-in-right {
    0% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
    }
}

.slide-out-right {
    -webkit-animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
    animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes slide-out-right {
    0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
    }

    100% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0;
    }
}

@keyframes slide-out-right {
    0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
    }

    100% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0;
    }
}
</style>