<template>
  <div class="text-black p-4 flex items-center fixed w-full justify-between top-0 border-b bg-violet-100 border-gray-700 z-50">
    <button 
      class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      @click="goBack"
    >
      Back To Course
    </button>
    <h1 class="text-lg font-semibold mx-8 cursor-pointer">Current Course: {{ moduleTitle }}</h1>
    <a href="/register" class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">Project Submission</a>
  </div>
  <div class="text-black p-4 flex items-center justify-between fixed border-t bg-violet-100 border-gray-700 w-full bottom-0 z-50">
    <button
      :disabled="!hasPrev"
      class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      @click="$emit('prevChapter')">Previous</button>
    <h1 class="text-md font-semibold mr-2 cursor-pointer text-center">{{ chapterTitle }}</h1>
    <button
      :disabled="!hasNext"
      class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      @click="$emit('nextChapter')">Next</button>
  </div>
</template>

<script>
export default {
  name: "ChapterHeader",
  props: {
    chapterTitle: {
      type: String,
      required: true
    },
    moduleTitle: {
      type: String,
      required: true
    },
    hasNext: {
      type: Boolean,
      required: true
    },
    hasPrev: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    goBack() {
      // Navigate back to the course page without the module part in the URL
      const courseSlug = this.$route.params.courseSlug;
      this.$router.push(`/course/${courseSlug}`); // Navigate to /course/{courseSlug}
    },
  },
};
</script>
