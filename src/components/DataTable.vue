<script setup>
    import SearchForm from './SearchForm.vue';
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const searchFilter = ref('');

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

</script>

<template>
    <div class="bg-white relative border rounded-lg w-[95%] mx-auto">
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
    </div>
    
</template>