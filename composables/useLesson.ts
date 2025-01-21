import useFetchWithCache from './useFetchWithCache';
import type { LessonWithPath } from '~/types/course';

export default async (chapterSlug: string, lessonSlug: string) =>
  // use sessionStorage to cache the lesson
  useFetchWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );
