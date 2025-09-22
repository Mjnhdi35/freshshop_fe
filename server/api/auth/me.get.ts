export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "auth-token");

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    // Proxy to backend with token
    const response = await $fetch("http://localhost:4000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 401,
      statusMessage: error.statusMessage || "Unauthorized",
    });
  }
});
