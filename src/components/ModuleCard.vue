<template>
  <div class="w-full border-2 border-slate-300 rounded-lg shadow-xl">
    <img :src="imgSrc" alt="Module image" class="w-full h-[250px] object-cover rounded-t-lg">
    <div class="p-5 pb-10">
      <h1 class="text-2xl font-bold mb-3">{{ title }}</h1>
      <p class="mb-3">{{ description }}</p>
      <ul class="text-violet-500 mb-7 font-medium">
        <li>{{ chapter }} Chapter</li>
        <li>23,000 Views</li>
        <li>&#9733; 4.78/5.00</li>
      </ul>
      <!-- Button logic based on enrollment -->
      <button
        v-if="!isEnrolled"
        @click="enrollModule"
        class="group relative inline-block focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-purple-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
        ></span>
        <span
          class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
        >
          Enroll
        </span>
      </button>
      <button
        v-else
        @click="redirectToModule"
        class="group relative inline-block focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
        ></span>
        <span
          class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
        >
          Continue
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { enrollInModule } from "@/services/module.service";
import getCookies from "@/hooks/getCookies";

export default {
  name: "ModuleCardComponent",
  props: {
    imgSrc: String,
    title: String,
    description: String,
    chapter: String,
    moduleId: Number,
    link: String
  },
  data() {
    return {
      isEnrolled: false, // Tracks if the user is enrolled in this module
    };
  },
  methods: {
    async enrollModule() {
      try {
        const userId = sessionStorage.getItem("userId");
        const token = getCookies("token");

        if (!userId || !token) {
          throw new Error("Authentication data is missing.");
        }

        const response = await enrollInModule(userId, this.moduleId);
        alert(response.message);

        // Update local storage to reflect enrollment
        const enrolledModules = JSON.parse(localStorage.getItem("enrolledModules") || "[]");
        if (!enrolledModules.includes(this.moduleId)) {
          enrolledModules.push(this.moduleId);
          localStorage.setItem("enrolledModules", JSON.stringify(enrolledModules));
        }

        // Mark as enrolled and redirect to the module
        this.isEnrolled = true;
        this.redirectToModule();
      } catch (error) {
        console.error("Error during enrollment:", error);
        alert(error.response?.data?.message || "Error enrolling in module.");
      }
    },
    redirectToModule() {
      // Redirect to the module link
      this.$router.push(this.link);
    },
  },
  mounted() {
      // Check if the user is already enrolled
      const enrolledModules = JSON.parse(localStorage.getItem("enrolledModules") || "[]");
      this.isEnrolled = enrolledModules.includes(this.moduleId);
  },
};
</script>
