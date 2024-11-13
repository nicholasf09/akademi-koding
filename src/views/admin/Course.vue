<template>
    <div class="w-full h-screen bg-gray-200">
        <h1>Welcome to the Admin Page!</h1>
        <DataTable :items="items" @create-item="handleCreateItem" />
    </div>
</template>

<script>
import DataTable from '@/components/DataTableCourse.vue';
import { ref} from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'CourseAdmin',
    components: {
        DataTable,
    },
    setup() {
        const route = useRoute();
        const items = ref([]);
        const id = ref(route.params.id);
        if (id.value == 1) {
            items.value = [
                { id: 1, module: 'Python Basic', chapters: 10 },
                { id: 2, module: 'Python Intermediate', chapters: 10 },
                { id: 3, module: 'Python Advanced', chapters: 10 },
            ];
        } else {
            items.value = []; 
        }


        return {
            items,
        };
    },
    methods: {
        handleCreateItem(newItem) {
            this.items.push({
                id: newItem.id,
                module: newItem.module,
                chapters: 0,
            });
        },
    }
};
</script>
