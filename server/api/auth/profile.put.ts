export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "auth-token");

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const body = await readBody(event);

    // Proxy to backend
    const response = await $fetch("http://localhost:4000/api/auth/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      statusMessage: error.statusMessage || "Update failed",
    });
  }
});
