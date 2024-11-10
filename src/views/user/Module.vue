<script>
import ModuleCard from '@/components/ModuleCard.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import Navbar from '@/components/Navbar.vue';
import { getModules } from '@/services/module.service';
import { getCourses } from '@/services/course.service';

export default {
  name: 'ModulePage',
  components: {
    Navbar,
    ModuleCard,
    FooterComponent,
  },
  data() {
    return {
      modules: [],
      course: null,
    };
  },
  created() {
    const courseSlug = this.$route.params.slug;

    // Fetch the courses and find the one matching the slug
    getCourses((courses) => {
      this.course = courses.find((course) => course.slug === courseSlug);

      // Fetch modules and filter by course_id if course is found
      if (this.course) {
        getModules((modules) => {
          this.modules = modules.filter((module) => module.course_id === this.course.id);
        });
      }
    });
  },
};
</script>

<template>
  <div>
    <Navbar />

    <!-- Display course image, title, and description -->
    <div v-if="course" class="w-full h-screen flex items-center bg-violet-100">
      <div class="ml-32 bg-contain bg-no-repeat">
        <img :src="course.link" alt="" class="w-[500px] h-[500px]">
      </div>
      <div class="w-2/4 pl-10">
        <h1 class="text-6xl font-bold leading-[70px] mb-5">
          <span class="text-blue-600">{{ course.name }}</span>
        </h1>
        <div class="flex ">
          <p class="text-md text-neutral-500 mb-2 me-8">○ Total Modules: {{ modules.length }}</p>
          <p class="text-md text-neutral-500 mb-2 me-8">○ Total Chapters: 169</p>
        </div>
        <p class="text-md text-neutral-500 mb-8 w-4/5">{{ course.description }}</p>
        <a class="group relative inline-block focus:outline-none focus:ring" href="#">
          <span
            class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-purple-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>
          <span
            class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
          >
            Get Started
          </span>
        </a>
      </div>
    </div>

    <!-- Display modules related to the course -->
    <div class="w-full px-10 py-10">
      <p class="text-md text-violet-500 font-medium text-lg mb-3">Our Modules</p>
      <h1 class="text-4xl font-bold mb-7 w-2/4 leading-[50px]">Simak modules dari para experts!</h1>

      <div class="grid grid-cols-3 gap-10 mb-10">
        <ModuleCard
          v-for="module in modules"
          :key="module.id"
          :imgSrc="module.link"
          :title="module.name"
          :description="module.description"
          :chapter="'10'"
          :link="'/course/' + course.slug + '/' + module.slug"
        />
      </div>
      <div class="w-full flex justify-center items-center">
        <a class="group relative inline-block focus:outline-none focus:ring" href="#">
          <span
            class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-purple-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>
          <span
            class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
          >
            Lihat Semua
          </span>
        </a>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>
