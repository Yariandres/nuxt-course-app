<script setup lang="ts">
const firstLesson = await useFirstLesson();
</script>

<template>
  <NuxtLink
    :href="firstLesson.path"
    class="bg-gray-500 text-white px-2 py-1 rounded-md mt-4"
  >
    Go to first lesson
  </NuxtLink>
</template>
