<template>
  <div class="flex flex-col min-h-screen bg-violet-100 max-h-[100vh] overflow-hidden text-black">
    <SubmissionHeader :moduleTitle="moduleTitle" :chapterTitle="chapterTitle" />

    <div class="flex flex-grow my-16">
      <!-- Problem Description -->
      <div class="md:mx-32 p-4 max-h-[80vh] w-full overflow-scroll overflow-x-hidden md:flex md:gap-x-60 md:justify-center">
        <section class="md:mt-[10vh]">
          <h2 class="text-3xl font-semibold mt-5 mb-2">Problem Description</h2>
          <p class="text-justify text-gray-700">{{ problemDescription }}</p>
        </section>
        <section class="md:mt-[10vh]">
          <h2 class="text-3xl font-semibold mt-5 mb-2">Submit Your Solution</h2>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label class="block text-sm font-bold mb-2" for="fileUpload">Upload File</label>
              <input
                type="file"
                id="fileUpload"
                accept=".zip,.rar,.7z,.tar.gz,.pdf"
                class="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-300"
                @change="handleFileUpload"
              />
            </div>
            <button
              type="submit"
              class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
          </form>
        </section>
      </div>

    </div>
  </div>
</template>

<script>
import SubmissionHeader from '@/components/SubmissionHeader.vue';
import { getProjectsByModuleId } from '@/services/module.service';

export default {
  name: "SubmissionPage",
  components: {
    SubmissionHeader,
  },
  data() {
    return {
      submissionTitle: "Chapter Submission",
      problemDescription: "",
      selectedFile: null,
      comment: "",
      moduleId: null,
      projects: "",
    };
  },
  async created() {
    try {
      this.moduleId = this.$route.params.moduleSlug;

      this.projects = await getProjectsByModuleId(this.moduleId);
      console.log("Fetched projects:", this.projects);

      if (this.projects.length > 0) {
        this.problemDescription = this.projects;
      } else {
        this.problemDescription = "No projects found for this module.";
      }

      console.log("Projects fetched successfully:", this.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      this.problemDescription = "Error loading project details.";
    }
  },
  methods: {
    // Handle file upload
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },

    // Handle form submission
    async handleSubmit() {
      if (!this.selectedFile) {
        alert("Please upload a file before submitting.");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("comment", this.comment);

      try {
        // Replace this URL with your submission endpoint
        const response = await fetch("/api/submit", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Submission successful!");
        } else {
          alert("Submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("An error occurred. Please try again.");
      }
    },

    goBack() {
      this.$router.go(-1); // Navigate to the previous route
    },
  },
};
</script>

<style scoped>
</style>
