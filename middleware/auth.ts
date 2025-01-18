export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  const router = useRouter();
  if (user.value || to.params.chapterSlug === '1-chapter-1') {
    return;
  }

  return router.push(`/login?redirectTo=${to.path}`);

  // Does not work
  // return navigateTo(`/login?redirectTo=${to.path}`);
});
