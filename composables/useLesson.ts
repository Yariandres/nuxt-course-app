import type { LessonWithPath } from '~/types/course';
import { StorageSerializers } from '@vueuse/core';

export default async (chapterSlug: string, lessonSlug: string) => {
  // use sessionStorage to cache the lesson
  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;
  const lesson = useSessionStorage<LessonWithPath>(url, null, {
    // by passing null as a default value, it cant automatically determine which serializer to use
    serializer: StorageSerializers.object,
  });

  if (!lesson.value) {
    const { data, error } = await useFetch<LessonWithPath>(url);
    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
      });
    }

    lesson.value = data.value;
  } else {
    console.log(
      `Getting lesson ${lessonSlug} in chapter ${chapterSlug} from cache`
    );
  }

  return lesson.value;
};
