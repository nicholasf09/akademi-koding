<template>
  <div class="w-full border-2 border-slate-300 rounded-lg shadow-xl">
    <img :src="'data:image/png;base64,' + imgSrc" alt="Module image" class="w-full h-[250px] object-cover rounded-t-lg" />
    <div class="p-5 pb-10">
      <h1 class="text-2xl font-bold mb-3">{{ title }}</h1>
      <p class="mb-3">{{ description }}</p>
      <ul class="text-violet-500 mb-7 font-medium">
        <li>{{ isEnrolled }} Chapter</li>
        <li>23,000 Views</li>
        <li>&#9733; 4.78/5.00</li>
      </ul>
      <!-- Button logic based on enrollment -->
      <button
        v-if="!isEnrolled && completed === 0"
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

      <!-- Continue Button -->
      <button
        v-if="!isEnrolled && completed === 1"
        @click="redirectToModule"
        class="group relative inline-block focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-green-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
        ></span>
        <span
          class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
        >
          Continue
        </span>
      </button>

      <!-- Redirect Button -->
      <button
        v-else-if="isEnrolled"
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
    link: String,
  },
  data() {
    return {
        isEnrolled: false, // Tracks if the user is enrolled in this module
        completed: 0,      // Tracks if the module is completed
    };
  },
  methods: {
    async checkEnrollment() {
        try {
            const userId = getCookies("userId");
            const token = getCookies("token");

            const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
            const response = await fetch(`${API_ENDPOINT}/enroll`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId,
                    moduleId: this.moduleId,
                    checkOnly: true,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Server error:", errorData.message);
                throw new Error(errorData.message || "Failed to fetch enrollment status.");
            }

            const { isEnrolled, completed } = await response.json();
            this.isEnrolled = isEnrolled;
            this.completed = completed;
        } catch (error) {
            console.error("Error checking enrollment status:", error);
        }
    },
    async enrollModule() {
      try {
        const userId = getCookies("userId");
        const token = getCookies("token");

        if (!userId || !token) {
          alert("You need to be logged in to enroll.");
          return;
        }

        const response = await enrollInModule(userId, this.moduleId, false);
        alert(response.message);

        // Mark as enrolled and redirect to the module
        this.isEnrolled = true;
        this.redirectToModule();
      } catch (error) {
        console.error("Error during enrollment:", error);
        alert(error.response?.data?.message || "Error enrolling in module.");
      }
    },
    redirectToModule() {
      if (this.link) {
        this.$router.push(this.link);
      } else {
        alert("Module link is missing. Please contact support.");
      }
    },
  },
  mounted() {
    this.checkEnrollment(); // Query server for enrollment status
  },
};
</script>
