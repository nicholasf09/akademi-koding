<template>
    <div class="flex flex-col min-h-screen bg-violet-100 max-h-[100vh] overflow-hidden text-black">
      <ChapterHeader />
      <div class="flex flex-grow  my-16">
        <div class="ml-8 w-3/4 p-4 pl-32 max-h-[80vh] overflow-scroll overflow-x-hidden">
          <ChapterContent />
        </div>
        <div class="w-1/4 max-h-[80vh] overflow-scroll border-l border-gray-600  p-4">
          <ChapterList />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ChapterHeader from '@/components/ChapterHeader.vue';
  import ChapterContent from '@/components/ChapterContent.vue';
  import ChapterList from '@/components/ChapterList.vue';
  
  export default {
    name: "ChapterPage",
    components: {
      ChapterHeader,
      ChapterContent,
      ChapterList,
    },
  };
  </script>
  
  <style scoped>
  /* Global styles for the page if needed */
  </style>
  