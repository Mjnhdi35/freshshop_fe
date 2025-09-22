<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <Transition
        v-for="toast in toasts"
        :key="toast.id"
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          :class="[
            'max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
            getToastColor(toast.color),
          ]"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <UIcon
                  :name="getToastIcon(toast.color)"
                  :class="['h-5 w-5', getToastIconColor(toast.color)]"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ toast.title }}
                </p>
                <p
                  v-if="toast.description"
                  class="mt-1 text-sm text-gray-500 dark:text-gray-400"
                >
                  {{ toast.description }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="remove(toast.id)"
                >
                  <span class="sr-only">Đóng</span>
                  <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
const { toasts, remove } = useToast();

function getToastColor(color: string) {
  const colors = {
    green: "border-l-4 border-green-400",
    red: "border-l-4 border-red-400",
    blue: "border-l-4 border-blue-400",
    yellow: "border-l-4 border-yellow-400",
    gray: "border-l-4 border-gray-400",
  };
  return colors[color] || colors.gray;
}

function getToastIcon(color: string) {
  const icons = {
    green: "i-heroicons-check-circle",
    red: "i-heroicons-x-circle",
    blue: "i-heroicons-information-circle",
    yellow: "i-heroicons-exclamation-triangle",
    gray: "i-heroicons-information-circle",
  };
  return icons[color] || icons.gray;
}

function getToastIconColor(color: string) {
  const colors = {
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
    yellow: "text-yellow-400",
    gray: "text-gray-400",
  };
  return colors[color] || colors.gray;
}
</script>
