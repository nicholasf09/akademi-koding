<script setup>
    import SearchForm from './SearchForm.vue';
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import Modal from '@/components/Modal.vue';
    import axios from 'axios';
    import getCookies from '@/hooks/getCookies';

    const router = useRouter();

    const searchFilter = ref('');

    const module = ref({
        name: '',
        slug: '',
        description: '',
        link: '',
        project: ''
    });

    const fileNameUpload = ref('');

    const fileContent = ref('');

    const isModalVisible = ref(false);

    const idModelEdit = ref(0);

    const isEdit = ref(false);

    const emit = defineEmits(['create-item']);

    const props = defineProps({
        items: {
            type: Array,
            required: true
        },
        idCourse: {
            type: Number,
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

    const evalClick = (id) => {
        router.push({'path': `/admin/evaluation/${id}`});
    }

    const chapterClick = (id) => {
        router.push({'path': `/admin/module/${id}`});
    }

    const editClick = (id, name, slug, description, link, project) => {
        isModalVisible.value = true;
        idModelEdit.value = id;

        module.value.name = name;
        module.value.slug = slug;
        module.value.description = description;
        module.value.link = link;
        module.value.project = project;
        isEdit.value = true;

    }

    const handleCreate = () => {
        isModalVisible.value = true;
    }

    const handleModalClose = () => {
      isModalVisible.value = false;
      module.value = {
          name: '',
          slug: '',
          description: '',
          link: '',
          project: ''
      };
      isEdit.value = false;
  };

    const submitCreate = async () => {
        const lambdaUrl = 'https://zsiaukkvqk3u4x76zxc2yelnjq0uanow.lambda-url.us-east-1.on.aws/';

        const newItem = {
            name: module.value.name,
            course_id: props.idCourse,
            slug: module.value.slug,
            description: module.value.description,
            link: module.value.link,
            project: module.value.project
        };

        emit('create-item', newItem);

        module.value = {
            name: '',
            slug: '',
            description: '',
            link: '',
            project: ''
        };

        isModalVisible.value = false;

        const payload = {
            file_name: fileNameUpload.value,
            file_content: fileContent.value,
        };

        try {
            const response = await axios.post(lambdaUrl, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data);

        } catch (error) {
            console.error('Error uploading file:', error);
        }

    }

    const submitEdit = async () =>{
        const lambdaUrl = 'https://zsiaukkvqk3u4x76zxc2yelnjq0uanow.lambda-url.us-east-1.on.aws/';

        const id = idModelEdit.value;
        const name = module.value.name;
        const slug = module.value.slug;
        const description = module.value.description;
        const link = module.value.link;
        const project = module.value.project;

        const updatedItem = {
            id: id,
            name: name,
            slug: slug,
            description: description,
            link: link,
            project: project
        };

        emit('update-item', updatedItem);
        isModalVisible.value = false;
        module.value = {
            name: '',
            slug: '',
            description: '',
            link: '',
            project: ''
        };

        const payload = {
            file_name: fileNameUpload.value,
            file_content: fileContent.value,
        };

        try {
            const response = await axios.post(lambdaUrl, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data);

        } catch (error) {
            console.error('Error uploading file:', error);
        }

    }


    const handleUploadFile = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
            const fileBaseName = fileName.substring(0, fileName.lastIndexOf('.'));

            const timestamp = Date.now();
            const newFileName = `${fileBaseName}_${timestamp}${fileExtension}`;

            const reader = new FileReader();

            const base64String = await new Promise((resolve, reject) => {
                reader.onload = () => {
                    const result = reader.result.split(',')[1];
                    resolve(result);
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsDataURL(file);
            });

            module.value.link = `uploads/${newFileName}`;


            fileContent.value = base64String;
            fileNameUpload.value = newFileName;

        } else {
            console.error('No file selected');
        }
    };

    const handleDelete = async (id) => {
        const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
        const token = getCookies("token");

        axios.post(`${API_ENDPOINT}/delete/module`, 
        {
            id: id,
            idCourse: props.idCourse
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            emit('delete-item', id);
        })
        .catch((error) => {
            console.error('Error deleting module:', error);
        });

    }

</script>

<template>

<Modal
        :isVisible="isModalVisible"
        @close="handleModalClose"
    >
        <h2 class="text-lg font-semibold mb-5">{{ isEdit ? 'Edit Module' : 'Create Module' }}</h2>
        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Module</label>
            <input type="text" v-model="module.name" class="border-2 p-1" />
        </div>

        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Slug</label>
            <input type="text" v-model="module.slug" class="border-2 p-1" />
        </div>

        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Description</label>
            <input type="text" v-model="module.description" class="border-2 p-1" />
        </div>

        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Link</label>
            <input type="text" v-model="module.link" class="border-2 p-1" disabled/>
        </div>

        <div>
            <input
                type="file"
                name="image"
                accept="image/*"
                class="mb-5"
                @change="handleUploadFile">
        </div>

        <div class="flex flex-col mb-5">
            <label class="text-sm font-semibold">Project</label>
            <textarea v-model="module.project" class="border-2 p-1"></textarea>
        </div>

        <div class="flex w-full justify-between">
            <button v-if="!isEdit" @click="submitCreate" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
            <button v-if="isEdit" @click="submitEdit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
        </div>

    </Modal>

    <div class="bg-white relative border rounded-lg w-[95%] mx-auto">
        <div class="flex items-center justify-between w-[95%] ml-[2%]">

            <SearchForm @search="handleSearch" />

            <div class="flex items-center justify-end text-sm font-semibold">
                <!-- <input type="text" class="border-2 p-2 rounded-xl shadow-md hover:shadow-lg" value="Data Science" disabled> -->
            </div>
        </div>


        <table class="text-sm text-left text-gray-500 w-[95%] mx-auto shadow-xl mb-10">
            <thead class="text-xs text-black font-bold uppercase bg-gray-200">
                <tr>
                    <th class="font-semibold py-2 px-4">ID</th>
                    <th class="font-semibold py-2">Module</th>
                    <th class="font-semibold py-2">Slug</th>
                    <th class="font-semibold py-2">Description</th>
                    <th class="font-semibold py-2">Link</th>
                    <th class="font-semibold py-2">Project</th>
                    <th class="font-semibold py-2 px-4">Edit</th>
                    <th class="font-semibold py-2 px-4">Chapters</th>
                    <th class="font-semibold py-2 px-4">Submission</th>
                    <th class="font-semibold py-2 px-4">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredItems" :key="item.id">
                    <td class="font-semibold py-2 px-4">{{ item.id }}</td>
                    <td class="font-semibold py-2">{{ item.name }}</td>
                    <td class="font-semibold py-2">{{ item.slug }}</td>
                    <td class="font-semibold py-2">{{ item.description }}</td>
                    <td class="font-semibold py-2">{{ item.link }}</td>
                    <td class="font-semibold py-2">{{ item.project }}</td>
                    <td class="font-semibold py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="editClick(item.id, item.name, item.slug, item.description, item.link, item.project)">
                            Edit
                        </button>
                    </td>

                    <td class="font-semibold py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="chapterClick(item.id)">
                            Chapters
                        </button>
                    </td>

                    <td class="font-semibold py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="evalClick(item.id)">
                            Check
                        </button>
                    </td>

                    <td class="font-semibold py-2 px-4">
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="handleDelete(item.id)">
                            Delete
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
