<template>
  <ul class="text-white">
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
      </li>
    </ul>
  <div class="w-full min-h-screen py-5 bg-neutral-800">
    <h1 class="text-white text-center text-3xl py-5">
      Welcome to the Submissions Evaluation Page!
    </h1>
    <DataTable
      :items="items"
      :idModule="id"
    />
  </div>
</template>

<script>
import DataTable from "@/components/DataTableEval.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

import { getProjectDetails } from "@/services/project.service";

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
          console.log("Fetching project details with ID:", this.id);
          const response = await getProjectDetails(this.id); // Menggunakan id dari route params
          console.log("Response from getProjectDetails:", response);
          this.items = response;
          console.log("Items updated:", this.items);
      } catch (error) {
          console.error("Error fetching modules:", error);
      }
    },
    mounted() {
      console.log("Component is mounted");
      this.getProjects();
    }
  },
};
</script>
