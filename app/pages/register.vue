<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <AuthForm mode="register" @success="handleSuccess" @error="handleError" />
    </div>
  </div>
</template>

<script setup>
// Set page meta
definePageMeta({
  layout: false,
  title: "Đăng ký",
});

// Handle successful registration
function handleSuccess(response) {
  console.log("Registration successful:", response);
}

// Handle registration error
function handleError(error) {
  console.error("Registration error:", error);
}
</script>
