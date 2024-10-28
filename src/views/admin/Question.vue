<template>

    

    <div class="w-full h-screen bg-gray-200">
        <h1>Welcome to the Admin Page!</h1>
        <DataTable :items="items" @update-item="handleUpdateItem"/>
    </div>
</template>

<script>
import DataTable from '@/components/DataTableQuestions.vue';
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
        const id = ref(route.params.idQuestion);
        if (id.value == 4) {
            items.value = [
                {id: 1, question: 'What is the capital of Indonesia?', answer: 'Jakarta', options: ['Jakarta', 'Bandung', 'Surabaya', 'Bali']},
                {id: 2, question: 'What is the capital of Malaysia?', answer: 'Kuala Lumpur', options: ['Kuala Lumpur', 'Jakarta', 'Bangkok', 'Manila']},
                {id: 3, question: 'What is the capital of Thailand?', answer: 'Bangkok', options: ['Bangkok', 'Kuala Lumpur', 'Manila', 'Hanoi']},
                {id: 4, question: 'What is the capital of Vietnam?', answer: 'Hanoi', options: ['Hanoi', 'Bangkok', 'Manila', 'Kuala Lumpur']},
            ];
        } else {
            items.value = []; 
        }

        return {
            items
        };
    },
    methods: {
        handleUpdateItem(updatedItem) {
            const index = this.items.findIndex(item => item.id === updatedItem.id);
            this.items[index] = updatedItem;
        }
    }
};
</script>
