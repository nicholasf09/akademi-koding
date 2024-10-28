<script setup>
    import SearchForm from './SearchForm.vue';
    import { computed, ref, defineEmits} from 'vue';
    import Modal from '@/components/Modal.vue';


    const searchFilter = ref('');
    const emit = defineEmits(['update-item']);


    const props = defineProps({
        items: {
            type: Array,
            required: true
        },
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
    var soal = ref([]);
    var ganti = ref([]);
    const editClick = (id) => {
        soal.value = getQuestionById(id);
        ganti.value =JSON.parse(JSON.stringify(soal.value));
        isModalVisible.value = true;
        // console.log(soal.value);
    }

    const getQuestionById = (id) => {
        return props.items.find(item => item.id == id);
    }

    const isModalVisible = ref(false);

    const submitChanges = () => {
        const updatedItem = {
            id: ganti.value.id,
            question: ganti.value.question,
            options: [...ganti.value.options],
            answer: ganti.value.answer,
        };
        emit('update-item', updatedItem);
        isModalVisible.value = false;
    
    }

    const updateQuestion = (value) => {
        ganti.value.question = value; // Update soal.question
    };

    const updateOption = (index, value) => {
        ganti.value.options[index] = value; // Update soal.options[index]
    };

    const updateAnswer = (value) => {
        ganti.value.answer = value; // Update soal.answer
    };


</script>

<template>

    <div>
        <Modal :isVisible="isModalVisible" @close="isModalVisible = false">
            <h2 class="mt-5">Question</h2>
            <input type="text" class="border-2 p-1 w-full" :value="soal.question" @input="updateQuestion($event.target.value)">

            <h2 class="mt-5">Options</h2>
            <div>
                <div v-for="(option, index) in soal.options" :key="index" class="mb-2">
                    <input type="text" :value=soal.options[index]  class="border-2 p-1 w-full"  @input="updateOption(index, $event.target.value)" >
                </div>
            </div>


            <h2 class="mt-5">Answer</h2>
                <select name="" id="" class="border-2 p-1 w-full mb-10" @change="updateAnswer($event.target.value)">
                    <div v-for="(option, index) in soal.options" :key="index" class="mb-2">

                        <option :value=soal.options[index] :selected="option == soal.answer" >{{ soal.options[index] }}</option>

                    </div>
                </select>
            <br>
            <div class="flex w-full justify-between">
                <button @click="submitChanges" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                <button @click="isModalVisible = false" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close</button>
            </div>
        </Modal>
    </div>

    <div class="bg-white relative border rounded-lg w-[95%] mx-auto">
        <div class="flex items-center justify-between w-[95%] ml-[2%]">

            <SearchForm @search="handleSearch" />
            <div class="flex items-center justify-end text-sm font-semibold">
                <FilterRadios/>
                <FilterDropdown/>
            </div>
            
            
        </div>

        <table class="text-sm text-left text-gray-500 w-[95%] mx-auto shadow-xl mb-10 overflow-auto">
            <thead class="text-xs text-black font-bold uppercase bg-gray-200">
                <tr>
                    <th class="font-semibold py-2 px-4">ID</th>
                    <th class="font-semibold py-2 px-4">Questions</th>
                    <th class="font-semibold py-2">Answer</th>
                    <th class="font-semibold py-2">Options</th>
                    <th class="font-semibold py-2 px-4">Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredItems" :key="item.id">
                    <td class="font-semibold py-2 px-4">{{ item.id }}</td>
                    <td class="font-semibold py-2 px-4">{{ item.question }}</td>
                    <td class="font-semibold py-2">{{ item.answer }}</td>
                    <td class="font-semibold py-2">{{ item.options }}</td>
                    <td class="font-semibold py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="editClick(item.id)">
                            Edit
                        </button>
                    </td>
                    
                </tr>
            </tbody>
            
        </table>
    </div>
    
</template>