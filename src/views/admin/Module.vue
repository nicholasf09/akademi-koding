<template>
    <div class="w-full h-screen bg-gray-200">
        <h1>Welcome to the Admin Page!</h1>
        <DataTable :items="items" :idModule = "id" @update-item="handleUpdateItem"  @create-item="handleCreateItem"/>
    </div>
</template>

<script>
import DataTable from '@/components/DataTableModule.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { addChapter, getChaptersByModule, updateChapter } from '@/services/chapter.service';

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
            id,
        };
    },
    methods: {
      handleUpdateItem(newItem){
            const index = this.items.findIndex(item => item.id === newItem.id);
            this.items[index] = newItem;

            updateChapter(newItem, this.id, () => {
                console.log("Module updated");
            });
        },
        async handleCreateItem(newItem) {
            try {
                const response = await addChapter(newItem, this.id);
                this.items = [...this.items, { ...newItem, id: response.id }]; // Tambahkan item baru
                console.log("Chapter added:", response);
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
        },
    },
    mounted() {
        this.getChaptersByModule();
    },
};

</script>
