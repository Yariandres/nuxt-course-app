import { StorageSerializers } from '@vueuse/core';

export default async <T>(url: string) => {
  // use sessionStorage to cache the lesson
  const cache = useSessionStorage<T>(url, null, {
    // by passing null as a default value, it cant automatically determine which serializer to use
    serializer: StorageSerializers.object,
  });

  if (!cache.value) {
    const { data, error } = await useFetch<T>(url);
    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch ${url}`,
      });
    }

    cache.value = data.value as T;
  } else {
    console.log(`Getting ${url} from cache`);
  }

  return cache.value;
};
