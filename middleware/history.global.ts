export default defineNuxtRouteMiddleware((to, from) => {
  const navigationHistory = useLocalStorage('history', []);
  navigationHistory.value.push(to.path);
  // console.log(`navigation History, ${navigationHistory.value.join('\n')}`);
});
