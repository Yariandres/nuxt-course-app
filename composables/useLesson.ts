export default async (chapterSlug: string, lessonSlug: string) => {
  // use session to get the user id
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data, error } = await useFetch(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );

  if (error.value) {
    throw createError({
      ...error.value,
      statusCode: 404,
      statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
    });
  }

  return data;
};
