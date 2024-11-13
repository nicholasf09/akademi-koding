<script setup>
    import SearchForm from './SearchForm.vue';
    import { computed, ref, defineEmits } from 'vue';
    import { useRouter } from 'vue-router';
    import Modal from '@/components/Modal.vue';

    const router = useRouter();

    const emit = defineEmits(['update-item', 'create-item']);

    const searchFilter = ref('');

    const isModalVisible = ref(false);

    const chapterCreate = ref({
        title: '',
        content: '',
        tipe: '',
    });

    const isModalVisibleCreate = ref(false);

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

    const findChapterById = (id) => {
        return props.items.find(item => item.id == id);
    }

    var module = ref([]);
    var ganti = ref([]);

    const editClick = (id) => {
        
        module.value = findChapterById(id);
        ganti.value =JSON.parse(JSON.stringify(module.value));
        isModalVisible.value = true;
    
    }

    const quizClicked = (id) => {
        router.push({
            path: `/admin/module/${props.idModule}/questions/${id}`,
        });
    }

    const submitChanges = () => {
        const updatedItem = {
            id: ganti.value.id,
            chapter: ganti.value.chapter,
            title: ganti.value.title,
            content: ganti.value.content,
            tipe: ganti.value.tipe,
        };


        emit('update-item', updatedItem);
        isModalVisible.value = false;
    
    }

    const updateChapter = (value) => {
        const updatedItem = {
            module: value,
            id: props.idModule,
        }

        emit('update-chapter', updatedItem);
    };
    const handleCreate = () => {
        isModalVisibleCreate.value = true;
    }

    const submitCreate = () => {
        const newItem = {
            id: props.items.length + 1,
            chapter: props.items.length + 1,
            title: chapterCreate.value.title,
            content: chapterCreate.value.content,
            tipe: chapterCreate.value.tipe,
        };
        emit('create-item', newItem);
        chapterCreate.value.title = '';
        chapterCreate.value.content = '';
        chapterCreate.value.tipe = '';
        isModalVisibleCreate.value = false;
    }

    const chapter = ref('Python Basic');

</script>

<template>

    <Modal :isVisible="isModalVisible" @close="isModalVisible = false">
        <h2 class="text-lg font-semibold mb-5">Edit Module</h2>
        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Title</label>
            <input type="text" v-model="ganti.title"  class="border-2 p-1" />
        </div>
        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Content</label>
            <textarea name="" id="" class="border-2 p-1" v-model="ganti.content"></textarea>
        </div>

        <div class="flex flex-col mb-10">
            <label class="text-sm font-semibold">Tipe</label>
            <select name="" id="" class="border-2 p-1" v-model="ganti.tipe">
                <option value="Bacaan" :selected="ganti.tipe == 'Bacaan'" >Bacaan</option>
                <option value="Quiz" :selected="ganti.tipe == 'Quiz'">Quiz</option>
            </select>
        </div>

        <div class="flex w-full justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="submitChanges">
                Save
            </button>

            <button v-if="ganti.tipe == 'Quiz'" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="quizClicked(ganti.id)">
                Quiz
            </button>
            

            <button @click="isModalVisible = false" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close</button>
        </div>


    </Modal>

    <Modal :isVisible="isModalVisibleCreate" @close="isModalVisibleCreate = false">
        <h2 class="text-lg font-semibold mb-5">Create chapter</h2>
        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Title</label>
            <input type="text" v-model="chapterCreate.title" class="border-2 p-1" />
        </div>

        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Content</label>
            <textarea name="" id="" v-model="chapterCreate.content" class="border-2 p-1"></textarea>
        </div>

        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Content</label>
            <select name="" id="" class="border-2 p-1" v-model="chapterCreate.tipe">
                <option value="Bacaan" :selected="chapterCreate.tipe == 'Bacaan'">Bacaan</option>
                <option value="Quiz" :selected="chapterCreate.tipe == 'Quiz'">Quiz</option>
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
                    <th class="font-semibold py-2">Title</th>
                    <th class="font-semibold py-2">Content</th>
                    <th class="font-semibold py-2">Tipe</th>
                    <th class="font-semibold py-2 px-4">Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredItems" :key="item.id">
                    <td class="font-semibold py-2 px-4">{{ item.id }}</td>
                    <td class="font-semibold py-2 px-4">{{ item.chapter }}</td>
                    <td class="font-semibold py-2">{{ item.title }}</td>
                    <td class="font-semibold py-2">{{ item.content }}</td>
                    <td class="font-semibold py-2">{{ item.tipe }}</td>
                    <td class="font-semibold py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="editClick(item.id, item.tipe)">
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