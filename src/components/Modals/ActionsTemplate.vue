<template>
    <div class="vertical-menu" v-if="show" ref="menu" :style="menuStyle">
        <ul>
            <li v-for="item in menuItems" :key="item.label" @mouseover="onHover(item)" @mouseleave="onLeave"
                @click.stop="toggleDropdown(item)">
                {{ item.label }}
                <ul v-if="item.isOpen && item.actions.length > 0" class="dropdown" :style="subMenuStyle">
                    <li v-for="action in item.actions" :key="action" @click.stop="actionSelected(action)">
                        {{ action.title }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
    menuItems: {
        type: Array,
        required: true,
    },
    show: {
        type: Boolean,
        default: false,
    },
    coordinates: {
        type: Object,
        required: true,
        default: () => ({ x: 0, y: 0 })
    }
});

const emits = defineEmits(['close']);

const menuItems = computed(() => props.menuItems);
const menuRef = ref(null);  // Ref para el menú

const menuStyle = computed(() => {
    const menuWidth = 150; // Ajusta esto al ancho de tu menú
    const offset = 10; // Espacio adicional para evitar el borde

    const availableWidth = window.innerWidth - props.coordinates.x;
    const leftPosition = availableWidth < menuWidth ? props.coordinates.x - menuWidth + offset : props.coordinates.x;

    return {
        top: `${props.coordinates.y}px`,
        left: `${leftPosition}px`,
    };
});

const subMenuStyle = computed(() => {
    const menuWidth = 150; // Ajusta esto al ancho de tu menú

    const availableWidth = window.innerWidth - props.coordinates.x;
    const leftPosition = availableWidth < menuWidth ? -120 : 140

    return {
        left: `${leftPosition}px`,
    };
})

const onHover = (item) => {
    if (isDesktop()) {
        item.isOpen = true;
    }
};

const onLeave = () => {
    if (isDesktop()) {
        closeAllDropdowns();
    }
};

const toggleDropdown = (item) => {
    if (!isDesktop()) {
        item.isOpen = !item.isOpen;
    }

    if (item.quickAction) {
        item.quickAction();
        emits('close');
    }
};

const closeAllDropdowns = () => {
    menuItems.value.forEach((item) => {
        item.isOpen = false;
    });
};

const isDesktop = () => {
    return window.innerWidth >= 768;
};

const actionSelected = (action) => {
    closeAllDropdowns();
    emits('close');
    action.action();
};

// Cerrar el menú al hacer clic fuera
const handleClickOutside = (event) => {
    if (menuRef.value && !menuRef.value.contains(event.target)) {
        emits('close');
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

// Opcional: Cuando `show` cambia, agregar o quitar el listener
watch(() => props.show, (newVal) => {
    if (newVal) {
        document.addEventListener('click', handleClickOutside);
    } else {
        document.removeEventListener('click', handleClickOutside);
    }
});
</script>

<style scoped>
.vertical-menu {
    position: absolute;
    width: 150px;
    background-color: var(--section-color);
    color: var(--text-color);
    border: 1px solid var(--text-color);
    border-radius: 5px;
    z-index: 1000;
}

.vertical-menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.vertical-menu li {
    position: relative;
    padding: 8px 16px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
}

.vertical-menu li:hover {
    background-color: var(--primary-color);
    color: white;
}

.dropdown {
    position: absolute;
    left: 190px;
    top: 0;
    display: block;
    background-color: var(--section-color);
    border: 1px solid #ddd;
    padding: 0;
}

.dropdown li {
    padding: 8px 16px;
    border-bottom: 1px solid #ddd;
    white-space: nowrap;
}

.dropdown li:hover {
    background-color: var(--primary-color);
}
</style>