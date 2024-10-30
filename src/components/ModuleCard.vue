<template>
  <div class="w-full border-2 border-slate-300 rounded-lg shadow-xl">
    <img :src="imgSrc" alt="Module image" class="w-full h-[250px] object-cover rounded-t-lg">
    <div class="p-5 pb-10">
      <h1 class="text-2xl font-bold mb-3">{{ title }}</h1>
      <p class="mb-3">{{ description }}</p>
      <ul class="text-violet-500 mb-7 font-medium">
        <li>{{ chapter }} Chapter</li>
        <li>23,000 Views</li>
        <li>&#9733; 4.78/5.00</li>
      </ul>
      <a class="group relative inline-block focus:outline-none focus:ring" :href="link">
        <span
          class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-purple-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
        ></span>
        <span
          class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
        >
          Enroll
        </span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModuleCardComponent",
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    chapter: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
};
</script>
