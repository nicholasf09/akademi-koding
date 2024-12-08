<template>
  <div class="flex flex-col min-h-screen bg-violet-100 max-h-[100vh] overflow-hidden text-black">
    <ChapterHeader :moduleTitle="moduleTitle" :chapterTitle="chapterTitle" />
    <div class="flex flex-grow my-16">
      <div class="ml-8 w-3/4 p-4 pl-32 max-h-[80vh] overflow-scroll overflow-x-hidden">
        <ChapterContent
          :chapterContent="chapterContent"
          :chapterProject="chapterProject"
          :chapterId="chapterList[selectedChapterIndex]?.id"
          :completed="chapterList[selectedChapterIndex]?.completed"
          @chapter-completed="markChapterAsCompleted"
        />
      </div>
      <div class="w-1/4 max-h-[80vh] overflow-scroll border-l border-gray-600 p-4">
        <ChapterList :chapterList="chapterList" @chapter-selected="handleChapterSelect" />
      </div>
    </div>
    <!-- Bottom Navigation Buttons -->
    <div class="text-black p-4 flex items-center justify-between fixed border-t bg-violet-100 border-gray-700 w-full bottom-0 z-50">
      <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" @click="goPrevious">Previous</button>
      <h1 class="text-md font-semibold mr-2 cursor-pointer text-center">{{ chapterTitle }}</h1>
      <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" @click="goNext">Next</button>
    </div>
  </div>
</template>

<script>
import ChapterHeader from "@/components/ChapterHeader.vue";
import ChapterContent from "@/components/ChapterContent.vue";
import ChapterList from "@/components/ChapterList.vue";
import { getChaptersByModule } from "@/services/chapter.service";
import { getCourses } from "@/services/course.service";
import { getModules } from "@/services/module.service";
import getCookies from "@/hooks/getCookies";

export default {
  name: "ChapterPage",
  components: {
    ChapterHeader,
    ChapterContent,
    ChapterList,
  },
  data() {
    return {
      moduleTitle: "",
      chapterTitle: "",
      chapterContent: "",
      chapterProject: "",
      chapterList: [],
      moduleId: null,
      selectedChapterIndex: 0, // Track the index of the selected chapter
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // Fetch data based on slugs in the URL
    fetchData() {
      const courseSlug = this.$route.params.courseSlug;
      const moduleSlug = this.$route.params.moduleSlug;

      getCourses((courses) => {
        const course = courses.find((c) => c.slug === courseSlug);
        if (!course) {
          console.error("Course not found");
          return;
        }
        // Now fetch modules based on the course ID
        getModules((modules) => {
          const module = modules.find(
            (m) => m.slug === moduleSlug && m.course_id === course.id
          );
          if (!module) {
            console.error("Module not found");
            return;
          }
          this.moduleId = module.id;
          this.chapterTitle = module.name;
          this.moduleTitle = module.name;
          this.chapterProject = module.project;
          this.chapterContent = module.description;
          this.fetchChapters();
        });
      });
    },

    // Fetch chapter list based on the module ID
    async fetchChapters() {
      try {
        const chapters = await getChaptersByModule(this.moduleId, getCookies("userId"));
        console.log("Raw chapters data:", chapters);
        this.chapterList = chapters.map((chapter) => ({
          ...chapter,
          id: chapter.id, // Replace `id` with a sequential number starting from 1
          completed: chapter.completed, // Add a completed property, initialize as false
        }));
        this.updateChapterContent(this.selectedChapterIndex); // Set initial content to the first chapter
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    },

    // Update content and title based on selected index
    updateChapterContent(index) {
      const chapter = this.chapterList[index];
      this.chapterTitle = chapter.name;
      this.chapterContent = chapter.content;
      this.chapterProject = chapter.name;
    },

    // Handle chapter selection from ChapterList
    handleChapterSelect(chapter) {
      const index = this.chapterList.findIndex((item) => item.id === chapter.id);
      this.selectedChapterIndex = index; // Update the selected chapter index
      this.updateChapterContent(index); // Update content based on selected chapter
    },

    // Go to the previous chapter
    goPrevious() {
      if (this.selectedChapterIndex > 0) {
        this.selectedChapterIndex--;
        this.updateChapterContent(this.selectedChapterIndex);
      }
    },

    // Go to the next chapter
    goNext() {
      if (this.selectedChapterIndex < this.chapterList.length - 1) {
        this.selectedChapterIndex++;
        this.updateChapterContent(this.selectedChapterIndex);
      }
    },

    // Mark a chapter as completed
    markChapterAsCompleted(chapterId) {
      const chapter = this.chapterList.find((item) => item.id === chapterId);
      if (chapter) {
        chapter.completed = true;
      }
    },
  },
};
</script>
