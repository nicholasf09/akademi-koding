<template>
    <div class="w-full h-screen bg-gray-200">
      <h1>Welcome to the Admin Page!</h1>
        <DataTable :items="items"/>
    </div>
</template>

<script>
    import DataTable from '@/components/DataTable.vue';
    import { onMounted } from 'vue';

    onMounted(() => {
        console.log('Component is mounted');
    });

    export default {
        name: 'DashboardAdmin', 
        components: {
            DataTable
        },
        data() {
        return {
                items: [
                    { id: 1, course: 'Data Science'},
                    { id: 2, course: 'Web Development'},
                    { id: 3, course: 'Machine Learning'},
                ],
            };
        },
    };
</script>


  
