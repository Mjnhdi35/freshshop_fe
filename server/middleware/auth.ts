export default defineEventHandler(async (event) => {
  // Only apply to protected routes
  if (!event.node.req.url?.startsWith("/api/auth/")) {
    return;
  }

  // Skip auth check for login and register
  if (
    event.node.req.url === "/api/auth/login" ||
    event.node.req.url === "/api/auth/register"
  ) {
    return;
  }

  const token = getCookie(event, "auth-token");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  // Verify token with backend
  try {
    await $fetch("http://localhost:4000/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // Clear invalid token
    deleteCookie(event, "auth-token");
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid token",
    });
  }
});
