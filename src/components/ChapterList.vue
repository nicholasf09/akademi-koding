<template>
  <div class="text-black p-4 max-h-4">
    <h3 class="text-xl font-bold mb-8 mt-4">Daftar Chapter</h3>
    <ul class="space-y-2">
      <ul>
        <li
          v-for="chapter in chapterList"
          :key="chapter.id"
          class="flex items-center cursor-pointer border-b-2 py-6 border-black"
          @click="goToChapter(chapter)"  
        >
          <span class="mr-2">O</span>
          <span class="font-semibold">{{ chapter.name }}</span>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ChapterList',
  props: ['chapterList'],
  methods: {
    goToChapter(chapter) {
      this.$emit('chapter-selected', chapter); // Emit event to parent component
    },
  },
};
</script>
