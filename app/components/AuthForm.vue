<template>
  <UCard class="max-w-md mx-auto">
    <template #header>
      <div class="text-center">
        <h2 class="text-2xl font-bold">
          {{ isLogin ? "Đăng nhập" : "Đăng ký" }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          {{ isLogin ? "Chào mừng bạn quay trở lại!" : "Tạo tài khoản mới" }}
        </p>
      </div>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput
          v-model="state.email"
          type="email"
          placeholder="Nhập email của bạn"
          :disabled="loading"
        />
      </UFormGroup>

      <UFormGroup label="Mật khẩu" name="password">
        <UInput
          v-model="state.password"
          type="password"
          placeholder="Nhập mật khẩu"
          :disabled="loading"
        />
      </UFormGroup>

      <UFormGroup
        v-if="!isLogin"
        label="Xác nhận mật khẩu"
        name="confirmPassword"
      >
        <UInput
          v-model="state.confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
          :disabled="loading"
        />
      </UFormGroup>

      <UFormGroup v-if="!isLogin" label="Họ tên" name="name">
        <UInput
          v-model="state.name"
          placeholder="Nhập họ tên của bạn"
          :disabled="loading"
        />
      </UFormGroup>

      <UButton type="submit" block :loading="loading" :disabled="loading">
        {{ isLogin ? "Đăng nhập" : "Đăng ký" }}
      </UButton>
    </UForm>

    <template #footer>
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?" }}
          <UButton
            variant="link"
            size="sm"
            @click="toggleMode"
            :disabled="loading"
          >
            {{ isLogin ? "Đăng ký ngay" : "Đăng nhập" }}
          </UButton>
        </p>
      </div>
    </template>
  </UCard>
</template>

<script setup>
import { z } from "zod";

const props = defineProps({
  mode: {
    type: String,
    default: "login",
    validator: (value) => ["login", "register"].includes(value),
  },
});

const emit = defineEmits(["success", "error"]);

const { login, register } = useAuth();
const { add: addToast } = useToast();

const isLogin = computed(() => props.mode === "login");
const loading = ref(false);

// Form state
const state = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
});

// Validation schema
const schema = computed(() => {
  const baseSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });

  if (isLogin.value) {
    return baseSchema;
  }

  return baseSchema
    .extend({
      confirmPassword: z.string(),
      name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"],
    });
});

// Toggle between login and register
function toggleMode() {
  const newMode = isLogin.value ? "register" : "login";
  navigateTo(`/${newMode}`);
}

// Handle form submission
async function onSubmit() {
  loading.value = true;

  try {
    let response;

    if (isLogin.value) {
      response = await login({
        email: state.email,
        password: state.password,
      });
    } else {
      response = await register({
        email: state.email,
        password: state.password,
        name: state.name,
      });
    }

    emit("success", response);

    // Redirect to profile
    await navigateTo("/profile");
  } catch (error) {
    console.error("Auth error:", error);
    emit("error", error);

    // Show error notification
    addToast({
      title: "Lỗi",
      description: error.data?.message || "Có lỗi xảy ra, vui lòng thử lại",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
}
</script>
