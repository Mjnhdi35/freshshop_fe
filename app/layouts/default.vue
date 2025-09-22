<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center space-x-2">
          <UIcon name="i-heroicons-home" class="w-6 h-6" />
          <span class="font-bold text-lg">MyApp</span>
        </NuxtLink>
      </template>

      <template #right>
        <div class="flex items-center space-x-4">
          <UColorModeButton />

          <template v-if="!user">
            <UButton to="/login" variant="ghost" size="sm"> Đăng nhập </UButton>
            <UButton to="/register" size="sm"> Đăng ký </UButton>
          </template>

          <template v-else>
            <UDropdown :items="userMenuItems">
              <UAvatar
                :src="user.avatar"
                :alt="user.name"
                size="sm"
                class="cursor-pointer"
              />
            </UDropdown>
          </template>
        </div>
      </template>
    </UHeader>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <UFooter class="mt-auto">
      <template #left>
        <p class="text-sm text-gray-500">© 2024 MyApp. All rights reserved.</p>
      </template>

      <template #right>
        <div class="flex space-x-4">
          <UButton variant="ghost" size="sm" to="/design-ui">
            Design UI
          </UButton>
          <UButton variant="ghost" size="sm" to="/about"> Giới thiệu </UButton>
          <UButton variant="ghost" size="sm" to="/contact"> Liên hệ </UButton>
        </div>
      </template>
    </UFooter>

    <!-- Toast Notifications -->
    <Toast />
  </div>
</template>

<script setup>
const { user, logout, initAuth } = useAuth();

// User menu items
const userMenuItems = [
  [
    {
      label: "Hồ sơ",
      icon: "i-heroicons-user",
      click: () => navigateTo("/profile"),
    },
  ],
  [
    {
      label: "Đăng xuất",
      icon: "i-heroicons-arrow-right-on-rectangle",
      click: async () => {
        await logout();
        await navigateTo("/");
      },
    },
  ],
];

// Initialize authentication on mount
onMounted(() => {
  initAuth();
});
</script>
