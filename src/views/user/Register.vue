<script>
  export default {
    name: 'RegisterPage',
  };
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center bg-[url('https://cdni.iconscout.com/illustration/premium/thumb/coding-illustration-download-in-svg-png-gif-file-formats--html-logo-c-plus-developer-concept-based-pack-miscellaneous-illustrations-4037522.png?f=webp')]">
    <div class='w-full max-w-sm bg-slate-50 border-2 border-slate-300 py-4 px-10 rounded-xl shadow-xl'>
        <h1 class="text-3xl font-bold text-slate-700 text-center my-8">Register</h1>
        <form>
          <label for="username" class="block text-sm text-neutral-500 font-medium">Username : </label>
          <input type="text"
          name="username"
          id="username"
          className="text-sm w-full py-2 mb-3 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2"
          placeholder="John Doe"
          required
          />
          <label for="password" class="block text-sm text-neutral-500 font-medium">Password : </label>
          <input type="password"
          name="password"
          id="password"
          className="text-sm w-full py-2 mb-3 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2"
          placeholder="*******"
          required
          />
          <label for="confirmPassword" class="block text-sm text-neutral-500 font-medium">Confirm Password : </label>
          <input type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="text-sm w-full py-2 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2"
          placeholder="*******"
          required
          />
          <Button class="w-full mt-8 mb-4 flex justify-center items-center bg-violet-600 hover:bg-violet-700 px-6 h-10 rounded-[12px] text-white" type="submit" >Sign up</Button>
          <div class="flex justify-center text-center my-3">
              <p class="text-xs text-neutral-500">Sudah Punya Akun?</p>
              <a href="/login" class="pl-1 text-xs underline text-blue-500">Login</a>
          </div>
        </form>
    </div>
  </div>
</template>
