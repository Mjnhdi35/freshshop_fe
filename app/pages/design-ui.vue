<template>
  <div class="max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Design UI Components
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Test và showcase các components từ Nuxt UI
      </p>
    </div>

    <!-- Buttons Section -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Buttons</h2>
      </template>

      <div class="space-y-6">
        <!-- Button Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Variants</h3>
          <div class="flex flex-wrap gap-3">
            <UButton>Default</UButton>
            <UButton variant="outline">Outline</UButton>
            <UButton variant="soft">Soft</UButton>
            <UButton variant="ghost">Ghost</UButton>
            <UButton variant="link">Link</UButton>
            <UButton variant="solid">Solid</UButton>
          </div>
        </div>

        <!-- Button Colors -->
        <div>
          <h3 class="text-lg font-medium mb-3">Colors</h3>
          <div class="flex flex-wrap gap-3">
            <UButton color="primary">Primary</UButton>
            <UButton color="gray">Gray</UButton>
            <UButton color="green">Green</UButton>
            <UButton color="red">Red</UButton>
            <UButton color="blue">Blue</UButton>
            <UButton color="yellow">Yellow</UButton>
            <UButton color="purple">Purple</UButton>
            <UButton color="pink">Pink</UButton>
          </div>
        </div>

        <!-- Button Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Sizes</h3>
          <div class="flex flex-wrap items-center gap-3">
            <UButton size="xs">Extra Small</UButton>
            <UButton size="sm">Small</UButton>
            <UButton size="md">Medium</UButton>
            <UButton size="lg">Large</UButton>
            <UButton size="xl">Extra Large</UButton>
          </div>
        </div>

        <!-- Button States -->
        <div>
          <h3 class="text-lg font-medium mb-3">States</h3>
          <div class="flex flex-wrap gap-3">
            <UButton>Normal</UButton>
            <UButton loading>Loading</UButton>
            <UButton disabled>Disabled</UButton>
            <UButton icon="i-heroicons-heart">With Icon</UButton>
            <UButton trailing-icon="i-heroicons-arrow-right"
              >Trailing Icon</UButton
            >
          </div>
        </div>
      </div>
    </UCard>

    <!-- Form Components Section -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Form Components</h2>
      </template>

      <div class="space-y-6">
        <!-- Inputs -->
        <div>
          <h3 class="text-lg font-medium mb-3">Inputs</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup label="Text Input">
              <UInput placeholder="Nhập text..." />
            </UFormGroup>

            <UFormGroup label="Email Input">
              <UInput type="email" placeholder="email@example.com" />
            </UFormGroup>

            <UFormGroup label="Password Input">
              <UInput type="password" placeholder="Mật khẩu..." />
            </UFormGroup>

            <UFormGroup label="Number Input">
              <UInput type="number" placeholder="123" />
            </UFormGroup>
          </div>
        </div>

        <!-- Textarea -->
        <div>
          <h3 class="text-lg font-medium mb-3">Textarea</h3>
          <UFormGroup label="Message">
            <UTextarea placeholder="Nhập tin nhắn của bạn..." :rows="4" />
          </UFormGroup>
        </div>

        <!-- Select -->
        <div>
          <h3 class="text-lg font-medium mb-3">Select</h3>
          <UFormGroup label="Choose Option">
            <USelect
              v-model="selectedOption"
              :options="selectOptions"
              placeholder="Chọn một option..."
            />
          </UFormGroup>
        </div>

        <!-- Checkbox & Radio -->
        <div>
          <h3 class="text-lg font-medium mb-3">Checkbox & Radio</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h4 class="font-medium">Checkboxes</h4>
              <UCheckbox v-model="checkbox1" label="Option 1" />
              <UCheckbox v-model="checkbox2" label="Option 2" />
              <UCheckbox v-model="checkbox3" label="Option 3" />
            </div>

            <div class="space-y-3">
              <h4 class="font-medium">Radio Buttons</h4>
              <URadio v-model="radioValue" value="option1" label="Option 1" />
              <URadio v-model="radioValue" value="option2" label="Option 2" />
              <URadio v-model="radioValue" value="option3" label="Option 3" />
            </div>
          </div>
        </div>

        <!-- Switch -->
        <div>
          <h3 class="text-lg font-medium mb-3">Switch</h3>
          <div class="space-y-3">
            <USwitch v-model="switch1" label="Enable notifications" />
            <USwitch v-model="switch2" label="Dark mode" />
            <USwitch v-model="switch3" label="Auto-save" />
          </div>
        </div>
      </div>
    </UCard>

    <!-- Data Display Section -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Data Display</h2>
      </template>

      <div class="space-y-6">
        <!-- Badges -->
        <div>
          <h3 class="text-lg font-medium mb-3">Badges</h3>
          <div class="flex flex-wrap gap-3">
            <UBadge>Default</UBadge>
            <UBadge color="green">Success</UBadge>
            <UBadge color="red">Error</UBadge>
            <UBadge color="blue">Info</UBadge>
            <UBadge color="yellow">Warning</UBadge>
            <UBadge variant="soft" color="purple">Soft Purple</UBadge>
            <UBadge variant="outline" color="gray">Outline</UBadge>
          </div>
        </div>

        <!-- Avatars -->
        <div>
          <h3 class="text-lg font-medium mb-3">Avatars</h3>
          <div class="flex flex-wrap items-center gap-4">
            <UAvatar
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="Avatar"
            />
            <UAvatar
              size="sm"
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="Small"
            />
            <UAvatar
              size="lg"
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="Large"
            />
            <UAvatar
              size="xl"
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="XL"
            />
            <UAvatar
              size="2xl"
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="2XL"
            />
            <UAvatar
              size="3xl"
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="3XL"
            />
          </div>
        </div>

        <!-- Progress -->
        <div>
          <h3 class="text-lg font-medium mb-3">Progress</h3>
          <div class="space-y-4">
            <UProgress :value="25" />
            <UProgress :value="50" color="green" />
            <UProgress :value="75" color="blue" />
            <UProgress :value="100" color="red" />
          </div>
        </div>

        <!-- Stats -->
        <div>
          <h3 class="text-lg font-medium mb-3">Stats</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UStat
              label="Total Users"
              :value="1234"
              icon="i-heroicons-users"
              color="blue"
            />
            <UStat
              label="Revenue"
              value="$45,231"
              icon="i-heroicons-currency-dollar"
              color="green"
            />
            <UStat
              label="Orders"
              :value="89"
              icon="i-heroicons-shopping-cart"
              color="purple"
            />
          </div>
        </div>
      </div>
    </UCard>

    <!-- Navigation Section -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Navigation</h2>
      </template>

      <div class="space-y-6">
        <!-- Tabs -->
        <div>
          <h3 class="text-lg font-medium mb-3">Tabs</h3>
          <UTabs :items="tabs" class="w-full">
            <template #item="{ item }">
              <div class="p-4">
                <p>Content for {{ item.label }}</p>
              </div>
            </template>
          </UTabs>
        </div>

        <!-- Breadcrumb -->
        <div>
          <h3 class="text-lg font-medium mb-3">Breadcrumb</h3>
          <UBreadcrumb :items="breadcrumbItems" />
        </div>

        <!-- Pagination -->
        <div>
          <h3 class="text-lg font-medium mb-3">Pagination</h3>
          <UPagination
            v-model="currentPage"
            :page-count="10"
            :total="100"
            :per-page="10"
            show-last
            show-first
          />
        </div>
      </div>
    </UCard>

    <!-- Feedback Section -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Feedback</h2>
      </template>

      <div class="space-y-6">
        <!-- Alerts -->
        <div>
          <h3 class="text-lg font-medium mb-3">Alerts</h3>
          <div class="space-y-4">
            <UAlert
              icon="i-heroicons-information-circle"
              color="blue"
              variant="soft"
              title="Information"
              description="This is an informational alert message."
            />
            <UAlert
              icon="i-heroicons-check-circle"
              color="green"
              variant="soft"
              title="Success"
              description="Your action was completed successfully."
            />
            <UAlert
              icon="i-heroicons-exclamation-triangle"
              color="yellow"
              variant="soft"
              title="Warning"
              description="Please review your input before proceeding."
            />
            <UAlert
              icon="i-heroicons-x-circle"
              color="red"
              variant="soft"
              title="Error"
              description="Something went wrong. Please try again."
            />
          </div>
        </div>

        <!-- Toast Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Toast Notifications</h3>
          <div class="flex flex-wrap gap-3">
            <UButton @click="showSuccessToast">Success Toast</UButton>
            <UButton @click="showErrorToast" color="red">Error Toast</UButton>
            <UButton @click="showInfoToast" color="blue">Info Toast</UButton>
            <UButton @click="showWarningToast" color="yellow"
              >Warning Toast</UButton
            >
          </div>
        </div>

        <!-- Modal Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Modal</h3>
          <UButton @click="isModalOpen = true">Open Modal</UButton>

          <UModal v-model="isModalOpen">
            <UCard>
              <template #header>
                <h3 class="text-lg font-semibold">Modal Title</h3>
              </template>

              <p class="mb-4">
                This is a modal dialog. You can put any content here.
              </p>

              <template #footer>
                <div class="flex justify-end gap-3">
                  <UButton variant="ghost" @click="isModalOpen = false">
                    Cancel
                  </UButton>
                  <UButton @click="isModalOpen = false"> Confirm </UButton>
                </div>
              </template>
            </UCard>
          </UModal>
        </div>
      </div>
    </UCard>

    <!-- Layout Section -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Layout</h2>
      </template>

      <div class="space-y-6">
        <!-- Accordion -->
        <div>
          <h3 class="text-lg font-medium mb-3">Accordion</h3>
          <UAccordion :items="accordionItems" />
        </div>

        <!-- Collapse -->
        <div>
          <h3 class="text-lg font-medium mb-3">Collapse</h3>
          <UButton @click="isCollapsed = !isCollapsed">
            {{ isCollapsed ? "Show" : "Hide" }} Content
          </UButton>
          <UCollapse v-model="isCollapsed" class="mt-4">
            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p>This content can be collapsed and expanded.</p>
            </div>
          </UCollapse>
        </div>

        <!-- Divider -->
        <div>
          <h3 class="text-lg font-medium mb-3">Divider</h3>
          <div class="space-y-4">
            <p>Content above</p>
            <UDivider />
            <p>Content below</p>
            <UDivider label="OR" />
            <p>More content</p>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
// Set page meta
definePageMeta({
  title: "Design UI Components",
});

const { add: addToast } = useToast();

// Form data
const selectedOption = ref(null);
const checkbox1 = ref(false);
const checkbox2 = ref(true);
const checkbox3 = ref(false);
const radioValue = ref("option1");
const switch1 = ref(true);
const switch2 = ref(false);
const switch3 = ref(true);

// Pagination
const currentPage = ref(1);

// Modal
const isModalOpen = ref(false);

// Collapse
const isCollapsed = ref(false);

// Select options
const selectOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
];

// Tabs
const tabs = [
  { key: "tab1", label: "Tab 1" },
  { key: "tab2", label: "Tab 2" },
  { key: "tab3", label: "Tab 3" },
];

// Breadcrumb
const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Design UI", to: "/design-ui" },
  { label: "Components" },
];

// Accordion
const accordionItems = [
  {
    label: "What is Nuxt UI?",
    content:
      "Nuxt UI is a fully customizable and accessible Vue component library built for Nuxt 3.",
    defaultOpen: true,
  },
  {
    label: "How to install?",
    content:
      "You can install Nuxt UI using npm, yarn, or pnpm. Run: npm install @nuxt/ui",
  },
  {
    label: "Is it free?",
    content:
      "Yes, Nuxt UI is completely free and open source under the MIT license.",
  },
];

// Toast functions
function showSuccessToast() {
  addToast({
    title: "Success!",
    description: "Operation completed successfully.",
    color: "green",
  });
}

function showErrorToast() {
  addToast({
    title: "Error!",
    description: "Something went wrong.",
    color: "red",
  });
}

function showInfoToast() {
  addToast({
    title: "Information",
    description: "Here is some useful information.",
    color: "blue",
  });
}

function showWarningToast() {
  addToast({
    title: "Warning",
    description: "Please be careful.",
    color: "yellow",
  });
}
</script>
