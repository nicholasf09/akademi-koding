<script setup>
    import SearchForm from './SearchForm.vue';
    import { computed, ref, defineEmits } from 'vue';
    import { useRouter } from 'vue-router';
    import Modal from '@/components/Modal.vue';

    const router = useRouter();

    const emit = defineEmits(['update-item', 'create-item']);

    const searchFilter = ref('');

    const isModalVisible = ref(false);


    const props = defineProps({
        items: {
            type: Array,
            required: true
        },
        idModule: {
            type: Number,
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

    var chapter = ref({
        name: '',
        content: '',
        type: '',
    });


    const quizClicked = (id) => {
        router.push({
            path: `/admin/module/${props.idModule}/questions/${id}`,
        });
    }


    const updateChapter = (value) => {
        const updatedItem = {
            module: value,
            id: props.idModule,
        }

        emit('update-chapter', updatedItem);
    };
    const handleCreate = () => {
        isModalVisible.value = true;
    }

    const submitCreate = () => {
        const newItem = {
            name: chapter.value.name,
            content: chapter.value.content,
            type: chapter.value.type,
        };
        emit('create-item', newItem);

        chapter.value = {
            name: '',
            content: '',
            type: '',
        };

        isModalVisible.value = false;
    }


</script>

<template>


    <Modal :isVisible="isModalVisible" @close="isModalVisible = false">
        <h2 class="text-lg font-semibold mb-5">Create chapter</h2>
        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Chapter</label>
            <input type="text" v-model="chapter.name" class="border-2 p-1" />
        </div>

        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Content</label>
            <textarea name="" id="" v-model="chapter.content" class="border-2 p-1"></textarea>
        </div>

        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Content</label>
            <select name="" id="" class="border-2 p-1" v-model="chapter.type">
                <option value="Bacaan" :selected="chapter.type == 'Bacaan'">Bacaan</option>
                <option value="Quiz" :selected="chapter.type == 'Quiz'">Quiz</option>
            </select>
        </div>

        

        <div class="flex w-full justify-between">
            <button @click="submitCreate" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
        </div>

    </Modal>

    <div class="bg-white relative border rounded-lg w-[95%] mx-auto">
        <div class="flex items-center justify-between w-[95%] ml-[2%]">

            <SearchForm @search="handleSearch" />
            
            <input type="text" class="border-2 p-2 rounded-xl shadow-md hover:shadow-lg" v-model="chapter" @blur="updateChapter(chapter)">
        </div>

        <table class="text-sm text-left text-gray-500 w-[95%] mx-auto shadow-xl mb-10 overflow-auto">
            <thead class="text-xs text-black font-bold uppercase bg-gray-200">
                <tr>
                    <th class="font-semibold py-2 px-4">ID</th>
                    <th class="font-semibold py-2 px-4">Chapter</th>
                    <th class="font-semibold py-2">Content</th>
                    <th class="font-semibold py-2">Tipe</th>
                    <th class="font-semibold py-2 px-4">Edit</th>
                    <th class="font-semibold py-2 px-4">Quiz</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredItems" :key="item.id">
                    <td class="font-semibold py-2 px-4">{{ item.id }}</td>
                    <td class="font-semibold py-2 px-4">{{ item.name }}</td>
                    <td class="font-semibold py-2">{{ item.content }}</td>
                    <td class="font-semibold py-2">{{ item.type }}</td>
                    <td class="font-semibold py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="editClick(item.id, item.tipe)">
                            Edit
                        </button>
                    </td>
                    <td class="font-semibold py-2 px-4">
                        <button v-if="item.type == 'Quiz'" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="quizClicked(item.id)">
                            Quiz
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