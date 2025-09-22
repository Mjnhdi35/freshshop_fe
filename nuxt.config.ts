// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
    "@nuxt/ui",
  ],

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiSecret: "123",

    // Public keys (exposed to client-side)
    public: {
      apiBase:
        process.env.NODE_ENV === "production"
          ? "https://your-backend-domain.com"
          : "http://localhost:4000",
    },
  },

  // Color mode configuration
  colorMode: {
    preference: "system",
    fallback: "light",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  // UI configuration
  ui: {
    global: true,
    icons: ["heroicons"],
  },

  // Tailwind CSS configuration
  tailwindcss: {
    config: {
      content: [],
      theme: {
        extend: {},
      },
      plugins: [],
    },
  },
});
