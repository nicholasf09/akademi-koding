<template>
  <div class="w-full h-full border-2 border-slate-300 rounded-lg p-7 shadow-xl">
    <div class="h-full flex flex-col justify-between">
      <div class="pb-10 flex justify-end">
        <div class="w-[60px] h-[60px]">
          <img :src="'data:image/png;base64,' + icon" class="w-full h-full" />
        </div>
      </div>
      <div class="h-full">
        <h1 class="text-3xl font-bold mb-3">{{ title }}</h1>
        <p class="mb-7">{{ description }}</p>
      </div>

      <div>
        <a :href="link" class="group relative inline-block focus:outline-none focus:ring">
          <span
            class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-purple-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>
          <span
            class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
          >
            Learn More
          </span>
        </a>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "CourseCardComponent",
  props: {
    icon: {
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
    link: {
      type: String,
      required: true,
    },
  },
};
</script>

