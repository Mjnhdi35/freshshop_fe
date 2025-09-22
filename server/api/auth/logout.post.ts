export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "auth-token");

    if (token) {
      // Proxy logout to backend
      try {
        await $fetch("http://localhost:4000/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        // Continue with local logout even if backend fails
        console.warn("Backend logout failed:", error);
      }
    }

    // Clear cookie
    deleteCookie(event, "auth-token");

    return { success: true };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Logout failed",
    });
  }
});
