<template>
    
    <nav class="sidebar close" ref="sidebar">
        <header>
            <div class="image-text">
                <span class="image">
                    <img src="" alt="" />
                </span>

                <div class="text logo-text">
                    <span class="name">{{ board.name }}</span>
                    <span class="user">{{ board.owner.name }}</span>
                </div>
            </div>

            <i class="bx bx-chevron-right toggle" ref="toggle"></i>
        </header>

        <div class="menu-bar">
            <div class="menu">
                <li class="search-box" ref="searchBox">
                    <i class="bx bx-search icon"></i>
                    <input type="text" placeholder="Search Games..." />
                </li>

                <ul class="menu-links">
                    <li class="nav-link">
                        <a href="#">
                            <Home class="icon"/>
                            <span class="text nav-text">Home</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <BoardlyUsers class="icon"/>
                            <span class="text nav-text">Members</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <BoardIcon class="icon"/>
                            <span class="text nav-text">Board</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <Settings class="icon"/>
                            <span class="text nav-text">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="bottom-content">
                <li v-if="store.logged" >
                    <a href="#">
                        <LogOut class="icon"/>
                        <span class="text nav-text">Logout</span>
                    </a>
                </li>

                <li v-if="!store.logged">
                    <a href="#">
                        <div class="signup icon"
                        style="font-size: 13px; background: var(--primary-color); color: #fff; width: 100%;"
                        >Sign up</div>
                    </a>
                </li>

                <li class="mode">
                    <div class="sun-moon">
                        <i class="bx bx-moon icon moon"></i>
                        <i class="bx bx-sun icon sun"></i>
                    </div>
                    <span class="mode-text text" ref="modeText">Dark mode</span>

                    <div class="toggle-switch" ref="modeSwitch">
                        <span class="switch"></span>
                    </div>
                </li>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { onMounted, defineProps } from 'vue'
import store from '../../store/store';

import Home from '../icons/Home.vue';
import BoardlyUsers from '../icons/BoardlyUsers.vue';
import Settings from '../icons/Settings.vue';
import BoardIcon from '../icons/BoardIcon.vue';
import LogOut from '../icons/LogOut.vue';

import Board from '../../models/Board'

onMounted(() => {
    const body = document.querySelector('body')
    const sidebar = body.querySelector('nav')
    const toggle = body.querySelector('.toggle')
    const searchBtn = body.querySelector('.search-box')
    const modeSwitch = body.querySelector('.toggle-switch')
    const modeText = body.querySelector('.mode-text')

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('close')
    })
    searchBtn.addEventListener('click', () => {
        sidebar.classList.remove('close')
    })
    modeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark')
        if (body.classList.contains('dark')) {
            modeText.innerText = 'Light mode'
        } else {
            modeText.innerText = 'Dark mode'
        }
    })
})

const props = defineProps({
    board: {
        type: Board,
        default: () => {
            return new Board('', 'No board selected', '', [], 0, '', '', [])
        }
    }
})

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

::selection {
    background-color: var(--primary-color);
    color: #fff;
  } 

.sidebar {
    height: 100%;
    width: 250px;
    padding: 10px 14px;
    background: var(--sidebar-color);
    transition: var(--tran-05);
    z-index: 100;
    
}

.sidebar.close {
    width: 88px;
}

.sidebar li {
    height: 50px;
    list-style: none;
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.sidebar header .image,
.sidebar .icon {
    min-width: 60px;
    border-radius: 6px;
}

.sidebar .icon {
    min-width: 60px;
    border-radius: 6px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.sidebar .text,
.sidebar .icon {
    color: var(--text-color);
    transition: var(--tran-03);
}

.sidebar .text {
    font-size: 17px;
    font-weight: 500;
    white-space: wrap;
    opacity: 1;
}

.sidebar.close .text {
    opacity: 0;
}

.sidebar header {
    position: relative;
    height: auto;
}

.sidebar header .image-text {
    display: flex;
    align-items: center;
}

.sidebar header .logo-text {
    display: flex;
    flex-direction: column;
}

header .image-text .name {
    margin-top: 2px;
    font-size: 18px;
    font-weight: 600;
    display: block;
}

header .image-text .user {
    font-size: 16px;
    margin-top: -2px;
    display: block;
}

.sidebar header .image {
    display: flex;
    align-items: center;
    justify-content: center;
}

.sidebar header .image img {
    width: 40px;
    border-radius: 6px;
}

.sidebar header .toggle {
    position: absolute;
    top: 50%;
    right: -25px;
    transform: translateY(-50%) rotate(180deg);
    height: 25px;
    width: 25px;
    background-color: var(--primary-color);
    color: var(--sidebar-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    cursor: pointer;
    transition: var(--tran-05);
}

body.dark .sidebar header .toggle {
    color: var(--text-color);
}

.sidebar.close .toggle {
    transform: translateY(-50%) rotate(0deg);
}

.sidebar .menu {
    margin-top: 40px;
}

.sidebar li.search-box {
    border-radius: 6px;
    background-color: var(--primary-color-light);
    cursor: pointer;
    transition: var(--tran-05);
}

.sidebar li.search-box input {
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    background-color: var(--primary-color-light);
    color: var(--text-color);
    border-radius: 6px;
    font-size: 17px;
    font-weight: 500;
    transition: var(--tran-05);
}

.sidebar li a {
    list-style: none;
    height: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 6px;
    text-decoration: none;
    transition: var(--tran-03);
}

.sidebar li a:hover {
    background-color: var(--primary-color);
}

.sidebar li a:hover .icon,
.sidebar li a:hover .text {
    color: var(--sidebar-color);
}

body.dark .sidebar li a:hover .icon,
body.dark .sidebar li a:hover .text {
    color: var(--text-color);
}

.sidebar .menu-bar {
    height: calc(100% - 55px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
    overflow-x: hidden;
}

.menu-bar::-webkit-scrollbar {
    display: none;
}

.sidebar .menu-bar .mode {
    border-radius: 6px;
    background-color: var(--primary-color-light);
    position: relative;
    transition: var(--tran-05);
}

.menu-bar .mode .sun-moon {
    height: 50px;
    width: 60px;
}

.mode .sun-moon i {
    position: absolute;
}

.mode .sun-moon i.sun {
    opacity: 0;
}

body.dark .mode .sun-moon i.sun {
    opacity: 1;
}

body.dark .mode .sun-moon i.moon {
    opacity: 0;
}

.menu-bar .bottom-content .toggle-switch {
    position: absolute;
    right: 0;
    height: 100%;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;
}

.toggle-switch .switch {
    position: relative;
    height: 22px;
    width: 40px;
    border-radius: 25px;
    background-color: var(--toggle-color);
    transition: var(--tran-05);
}

.switch::before {
    content: "";
    position: absolute;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    background-color: var(--sidebar-color);
    transition: var(--tran-04);
}

body.dark .switch::before {
    left: 20px;
}

.home {
    position: absolute;
    top: 0;
    top: 0;
    left: 250px;
    height: 100vh;
    width: calc(100% - 250px);
    background-color: var(--body-color);
    transition: var(--tran-05);
}

.home .text {
    font-size: 30px;
    font-weight: 500;
    color: var(--text-color);
    padding: 12px 60px;
}

.sidebar.close~.home {

    width: calc(100% - 78px);
}

body.dark .home .text {
    color: var(--text-color);
}
</style>