<template>
  <div class="w-full h-screen bg-gray-200">
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
    </div>

    <DataTable :items="items" />
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import { addCourse } from '@/services/course.service';

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
      items: [
        { id: 1, course: 'Data Science' },
        { id: 2, course: 'Web Development' },
        { id: 3, course: 'Machine Learning' },
      ],
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.course.link = `https://akademi-koding-image-bucket.s3.us-east-1.amazonaws.com/${this.selectedFile.name}`;
      }
    },
    submitCourse() {
      const formData = new FormData();
      formData.append('name', this.course.name);
      formData.append('slug', this.course.slug);
      formData.append('description', this.course.description);
      formData.append('image', this.selectedFile);  // Add the file to FormData

      addCourse(formData, (data) => {
        this.message = 'Course added successfully!';
        this.course = { name: '', slug: '', description: '', link: '' };
        this.selectedFile = null;
      });
    }
  },
  mounted() {
    console.log('Component is mounted');
  }
};
</script>
