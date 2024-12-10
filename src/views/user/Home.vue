<!-- eslint-disable no-unused-vars -->
<script>
import CourseCard from '@/components/CourseCard.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ModuleCard from '@/components/ModuleCard.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'HomePage',
  components: {
    Navbar,
    CourseCard,
    FooterComponent,
  },
};
</script>

<template>
  <div>
    <Navbar />

    <div class="w-full h-screen bg-white flex items-center bg-violet-100">
      <div class="w-2/4 pl-10">
        <h1 class="text-6xl font-bold leading-[70px] mb-5">Bangun Keterampilan, <span class="text-violet-500">Ciptakan Peluang</span></h1>
        <p class="text-md text-neutral-500 mb-8 w-2/4">Bersama Akademi Koding, Wujudkan Mimpi Menjadi Programmer Andal!</p>
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
      <div class="w-2/4 h-full bg-[url('/img/org-ngoding.jpg')] bg-cover bg-right">
      </div>
    </div>

    <div class="w-full px-10 py-10">
      <p class="text-md text-violet-500 font-medium text-lg mb-3">Learning Path</p>
      <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold mb-7 w-2/4 leading-[50px]">Lihat learning path yang dirancang para experts berikut</h1>
        <a class="group relative inline-block focus:outline-none focus:ring" href="#">
          <span
            class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-purple-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>

          <span
            class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
          >
            Lihat Semua &raquo;
          </span>
        </a>
      </div>

      <div class="grid grid-cols-3 gap-10">
        <CourseCard
          icon="/img/datascience.svg"
          title="Data Science"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elit turpis, accumsan quis lacus nec, faucibus aliquam tellus. Donec non sagittis mauris."
          link="/course/data-science"
        />
        <CourseCard
          icon='/img/webdev.svg'
          title="Web Develoment"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elit turpis, accumsan quis lacus nec, faucibus aliquam tellus. Donec non sagittis mauris."
          link="/course/web-development"
        />
        <CourseCard
          icon='/img/ml.svg'
          title="Machine Learning"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elit turpis, accumsan quis lacus nec, faucibus aliquam tellus. Donec non sagittis mauris."
          link="/course/machine-learning"
        />
      </div>
    </div>
  </div>

  <FooterComponent />
</template>


