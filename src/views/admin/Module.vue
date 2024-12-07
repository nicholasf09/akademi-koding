<template>
  <div class="w-full py-5 min-h-screen bg-neutral-800">
        <h1 class="text-white text-center text-3xl py-5">Welcome to the Admin Chapters Page!</h1>
        <DataTable :items="items" :idModule = "id" @update-item="handleUpdateItem"  @create-item="handleCreateItem" @delete-item="handleDeleteItem"/>
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
      handleDeleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
      },
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
                newItem.id = response.id;
                this.items = [...this.items, { ...newItem, id: response.id }]; // Tambahkan item baru
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
