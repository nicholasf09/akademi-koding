<template>
  <div class="p-16 text-black">
    <h2 class="text-3xl font-bold mb-4">{{ chapterProject }}</h2>
    <div class="space-y-4 text-xl w-3/4">
      <p class="text-justify leading-9">{{ chapterContent }}</p>
    </div>
    <!-- Only show this div if the chapter is not completed -->
    <div v-if="!completed" class="mt-5">
      <p class="text-xl">Complete Chapter?</p>
      <button
        class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mt-2"
        @click="completeChapter"
      >
        Yes
      </button>
    </div>
  </div>
</template>

<script>
import { markChapterAsComplete } from "@/services/chapter.service";

export default {
  name: "ChapterContent",
  props: {
    chapterContent: {
      type: String,
      required: true,
    },
    chapterProject: {
      type: String,
      required: true,
    },
    chapterId: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true, // Indicates if the chapter is already completed
    },
  },
  data() {
    return {
      isChapterCompleted: this.completed, // Initialize with the prop value
    };
  },

  methods: {
    async completeChapter() {
      try {
        const userId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("userId="))
          ?.split("=")[1];
        if (!userId) {
          alert("User not logged in.");
          return;
        }

        await markChapterAsComplete(parseInt(userId), this.chapterId);
        alert("Chapter marked as completed!");
        this.$emit("chapter-completed", this.chapterId);
      } catch (error) {
        console.error("Error completing chapter:", error);
        alert("Failed to complete the chapter.");
      }
    },
  },
};
</script>
