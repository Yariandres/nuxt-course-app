import course from '~/server/courseData.js';
import type { Course, Chapter } from '~/types/course';

course as Course;

type OutLineBase = {
  title: string;
  slug: string;
  number: number;
};

type OutLineChapter = OutLineBase & {
  lessons: OutLineBase[];
};

type OutLineLesson = OutLineBase & {
  path: string;
};

type CourseMeta = {
  title: string;
  chapters: OutLineChapter[];
};

export default defineEventHandler((event): CourseMeta => {
  const outline: OutLineChapter[] = course.chapters.reduce(
    (prev: OutLineChapter[], next: Chapter) => {
      const lessons: OutLineLesson[] = next.lessons.map((lesson) => ({
        title: lesson.title,
        slug: lesson.slug,
        number: lesson.number,
        path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`,
      }));

      const chapter: OutLineChapter = {
        title: next.title,
        slug: next.slug,
        number: next.number,
        lessons,
      };

      return [...prev, chapter];
    },
    []
  );

  return {
    title: course.title,
    chapters: outline,
  };
});
