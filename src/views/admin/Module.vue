<template>
    <div class="w-full h-screen bg-gray-200">
        <h1>Welcome to the Admin Page!</h1>
        <DataTable :items="items" />
    </div>
</template>

<script>
import DataTable from '@/components/DataTableModule.vue';
import { ref} from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'ModuleAdmin',
    components: {
        DataTable,
    },
    setup() {
        const route = useRoute();
        const items = ref([]);
        const id = ref(route.params.id);
        if (id.value == 1) {
            items.value = [
                { id: 1, chapter: '1', title: 'Introduction to Python', content: 'Python is a high-level, interpreted programming language. It is a general-purpose language, which means it can be used to build just about anything}' },
                { id: 2, chapter: '2', title: 'Python Variables', content: 'Variables are containers for storing data values. Unlike other programming languages, Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.}' },
                { id: 3, chapter: '3', title: 'Python Data Types', content: 'Built-in Data Types. In programming, data type is an important concept. Variables can store data of different types, and different types can do different things.}' },
            ];
        } else {
            items.value = []; 
        }


        return {
            items,
        };
    },
};
</script>
