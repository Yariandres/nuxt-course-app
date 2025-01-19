import course from '~/server/courseData.js';
import type { Course, Lesson, LessonWithPath, Chapter } from '~/types/course';

course as Course;

export default defineEventHandler((event): LessonWithPath => {
  const { chapterSlug, lessonSlug } = event.context.params;

  const chapter: Maybe<Chapter> = course.chapters.find(
    (chapter: any) => chapter.slug === chapterSlug
  );

  if (!chapter) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Chapter not found',
    });
  }

  const lesson: Maybe<Lesson> = chapter?.lessons.find(
    (lesson: any) => lesson.slug === lessonSlug
  );

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lesson not found',
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
});
