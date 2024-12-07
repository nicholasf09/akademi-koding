<template>
  <div class="text-black p-4 flex items-center fixed w-full justify-between top-0 border-b bg-violet-100 border-gray-700 z-50">
    <button
      class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      @click="goBack"
    >
      Back To Course
    </button>
    <h1 class="text-lg font-semibold mx-8 cursor-pointer"></h1>
    <a href="/register" class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">Chapter List</a>
  </div>
  <div class="text-black p-4 flex items-center justify-between fixed border-t bg-violet-100 border-gray-700 w-full bottom-0 z-50">
    <h1 class="text-lg font-reguler mx-auto cursor-pointer">WARNING! Plagiarism in any form will not be tolerated under any circumstances.</h1>
  </div>
</template>

<script>
export default {
  name: "ChapterHeader",
  props: {
    moduleTitle: {
      type: String,
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
