<template>
  <!-- <div class="w-full h-screen bg-gray-200">
    <h1>Welcome to the Admin Page!</h1>
    <div class="flex flex-col w-2/4 py-10">
      <label for="name">Name</label>
      <input type="text" v-model="course.name" id="name" required />

      <label for="slug">Slug</label>
      <input type="text" v-model="course.slug" id="slug" required />

      <label for="description">Description</label>
      <input type="text" v-model="course.description" id="description" required />

      <label for="image">Upload Image</label>
      <input type="file" @change="handleFileUpload" id="image" />

      <div class="hidden">
        <input type="text" v-model="course.link" id="link" />
      </div>

      <button @click="submitCourse" class="w-fit bg-black text-white font-bold py-2 px-4 rounded active:bg-neutral-600">Add Course</button>

      <p v-if="message" class="text-green-500 mt-4">{{ message }}</p>
    </div> -->

    <DataTable :items="items" @create-item="submitCourse"/>
  <!-- </div> -->
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import { addCourse } from '@/services/course.service';
import { getCourses } from '@/services/course.service';

export default {
  name: 'DashboardAdmin',
  components: {
    DataTable
  },
  data() {
    return {
      course: {
        name: '',
        slug: '',
        description: '',
        link: '',
      },
      selectedFile: null,
      message: '',
      items: [],
    };
  },
  methods: {
    submitCourse(newItem) {
      console.log('New course:', newItem);
      addCourse(newItem, (newCourse) => {
        this.message = 'Course added successfully!';
        // this.course = { name: '', slug: '', description: '', link: '' };
        this.items = [...this.items, newCourse];
        this.selectedFile = null;
      });
    },
    getCourses() {
      getCourses((data) => {
        this.items = data;
      });
    }
  },
  mounted() {
    console.log('Component is mounted');
    this.getCourses();
  }
};
</script>
