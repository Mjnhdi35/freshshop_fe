<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="text-center py-20">
      <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Chào mừng đến với MyApp
      </h1>
      <p
        class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
      >
        Nền tảng hiện đại với giao diện đẹp mắt và trải nghiệm người dùng tuyệt
        vời
      </p>
      <div class="flex justify-center space-x-4">
        <UButton v-if="!user" to="/register" size="lg" class="px-8">
          Bắt đầu ngay
        </UButton>
        <UButton
          v-if="!user"
          to="/login"
          variant="outline"
          size="lg"
          class="px-8"
        >
          Đăng nhập
        </UButton>
        <UButton v-if="user" to="/profile" size="lg" class="px-8">
          Xem hồ sơ
        </UButton>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Tính năng nổi bật
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Khám phá những tính năng tuyệt vời của chúng tôi
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UCard class="text-center">
          <template #header>
            <UIcon
              name="i-heroicons-shield-check"
              class="w-12 h-12 mx-auto text-blue-500"
            />
          </template>
          <h3 class="text-xl font-semibold mb-2">Bảo mật cao</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Dữ liệu của bạn được bảo vệ với công nghệ mã hóa tiên tiến
          </p>
        </UCard>

        <UCard class="text-center">
          <template #header>
            <UIcon
              name="i-heroicons-bolt"
              class="w-12 h-12 mx-auto text-green-500"
            />
          </template>
          <h3 class="text-xl font-semibold mb-2">Tốc độ nhanh</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Trải nghiệm mượt mà với tốc độ tải trang cực nhanh
          </p>
        </UCard>

        <UCard class="text-center">
          <template #header>
            <UIcon
              name="i-heroicons-device-phone-mobile"
              class="w-12 h-12 mx-auto text-purple-500"
            />
          </template>
          <h3 class="text-xl font-semibold mb-2">Responsive</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Hoạt động hoàn hảo trên mọi thiết bị từ desktop đến mobile
          </p>
        </UCard>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-gray-100 dark:bg-gray-800 rounded-2xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Thống kê ấn tượng
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            10K+
          </div>
          <div class="text-gray-600 dark:text-gray-400">Người dùng</div>
        </div>
        <div>
          <div
            class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2"
          >
            99.9%
          </div>
          <div class="text-gray-600 dark:text-gray-400">Uptime</div>
        </div>
        <div>
          <div
            class="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2"
          >
            24/7
          </div>
          <div class="text-gray-600 dark:text-gray-400">Hỗ trợ</div>
        </div>
        <div>
          <div
            class="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2"
          >
            5★
          </div>
          <div class="text-gray-600 dark:text-gray-400">Đánh giá</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Set page meta
definePageMeta({
  title: "Trang chủ",
});

const { user, initAuth } = useAuth();

// Initialize authentication on mount
onMounted(() => {
  initAuth();
});
</script>
