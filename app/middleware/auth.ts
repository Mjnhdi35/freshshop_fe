export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth();

  // If no token and trying to access protected route
  if (!isLoggedIn.value && to.path.startsWith("/profile")) {
    return navigateTo("/login");
  }

  // If has token and trying to access auth pages
  if (isLoggedIn.value && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/profile");
  }
});
