<template>
  <div class="flex flex-col min-h-screen bg-violet-100 max-h-[100vh] overflow-hidden text-black">
    <SubmissionHeader :moduleTitle="moduleTitle" :chapterTitle="chapterTitle" />

    <div class="flex flex-grow my-16">
      <!-- Problem Description -->
      <div class="md:mx-36 p-4 max-h-[80vh] w-full overflow-scroll overflow-x-hidden md:flex md:gap-x-16 md:justify-center">
        <section class="md:mt-[10vh]  w-2/3">
          <h2 class="text-3xl font-semibold mt-5 mb-2">Problem Description</h2>
          <p class="text-justify text-gray-700">{{ problemDescription }}</p>
        </section>
        <section class="md:mt-[10vh] w-1/3 ">
          <h2 class="text-3xl font-semibold mt-5 mb-2">Your Solution</h2>
          <!-- Check if there is existing project data -->
          <div  v-if="projectByUser && projectByUser.length === 0">
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label class="block text-sm font-bold mb-2" for="fileUpload">Upload File</label>
                <input
                  type="file"
                  id="fileUpload"
                  accept=".zip"
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
          </div>

          <div v-else>
            <h3 class="text-2xl">Score: {{ projectComment }}</h3>
            <p class="mt-2 mb-8">Comment: {{ projectScore }}</p>
            <a :href="projectLink" target="_blank" class="text-white bg-violet-500 hover:bg-violet-700 rounded py-2  px-4">
              View Submission
            </a>
          </div>
        </section>
      </div>

    </div>
  </div>
</template>

<script>
import SubmissionHeader from '@/components/SubmissionHeader.vue';
import { submitProject, getProjectByUser } from "@/services/project.service";
import { getModuleIdBySlug } from '@/services/module.service';
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
        projectByUser: "",
        projectComment: "",
        projectScore: "",
        projectLink: "",
      };
    },
    async created() {
      try {
        this.moduleId = this.$route.params.moduleSlug;

        this.projects = await getProjectsByModuleId(this.moduleId);

        this.problemDescription = this.projects;

        const userId = sessionStorage.getItem("userId");

        // Extract the moduleSlug from the URL
        const moduleSlug = window.location.pathname.split("/")[3]; // Extracting from the URL path

        // Get the moduleId using the moduleSlug
        const moduleIdObject = await getModuleIdBySlug(moduleSlug);
        const moduleId = moduleIdObject.module_id;


        const response = await getProjectByUser(userId, moduleId);
        this.projectByUser = response.module_id || [];
        console.log("Project by user:", this.projectByUser);
        if (this.projectByUser.length > 0 && this.projectByUser[0].comment !== null) {
          this.projectComment = this.projectByUser[0].comment;
          this.projectScore = this.projectByUser[0].score;
          this.projectLink = this.projectByUser[0].link;
        } else {
          this.projectComment = "No score yet! Please Wait!";
          this.projectScore = "Your assesment is still being checked!"
          this.projectLink = "#";
        }

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

      async handleSubmit() {
        if (!this.selectedFile) {
          alert("Please upload a file before submitting.");
          return;
        }

        // Convert file to base64
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64File = reader.result.split(',')[1]; // Get base64 string part

          // Prepare the JSON payload
          const payload = {
            file_name: this.selectedFile.name,
            file_content: base64File,
            comment: this.comment,
          };

          try {
            const lambdaEndpoint = "https://nsaurjqvw6vkt5all2fkagw7me0obmbx.lambda-url.us-east-1.on.aws/";

            const response = await fetch(lambdaEndpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload), // Send the payload as JSON
            });

            if (response.ok) {
              const responseData = await response.json();
              const s3Link = responseData.s3_link; // Assuming the link is in the response

              alert("Submission successful!");

              // Get userId from sessionStorage
              const userId = sessionStorage.getItem("userId");

              // Extract the moduleSlug from the URL
              const moduleSlug = window.location.pathname.split("/")[3]; // Extracting from the URL path

              // Get the moduleId using the moduleSlug
              const moduleIdObject = await getModuleIdBySlug(moduleSlug);
              const moduleId = moduleIdObject.module_id;

              alert("Module ID:" + moduleId + "User ID:" + userId + "S3 Link:" + s3Link);


              // Save the project to the database
              await submitProject(userId, moduleId, s3Link);

              alert("Project saved successfully!");
            } else {
              const errorResponse = await response.json();
              alert("Submission failed: " + errorResponse.message);
            }
          } catch (error) {
            console.error("Error submitting the form:", error);
            alert("An error occurred. Please try again.");
          }
        };

        reader.readAsDataURL(this.selectedFile); // Read the file as base64
      },
    },
  };
</script>

<style scoped>
</style>
