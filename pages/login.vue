<script setup lang="ts">
const { title } = useCourse();
const { query } = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(async () => {
  if (user.value) {
    await navigateTo(query.redirectTo as string, {
      replace: true,
    });
  }
});

const login = async () => {
  const redirectTo = `${window.location.origin}${query.redirectTo}`;
  console.log(redirectTo);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo,
    },
  });

  if (error) {
    console.error(error);
  }
};
</script>

<template>
  <section>
    <div class="prose w-full max-w-2xl h-96">
      <h1>Log into {{ title }}</h1>
      <button
        class="bg-blue-500 text-white px-2 py-1 rounded-md mt-4"
        @click="login"
      >
        Log in with github
      </button>
    </div>
  </section>
</template>
