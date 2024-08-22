<template>
    <div class="content">
        <div class="owner">
            <div class="photo">
                <img :src="owner.avatar" alt="Owner avatar" />
            </div>
            <div class="info">
                <h2>{{ owner.name }}</h2>
                <p>{{ owner.email }}</p>
            </div>
        </div>
        <div class="connected-users">
            <h2>Connected users</h2>
            <ul>
                <li v-for="user in users" :key="user.id">
                    <img :src="user.avatar" alt="User avatar" />
                    <p>{{ user.name }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import User from '../../../../models/User';
const props = defineProps({
    owner: {
        type: User,
        required: true
    },
    users: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>
.content {
    display: block;
}

.owner {
    display: flex;
    align-items: center;
    justify-self: center;

    & .photo {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    & .info {
        width: calc(100% - 100px);
        padding-left: 10px;

        & h2 {
            margin: 0px;
        }

        & p {
            margin: 0px;
            color: #888;
        }
    }
}

.connected-users {
    margin-top: 20px;
}

</style>