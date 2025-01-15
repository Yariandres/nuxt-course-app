<script setup lang="ts">
const course = useCourse();
definePageMeta({
  layout: 'default',
});

const resetError = (error: Error) => {
  error.value = null;
};
</script>

<template>
  <div class="prose mb-12">
    <h1>
      <span class="font-medium">
        Course:
        <span class="font-bold">Mastering Nuxt 3</span>
      </span>
    </h1>
  </div>
  <div class="flex flex-row justify-center flex-grow">
    <div
      class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
    >
      <h3 class="mb-4">Chapters</h3>
      <hr class="my-4" />
      <ul class="list-none p-0 m-0 flex flex-col gap-4">
        <li v-for="chapter in course.chapters" :key="chapter.slug">
          <h4 class="text-sm text-gray-900 font-bold">{{ chapter.title }}</h4>

          <NuxtLink
            v-for="lesson in chapter.lessons"
            :key="lesson.slug"
            :to="lesson.path"
            class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1"
            :class="{
              'text-blue-500': lesson.path === $route.path,
            }"
          >
            <span class="text-gray-500"> {{ lesson.number }}. </span>
            <span class="text-sm font-normal">
              {{ lesson.title }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="prose p-12 bg-white rounded-md w-[65ch]">
      <NuxtErrorBoundary>
        <NuxtPage />
        <template #error="{ error }">
          <div class="prose">
            <h1>Oh no! Something went wrong with the lesson</h1>
            <p v-if="error" class="text-red-500">
              {{ error }}
            </p>
            <button
              class="hover:cursor-pointer bg-gray-500 text-white px-2 py-1 rounded-md mt-4"
              @click="resetError(error)"
            >
              Reset
            </button>
          </div>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-blue-500;
}
</style>
