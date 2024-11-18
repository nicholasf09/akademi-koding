<template>
    <div class="w-full h-screen bg-gray-200">
        <h1>Welcome to the Admin Page!</h1>
        <DataTable :items="items" :idModule = "id" @update-item="handleUpdateItem"  @create-item="handleCreateItem"/>
    </div>
</template>

<script>
import DataTable from '@/components/DataTableModule.vue';
import { addChapter, getChaptersByModule } from '@/services/chapter.service';
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


        return {
            items,
            id
        };
    },
    methods: {
        handleUpdateItem(updatedItem) {
            // console.log(updatedItem);
            const index = this.items.findIndex(item => item.id === updatedItem.id);
            this.items[index] = updatedItem;
        },
        async handleCreateItem(newItem) {
            try {
                const response = await addChapter(newItem, this.id);
                
                console.log("Chapter added");
                this.items.push({
                    id: response.data.id, 
                    chapter: response.data.name || newItem.name,
                    content: response.data.content || newItem.content,
                    type: response.data.tipe || newItem.tipe,
                });
            } catch (error) {
                console.error("Error adding chapter:", error);
            }
        },
        async getChaptersByModule() {
            try {
                const response = await getChaptersByModule(this.id); // Menggunakan id dari route params
                this.items = response; 
                console.log("Chapters:", response); 
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.getChaptersByModule();
    }
};
</script>
