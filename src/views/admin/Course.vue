<template>
    <div class="w-full h-screen bg-gray-200">
        <h1>Welcome to the Admin Page Module!</h1>
        <DataTable :items="items" :idCourse="id" @create-item="handleCreateItem" @update-item="handleUpdateItem"/>
    </div>
</template>

<script>
import DataTable from '@/components/DataTableCourse.vue';
import { getModuleByCourseId, addModule, updateModule} from '@/services/module.service';
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


        return {
            items,
            id
        };
    },
    methods: {
        async handleCreateItem(newItem) {
            
            await addModule(newItem, (response) => {
                newItem.id = response.id;
            });

            this.items.push({
                id: newItem.id,
                name: newItem.name,
                slug: newItem.slug,
                description: newItem.description,
                link: newItem.link,
                project: newItem.project,
            });
            
        },

        handleUpdateItem(newItem){
            const index = this.items.findIndex(item => item.id === newItem.id);
            this.items[index] = newItem;

            updateModule(newItem, this.id, () => {
                console.log("Module updated");
            });
        },
        async getModules() {
            try {
                const response = await getModuleByCourseId(this.id); // Menggunakan id dari route params
                this.items = response; 
                // console.log("Modules:", response);   
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        },
        
    },
    mounted() {
        this.getModules();
    }
};
</script>
