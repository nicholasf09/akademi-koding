<script setup>
    import { defineEmits } from 'vue';

    const emit = defineEmits(['search']);

    const search = (e) => {
        emit('search', e.target.value);
    }
</script>

<template>
  <form action="" class="mb-5 mt-5">
    <div>
        <input type="text" @input="search" placeholder="Search" class="border-2 p-1 rounded-xl shadow-md hover:shadow-lg">
    </div>
  </form>
</template>