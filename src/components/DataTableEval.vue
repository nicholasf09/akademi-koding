<script setup>
import SearchForm from './SearchForm.vue';
import { computed, ref } from 'vue';
import Modal from '@/components/Modal.vue';

const searchFilter = ref('');

const module = ref({
    name: '',
    slug: '',
    description: '',
    link: '',
    project: '',
    score: '',
    comment: ''
});


const isModalVisible = ref(false);

const idModelEdit = ref(0);

const isEdit = ref(false);

const emit = defineEmits(['update-item']);

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    idModule: {
        type: Number,
        required: true
    }
});

console.log('Items:', props.items);
console.log('idModule:', props.idModule);

const filteredItems = computed(() => {
    if (searchFilter.value != '') {
        return props.items.filter(item => item.module.toLowerCase().includes(searchFilter.value.toLowerCase()));
    }
    return props.items;
});

const handleSearch = (value) => {
    searchFilter.value = value;
};

const editClick = (id, name, slug, description, link, project, score, comment) => {
    isModalVisible.value = true;
    idModelEdit.value = id;

    module.value.name = name;
    module.value.slug = slug;
    module.value.description = description;
    module.value.link = link;
    module.value.project = project;
    module.value.score = score;
    module.value.comment = comment;
    isEdit.value = true;
};

const handleModalClose = () => {
    isModalVisible.value = false;
    module.value = {
        name: '',
        slug: '',
        description: '',
        link: '',
        project: '',
        score: '',
        comment: ''
    };
    isEdit.value = false;
};

const submitEdit = async () => {

    const updatedItem = {
        id: idModelEdit.value,
        comment: module.value.comment,
        score: module.value.score,
    };

    emit('update-item', updatedItem);
    isModalVisible.value = false;

    module.value = {
        score: '',
        comment: ''
    };
};
</script>

<template>
<Modal
    :isVisible="isModalVisible"
    @close="handleModalClose"
>
    <h2 class="text-lg font-semibold mb-5">{{ isEdit ? 'Edit Module' : 'Create Module' }}</h2>

    <div class="flex flex-col mb-5">
        <label class="text-sm font-semibold">Score</label>
        <input type="number" v-model="module.score" class="border-2 p-1" />
    </div>

    <div class="flex flex-col mb-5">
        <label class="text-sm font-semibold">Comment</label>
        <textarea v-model="module.comment" class="border-2 p-1"></textarea>
    </div>

    <div class="flex flex w-full justify-between">
        <button v-if="isEdit" @click="submitEdit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
    </div>
</Modal>

<div class="bg-white relative border rounded-lg w-[95%] mx-auto">
    <div class="flex items-center justify-between w-[95%] ml-[2%]">
        <SearchForm @search="handleSearch" />
        <div class="flex items-center justify-end text-sm font-semibold">
            <input type="text" class="border-2 p-2 rounded-xl shadow-md hover:shadow-lg" value="Data Science" disabled>
        </div>
    </div>

    <table class="text-sm text-left text-gray-500 w-[95%] mx-auto shadow-xl mb-10">
        <thead class="text-xs text-black font-bold uppercase bg-gray-200">
            <tr>
                <th class="font-semibold py-2 px-4">ID</th>
                <th class="font-semibold py-2">User ID</th>
                <th class="font-semibold py-2">Project</th>
                <th class="font-semibold py-2">Score</th>
                <th class="font-semibold py-2">Comment</th>
                <th class="font-semibold py-2">Eval</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
                <td class="font-semibold py-2 px-4">{{ item.id }}</td>
                <td class="font-semibold py-2">{{ item.user_id }}</td>
                <td class="font-semibold py-2">{{ item.link }}</td>
                <td class="font-semibold py-2">{{ item.score }}</td>
                <td class="font-semibold py-2">{{ item.comment }}</td>
                <td class="font-semibold py-2 px-4">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="editClick(item.id, item.name, item.slug, item.description, item.link, item.project, item.score, item.comment)">
                        Eval
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
