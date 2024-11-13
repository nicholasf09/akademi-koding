<script setup>
    import SearchForm from './SearchForm.vue';
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import Modal from '@/components/Modal.vue';

    const router = useRouter();

    const searchFilter = ref('');

    const module = ref([]);

    const isModalVisible = ref(false);

    const emit = defineEmits(['create-item']);

    const props = defineProps({
        items: {
            type: Array,
            required: true
        }
    })

    const filteredItems = computed(() => {
        if (searchFilter.value != '') {
            return props.items.filter(item => item.module.toLowerCase().includes(searchFilter.value.toLowerCase()));            
        }
        return props.items;
    });

    const handleSearch = (value) => {
        searchFilter.value = value;
    }

    const editClick = (id) => {
        router.push({'path': `/admin/module/${id}`});
    }

    const handleCreate = () => {
        isModalVisible.value = true;
    }

    const submitCreate = () => {
        const newItem = {
            id: props.items.length + 1,
            module: module.value,
        };
        emit('create-item', newItem);
        module.value = '';
        isModalVisible.value = false;
    }

</script>

<template>

    <Modal :isVisible="isModalVisible" @close="isModalVisible = false">
        <h2 class="text-lg font-semibold mb-5">Create Module</h2>
        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Module</label>
            <input type="text" v-model="module" class="border-2 p-1" />
        </div>
        <div class="flex w-full justify-between">
            <button @click="submitCreate" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
        </div>

    </Modal>

    <div class="bg-white relative border rounded-lg w-[95%] mx-auto">
        <div class="flex items-center justify-between w-[95%] ml-[2%]">

            <SearchForm @search="handleSearch" />

            <div class="flex items-center justify-end text-sm font-semibold">
                <input type="text" class="border-2 p-2 rounded-xl shadow-md hover:shadow-lg" value="Data Science">
            </div>
        </div>


        <table class="text-sm text-left text-gray-500 w-[95%] mx-auto shadow-xl mb-10">
            <thead class="text-xs text-black font-bold uppercase bg-gray-200">
                <tr>
                    <th class="font-semibold py-2 px-4">ID</th>
                    <th class="font-semibold py-2">Module</th>
                    <th class="font-semibold py-2">Chapters</th>
                    <th class="font-semibold py-2 px-4">Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredItems" :key="item.id">
                    <td class="font-semibold py-2 px-4">{{ item.id }}</td>
                    <td class="font-semibold py-2">{{ item.module }}</td>
                    <td class="font-semibold py-2">{{ item.chapters }}</td>
                    <td class="font-semibold py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="editClick(item.id)">
                            Edit
                        </button>
                    </td>
                    
                </tr>
            </tbody>
        </table>

        <div class="bg-white relative rounded-lg w-[95%] mx-auto mb-10">
            <div class="flex items-center justify-between w-[95%]">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" @click="handleCreate">
                    Create +
                </button>
            </div>
        </div>

    </div>
    
</template>