<template>
    <div class="w-full py-5 min-h-screen bg-neutral-800">
        <h1 class="text-white text-center text-3xl py-5">Welcome to the Admin Courses Page!</h1>
        <DataTable :items="items" @create-item="submitCourse"/>
    </div>
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
