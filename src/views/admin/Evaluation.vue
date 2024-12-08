<template>
  <div class="w-full min-h-screen py-5 bg-neutral-800">
    <h1 class="text-white text-center text-3xl py-5">
      Welcome to the Submissions Evaluation Page!
    </h1>
    <DataTable
      :items="items"
      :idModule="id"
      @update-item="updateItem"
    />
  </div>
</template>

<script>
import DataTable from "@/components/DataTableEval.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

import { getProjectDetails, updateProject } from "@/services/project.service";

export default {
  name: "ProjectAdmin",
  components: {
    DataTable,
  },
  setup() {
    const route = useRoute();
    const items = ref([]);
    const id = ref(route.params.idModule);

    return {
      items,
      id,
    };
  },
  methods: {
    async getProjects() {
      try {
          const response = await getProjectDetails(this.id); // Menggunakan id dari route params
          console.log("Response from getProjectDetails:", response);
          this.items = response;
          console.log("Items updated:", this.items);
      } catch (error) {
          console.error("Error fetching modules:", error);
      }
    },
    async updateItem(item) { // Menerima item sebagai objek
      try {
          const { id, comment, score } = item; // Destrukturisasi nilai-nilai dari objek
          console.log("Updating item with ID:", id);
          const response = await updateProject(id, comment, score); // Memanggil fungsi updateProject
          console.log("Response from updateProject:", response);

          this.getProjects(); // Panggil ulang getProjects untuk menyegarkan data
      } catch (error) {
          console.error("Error updating project:", error);
      }
    },
  },
    mounted() {
      console.log("Component is mounted");
      this.getProjects();
    }
};
</script>
