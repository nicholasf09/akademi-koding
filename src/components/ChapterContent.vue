<template>
    <div class="p-16 text-black">
      <h2 class="text-3xl font-bold mb-4">{{ chapterProject }}</h2>
      <div class="space-y-4 text-xl w-3/4">
        <p class="text-justify leading-9  ">{{ chapterContent }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChapterHeader",
    props: {
      chapterContent: {
        type: String,
        required: true
      },
      chapterProject: {
        type: String,
        required: true
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  