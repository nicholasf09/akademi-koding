<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'RegisterPage',
  setup() {
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match.';
        return;
      }

      try {
        const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
        const response = await axios.post(`${API_ENDPOINT}/add/user`, {
          username: username.value,
          password: password.value,
        });

        if (response.status === 201) {
          successMessage.value = 'Registration successful! Please log in.';
          errorMessage.value = '';
          username.value = '';
          password.value = '';
          confirmPassword.value = '';
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          errorMessage.value = 'Username already exists.';
        } else {
          errorMessage.value = 'An error occurred during registration.';
        }
        successMessage.value = '';
      }
    };

    return {
      username,
      password,
      confirmPassword,
      errorMessage,
      successMessage,
      register,
    };
  },
};
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center bg-[url('https://cdni.iconscout.com/illustration/premium/thumb/coding-illustration-download-in-svg-png-gif-file-formats--html-logo-c-plus-developer-concept-based-pack-miscellaneous-illustrations-4037522.png?f=webp')]">
    <div class="w-full max-w-sm bg-slate-50 border-2 border-slate-300 py-4 px-10 rounded-xl shadow-xl">
      <h1 class="text-3xl font-bold text-slate-700 text-center my-8">Register</h1>
      <form @submit.prevent="register">
        <label for="username" class="block text-sm text-neutral-500 font-medium">Username:</label>
        <input type="text" id="username" placeholder="John Doe" v-model="username" class="w-full py-2 mb-3 bg-slate-50 border-b focus:outline-none" required />

        <label for="password" class="block text-sm text-neutral-500 font-medium">Password:</label>
        <input type="password" id="password" placeholder="******" v-model="password" class="w-full py-2 mb-3 bg-slate-50 border-b focus:outline-none" required />

        <label for="confirmPassword" class="block text-sm text-neutral-500 font-medium">Confirm Password:</label>
        <input type="password" id="confirmPassword" placeholder="******" v-model="confirmPassword" class="w-full py-2 mb-3 bg-slate-50 border-b focus:outline-none" required />

        <button type="submit" class="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded">Sign Up</button>

        <p v-if="errorMessage" class="mt-4 text-red-500 text-sm">{{ errorMessage }}</p>
        <p v-if="successMessage" class="mt-4 text-green-500 text-sm">{{ successMessage }}</p>

        <div class="flex justify-center text-center mt-6">
          <p class="text-xs text-neutral-500">Already have an account?</p>
          <a href="/login" class="pl-1 text-xs underline text-blue-500">Login</a>
        </div>
      </form>
    </div>
  </div>
</template>
