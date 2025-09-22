export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Proxy to backend
    const response = await $fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      body: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      statusMessage: error.statusMessage || "Registration failed",
    });
  }
});
