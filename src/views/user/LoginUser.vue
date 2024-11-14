<script>
  import axios from 'axios';
  import { ref } from 'vue';


  export default {
    name: 'LoginUser',
    setup() {
      const username = ref('');
      const password = ref('');
      const errorMessage = ref('');

      const login = async () => {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            username: username.value,
            password: password.value,
          }
        );
        
        if (response.data) {
            // Set JWT token in cookies
            document.cookie = `token=${response.data}; path=/; max-age=3600`;  
            // console.log('Login successful, token stored in cookies.');
            // Redirect to dashboard
            window.location.href = '/course';
        } else {
            errorMessage.value = 'Invalid username or password';
        }

        } catch (error) {
          errorMessage.value = 'Login failed. Please try again.';
          console.error(error);
        }
      };

      return {
        username,
        password,
        login,
        errorMessage,
      };
    },
  };
  
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center bg-[url('https://cdni.iconscout.com/illustration/premium/thumb/coding-illustration-download-in-svg-png-gif-file-formats--html-logo-c-plus-developer-concept-based-pack-miscellaneous-illustrations-4037522.png?f=webp')]">
    <div class='w-full max-w-sm bg-slate-50 border-2 border-slate-300 py-4 px-10 rounded-xl shadow-xl'>
        <h1 class="text-3xl font-bold text-slate-700 text-center my-8">Login</h1>
          <label for="username" class="block text-sm text-neutral-500 font-medium">Username : </label>
          <input type="text"
          name="username"
          id="username"
          className="text-sm w-full py-2 mb-3 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2"
          placeholder="John Doe"
          @change="username = $event.target.value"
          required
          />
          <label for="password" class="block text-sm text-neutral-500 font-medium">Password : </label>
          <input type="password"
          name="password"
          id="password"
          className="text-sm w-full py-2 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2"
          placeholder="*******"
          @change="password = $event.target.value"
          required
          />
          <Button class="w-full mt-8 mb-4 flex justify-center items-center bg-violet-600 hover:bg-violet-700 px-6 h-10 rounded-[12px] text-white" type="submit" @click="login">Sign in</Button>
          <div class="flex justify-center text-center my-3">
              <p class="text-xs text-neutral-500">Belum Punya Akun?</p>
              <a href="/register" class="pl-1 text-xs underline text-blue-500">Register</a>
          </div>
    </div>
  </div>
</template>
