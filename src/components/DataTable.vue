<script setup>
    import SearchForm from './SearchForm.vue';
    import { computed, ref, defineEmits } from 'vue';
    import { useRouter } from 'vue-router';
    import Modal from './Modal.vue';

    const router = useRouter();

    const searchFilter = ref('');

    const course = ref([]);

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
            return props.items.filter(item => item.course.toLowerCase().includes(searchFilter.value.toLowerCase()));            
        }
        return props.items;
    });

    const handleSearch = (value) => {
        searchFilter.value = value;
    }

    const editClick = (id) => {
        router.push({ 
            path: `/admin/course/${id}`, 
        });
    }

    const handleCreate = () => {
        isModalVisible.value = true;
    }

    const submitCreate = () => {
        const newItem = {
            id: props.items.length + 1,
            course: course.value,
        };
        emit('create-item', newItem);
        course.value = '';
        isModalVisible.value = false;
    }

</script>

<template>

    <Modal :isVisible="isModalVisible" @close="isModalVisible = false">
        <h2 class="text-lg font-semibold mb-5">Create Course</h2>
        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Course</label>
            <input type="text" v-model="course" class="border-2 p-1" />
        </div>
        <div class="flex w-full justify-between">
            <button @click="submitCreate" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
        </div>

    </Modal>

    <div class="bg-white relative border rounded-lg w-[95%] mx-auto h-[90%] overflow-y-scroll">
        <div class="flex items-center justify-between w-[95%] ml-[2%]">

            <SearchForm @search="handleSearch" />
            <div class="flex items-center justify-end text-sm font-semibold">
                <FilterRadios/>
                <FilterDropdown/>
            </div>
            
            
        </div>

        <table class="text-sm text-left text-gray-500 w-[95%] mx-auto shadow-xl mb-10">
            <thead class="text-xs text-black font-bold uppercase bg-gray-200">
                <tr>
                    <th class="font-semibold py-2 px-4">ID</th>
                    <th class="font-semibold py-2">Course</th>
                    <th class="font-semibold py-2 px-4">Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredItems" :key="item.id">
                    <td class="font-semibold py-2 px-4">{{ item.id }}</td>
                    <td class="font-semibold py-2 px-4">{{ item.course }}</td>
                    <td class="font-semibold py-2">
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