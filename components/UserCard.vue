<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseClient();
const name = computed(() => user.value?.user_metadata.full_name);
const profile = computed(() => user.value?.user_metadata.avatar_url);

const logout = async () => {
  const { error } = await auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  // A hack to clear the session cookie
  try {
    await $fetch('/api/_supabase/session', {
      method: 'POST',
      body: {
        event: 'SIGNED_OUT',
        session: null,
      },
    });
    user.value = null;
  } catch (error) {
    console.error(error);
  }

  navigateTo('/login');
};
</script>
<template>
  <div v-if="user" class="rounded p-3 flex items-center space-x-3 bg-white">
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button class="text-sm underline text-slate-500" @click="logout">
        Log out
      </button>
    </div>
  </div>
</template>
