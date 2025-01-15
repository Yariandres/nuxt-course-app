<script setup lang="ts">
const course = useCourse();
const route = useRoute();

const chapter = computed(() => {
  return course.chapters.find(
    (chapter: any) => chapter.slug === route.params.chapterSlug
  );
});

if (!chapter.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Chapter not found',
  });
}

const lesson = computed(() => {
  return chapter.value?.lessons.find(
    (lesson: any) => lesson.slug === route.params.lessonSlug
  );
});

if (!lesson.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Lesson not found',
  });
}

const title = computed(() => {
  return `${lesson.value?.title} - ${chapter.value?.number}`;
});

useHead({
  title,
});

const progress = useLocalStorage('progress', []);

const isLessonCompleted = computed(() => {
  if (!progress.value[chapter.value?.number - 1]) return false;
  if (!progress.value[chapter.value?.number - 1][lesson.value?.number - 1]) {
    return false;
  }

  return progress.value[chapter.value?.number - 1][lesson.value?.number - 1];
});

const toggleComplete = () => {
  if (!progress.value[chapter.value?.number - 1]) {
    progress.value[chapter.value?.number - 1] = [];
  }

  progress.value[chapter.value?.number - 1][lesson.value?.number - 1] =
    !isLessonCompleted.value;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter?.number }} - {{ lesson?.number }}
    </p>
    <h2 class="my-0">{{ lesson?.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson?.sourceUrl"
        class="font-normal text-md text-gray-500 underline"
        :to="lesson?.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        v-if="lesson?.downloadUrl"
        class="font-normal text-md text-gray-500 underline"
        :to="lesson?.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer :videoId="lesson?.videoId" />
    <p>{{ lesson?.text }}</p>
    <div>
      <LessonComplete
        v-model="isLessonCompleted"
        @update:modelValue="toggleComplete"
      />
    </div>
  </div>
</template>
