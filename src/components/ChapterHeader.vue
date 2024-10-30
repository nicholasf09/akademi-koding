<template>
    <div class="text-black p-4  flex items-center fixed w-full top-0 border-b bg-violet-100 border-gray-700 z-50">
        <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" @click="goBack">Back</button>
        <h1 class="text-lg font-semibold mx-8 cursor-pointer">Belajar Dasar Pemrograman JavaScript</h1>
    </div>
    <div class="text-black p-4 flex items-center justify-between fixed border-t bg-violet-100 border-gray-700  w-full bottom-0 z-50">
        <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" @click="goBack">Previous</button>
        <h1 class="text-md font-semibold mr-2 cursor-pointer text-center">Pengantar Gerbang Dunia</h1>
        <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" @click="goBack">Next</button>

    </div>
  </template>
  
  <script>
  export default {
    name: "ForumHeader",
  };
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  