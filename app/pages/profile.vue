<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Hồ sơ cá nhân
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Quản lý thông tin tài khoản của bạn
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Profile Info Card -->
      <UCard class="lg:col-span-2">
        <template #header>
          <h2 class="text-xl font-semibold">Thông tin cá nhân</h2>
        </template>

        <UForm
          :schema="profileSchema"
          :state="profileState"
          class="space-y-6"
          @submit="updateProfile"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup label="Họ tên" name="name">
              <UInput
                v-model="profileState.name"
                placeholder="Nhập họ tên"
                :disabled="loading"
              />
            </UFormGroup>

            <UFormGroup label="Email" name="email">
              <UInput
                v-model="profileState.email"
                type="email"
                placeholder="Nhập email"
                :disabled="loading"
              />
            </UFormGroup>
          </div>

          <UFormGroup label="Số điện thoại" name="phone">
            <UInput
              v-model="profileState.phone"
              placeholder="Nhập số điện thoại"
              :disabled="loading"
            />
          </UFormGroup>

          <UFormGroup label="Địa chỉ" name="address">
            <UTextarea
              v-model="profileState.address"
              placeholder="Nhập địa chỉ"
              :disabled="loading"
              :rows="3"
            />
          </UFormGroup>

          <UFormGroup label="Giới thiệu" name="bio">
            <UTextarea
              v-model="profileState.bio"
              placeholder="Giới thiệu về bản thân"
              :disabled="loading"
              :rows="4"
            />
          </UFormGroup>

          <div class="flex justify-end">
            <UButton type="submit" :loading="loading" :disabled="loading">
              Cập nhật thông tin
            </UButton>
          </div>
        </UForm>
      </UCard>

      <!-- Avatar & Quick Actions -->
      <div class="space-y-6">
        <!-- Avatar Card -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Ảnh đại diện</h3>
          </template>

          <div class="text-center space-y-4">
            <UAvatar
              :src="profileState.avatar"
              :alt="profileState.name"
              size="3xl"
              class="mx-auto"
            />

            <UButton
              variant="outline"
              size="sm"
              @click="uploadAvatar"
              :disabled="loading"
            >
              <UIcon name="i-heroicons-camera" class="w-4 h-4 mr-2" />
              Thay đổi ảnh
            </UButton>
          </div>
        </UCard>

        <!-- Change Password Card -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Bảo mật</h3>
          </template>

          <UForm
            :schema="passwordSchema"
            :state="passwordState"
            class="space-y-4"
            @submit="changePassword"
          >
            <UFormGroup label="Mật khẩu hiện tại" name="currentPassword">
              <UInput
                v-model="passwordState.currentPassword"
                type="password"
                placeholder="Nhập mật khẩu hiện tại"
                :disabled="passwordLoading"
              />
            </UFormGroup>

            <UFormGroup label="Mật khẩu mới" name="newPassword">
              <UInput
                v-model="passwordState.newPassword"
                type="password"
                placeholder="Nhập mật khẩu mới"
                :disabled="passwordLoading"
              />
            </UFormGroup>

            <UFormGroup label="Xác nhận mật khẩu" name="confirmPassword">
              <UInput
                v-model="passwordState.confirmPassword"
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                :disabled="passwordLoading"
              />
            </UFormGroup>

            <UButton
              type="submit"
              block
              :loading="passwordLoading"
              :disabled="passwordLoading"
            >
              Đổi mật khẩu
            </UButton>
          </UForm>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { z } from "zod";

// Set page meta
definePageMeta({
  title: "Hồ sơ cá nhân",
  middleware: "auth",
});

const {
  user,
  updateProfile: updateUserProfile,
  changePassword: changeUserPassword,
} = useAuth();
const { add: addToast } = useToast();

const loading = ref(false);
const passwordLoading = ref(false);

// Profile form state
const profileState = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
  bio: "",
  avatar: "",
});

// Password form state
const passwordState = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Validation schemas
const profileSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

// Load user profile
async function loadProfile() {
  if (user.value) {
    Object.assign(profileState, user.value);
  }
}

// Update profile
async function updateProfile() {
  loading.value = true;

  try {
    await updateUserProfile(profileState);

    addToast({
      title: "Thành công",
      description: "Cập nhật thông tin thành công",
      color: "green",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    addToast({
      title: "Lỗi",
      description: error.data?.message || "Có lỗi xảy ra khi cập nhật",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
}

// Change password
async function changePassword() {
  passwordLoading.value = true;

  try {
    await changeUserPassword(
      passwordState.currentPassword,
      passwordState.newPassword,
    );

    // Reset form
    Object.assign(passwordState, {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    addToast({
      title: "Thành công",
      description: "Đổi mật khẩu thành công",
      color: "green",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    addToast({
      title: "Lỗi",
      description: error.data?.message || "Có lỗi xảy ra khi đổi mật khẩu",
      color: "red",
    });
  } finally {
    passwordLoading.value = false;
  }
}

// Upload avatar
async function uploadAvatar() {
  // This would typically open a file picker and upload to your backend
  addToast({
    title: "Thông báo",
    description: "Tính năng upload ảnh đang được phát triển",
    color: "blue",
  });
}

// Load profile on mount
onMounted(() => {
  loadProfile();
});
</script>
