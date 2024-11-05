<!-- eslint-disable no-unused-vars -->
<script>
import CourseCard from '@/components/CourseCard.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import Navbar from '@/components/Navbar.vue';
import { getCourses } from '@/services/course.service';

export default {
  name: 'HomePage',
  components: {
    Navbar,
    CourseCard,
    FooterComponent,
  },
  data() {
    return {
      courses: [],
    };
  },
  created() {
    getCourses((data) => {
      this.courses = data;
    });
  },
};
</script>

<template>
  <div>
    <Navbar />

    <div class="w-full h-screen bg-white flex items-center bg-violet-100">
      <div class="w-2/4 h-full bg-[url('/img/vector-koding.jpg')] bg-cover ">
      </div>
      <div class="w-2/4 pl-10">
        <h1 class="text-6xl font-bold leading-[70px] mb-5">Kuasai Ratusan Skill, <span class="text-violet-500">Bangun Portofolio & Bersertifikat.</span></h1>
        <p class="text-md text-neutral-500 mb-8 w-2/4"> Belajar fleksibel via • Video Materi • Case Study & Praktik • Bahan Bacaan • Komunitas!</p>
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

    <div class="w-full px-10 py-10">
      <p class="text-md text-violet-500 font-medium text-lg mb-3">Learning Path</p>
      <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold mb-7 w-2/4 leading-[50px]">Daftar Learning Path Rancangan Experts!</h1>
        <a class="group relative inline-block focus:outline-none focus:ring" href="#">
          <span
            class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-purple-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>

          <!-- <span
            class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
          >
            Lihat Semua &raquo;
          </span> -->
        </a>
      </div>

      <div class="grid grid-cols-3 gap-10">
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :bgColor="'bg-pink-100'"
          :icon="'/'"
          :title="course.name"
          :description="course.description"
          :link="course.link"
        />
      </div>
    </div>

      </div>

  <FooterComponent />
</template>


