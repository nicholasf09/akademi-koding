<template>
  <div class="text-black p-4 max-h-4">
    <h3 class="text-xl font-bold mb-8 mt-4">Daftar Chapter</h3>

    <!-- Show "Complete Module?" div only when all chapters are completed and the module is not yet marked as completed -->
    <div v-if="allChaptersCompleted && !moduleCompleted" class="block">
      <p class="text-lg font-semibold">Complete Module?</p>
      <button
        class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mt-2"
        @click="markModuleComplete"
      >
        Complete
      </button>
    </div>

    <ul class="space-y-2">
      <ul>
        <li
          v-for="(chapter, index) in chapterList"
          :key="chapter.id"
          class="flex items-center cursor-pointer border-b-2 py-6 border-black"
          @click="goToChapter(chapter)"
        >
          <div>
            <span class="mr-2">{{ index + 1 }}.</span>
            <span class="font-semibold">{{ chapter.name }}</span>
          </div>

          <!-- Show checkmark if chapter is completed -->
          <p
            class="ml-auto"
            :class="{ hidden: !chapter.completed, block: chapter.completed }"
          >
            &#10004;
          </p>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import getCookies from "@/hooks/getCookies";
import { markModuleComplete } from "../services/module.service";

export default {
  name: "ChapterList",
  props: ["chapterList"],
  data() {
    return {
      moduleCompleted: false, // Tracks whether the module is completed
    };
  },
  computed: {
    allChaptersCompleted() {
      // Check if all chapters are completed
      return this.chapterList.every((chapter) => chapter.completed);
    },
  },
  methods: {
    goToChapter(chapter) {
      this.$emit("chapter-selected", chapter); // Emit event to parent component
    },
    async fetchEnrollmentStatus() {
      if (!this.chapterList[0]?.moduleId) {
        console.warn("Module ID is not defined yet.");
        return; // Exit if the moduleId is not defined
      }

      const userId = getCookies("userId");
      const moduleId = this.chapterList[0]?.moduleId;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/user-enrollment-status`,
          { userId, moduleId } // Send data in request body
        );

        this.moduleCompleted = response.data.completed === 1;
        console.log(this.moduleCompleted);
      } catch (error) {
        console.error("Error fetching enrollment status:", error);
      }
    },
    async markModuleComplete() {
      const userId = getCookies("userId");
      const moduleId = this.chapterList[0]?.moduleId; // Assume all chapters share the same module_id

      try {
        await markModuleComplete(userId, moduleId);
        alert("Module marked as complete!");
        this.moduleCompleted = true; // Update state to hide the button
      } catch (error) {
        console.error("Error marking module complete:", error);
        alert("An error occurred while marking the module as complete.");
      }
    },
  },
  watch: {
    chapterList: "fetchEnrollmentStatus", // Run fetchEnrollmentStatus when chapterList changes
  },
  async mounted() {
    // Initial check when the component is mounted
    await this.fetchEnrollmentStatus();
  },
};
</script>
