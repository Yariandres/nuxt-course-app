<script setup lang="ts">
const error = useError();

const resetError = () => {
  clearError({
    redirect:
      '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3',
  });
};
</script>

<template>
  <NuxtLayout>
    <div v-if="error?.statusCode === 404">
      <h1 class="text-4xl font-bold">404</h1>
      <p>This page does not exist</p>
    </div>

    <div v-else>
      <h1>500</h1>
      <p>Something went wrong</p>
    </div>

    <div class="prose mt-4">
      <p>Oh no! Something went wrong</p>
      <p>Sorry about that!</p>
      <p class="text-red-500 font-bold">{{ error?.message }}</p>

      <button
        class="hover:cursor-pointer bg-gray-500 text-white px-2 py-1 rounded-md mt-4"
        @click="resetError"
      >
        Reset
      </button>
    </div>
  </NuxtLayout>
</template>
