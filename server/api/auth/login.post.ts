export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Proxy to backend
    const response = await $fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      body: {
        email: body.email,
        password: body.password,
      },
    });

    // Set cookie if login successful
    if (response.token) {
      setCookie(event, "auth-token", response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      statusMessage: error.statusMessage || "Login failed",
    });
  }
});
