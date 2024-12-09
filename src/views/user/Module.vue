<script>
import ModuleCard from '@/components/ModuleCard.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import Navbar from '@/components/Navbar.vue';
import { getModulesByCourseIdWithPhoto,enrollInModule } from '@/services/module.service';
import { getCourseBySlugWithPhoto } from '@/services/course.service';


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
      enrolledModules: new Set(), // Store enrolled module IDs
    };
  },
  created() {
    const courseSlug = this.$route.params.slug;

    getCourseBySlugWithPhoto(courseSlug, (data) => {
      this.course = data;

      getModulesByCourseIdWithPhoto (this.course.id, (data) => {
        this.modules = data;
        console.log(this.modules);
      });
    });



  },
  methods: {
    async enrollInModule(moduleId) {
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) throw new Error("User not authenticated.");

        const response = await enrollInModule(userId, moduleId);
        alert(response.message);
        this.enrolledModules.add(moduleId); // Mark module as enrolled
      } catch (error) {
        console.error("Enrollment error:", error);
        alert(error.response?.data?.message || "Error enrolling in module.");
      }
    },
  },
};
</script>

<template>
  <div>
    <Navbar />

    <!-- Course Header -->
    <div v-if="course" class="w-full h-screen flex items-center bg-violet-100">
      <div class="ml-32 bg-contain bg-no-repeat">
        <img :src="'data:image/png;base64,' + course.thumbnail" alt="" class="w-[500px] h-[500px]">
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

    <!-- Modules List -->
    <div class="w-full px-10 py-10">
      <p class="text-md text-violet-500 font-medium text-lg mb-3">Our Modules</p>
      <h1 class="text-4xl font-bold mb-7 w-2/4 leading-[50px]">Simak modules dari para experts!</h1>

      <div class="grid grid-cols-3 gap-10 mb-10">
        <ModuleCard
          v-for="module in modules"
          :key="module.id"
          :imgSrc="module.thumbnail"
          :title="module.name"
          :description="module.description"
          :chapter="'10'"
          :moduleId="module.id"
          :link="'/course/' + course.slug + '/' + module.slug"
          :isEnrolled="enrolledModules.has(module.id)"
          @enroll="enrollInModule"
        />
      </div>
    </div>
    <FooterComponent />
  </div>
</template>
