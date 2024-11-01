<template>
  <div class="w-full h-[70px] bg-white flex justify-between items-center shadow-lg px-[70px] fixed z-10">
    <h1 class="font-bold text-2xl text-violet-500">AKADEMI KODING</h1>
    <ul class="flex ml-5">
      <li><a href="/" class="ml-7 font-semibold text-neutral-500 hover:text-black">Home</a></li>
      <li><a href="/course" class="ml-7 font-semibold text-neutral-500 hover:text-black">Courses</a></li>
      <li><a href="#" class="ml-7 font-semibold text-neutral-500 hover:text-black">Sign in</a></li>
      <li><a href="#" class="ml-7 font-semibold text-neutral-500 hover:text-black">Sign up</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavbarComponent',
};
</script>
