<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <AuthForm mode="login" @success="handleSuccess" @error="handleError" />
    </div>
  </div>
</template>

<script setup>
// Set page meta
definePageMeta({
  layout: false,
  title: "Đăng nhập",
});

// Handle successful login
function handleSuccess(response) {
  console.log("Login successful:", response);
}

// Handle login error
function handleError(error) {
  console.error("Login error:", error);
}
</script>
