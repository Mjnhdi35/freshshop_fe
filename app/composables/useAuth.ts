export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const useAuth = () => {
  const user = useState<User | null>("auth.user", () => null);
  const token = useCookie<string>("auth-token", {
    default: () => "",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  const isLoggedIn = computed(() => !!user.value && !!token.value);

  // Login function
  const login = async (
    credentials: LoginCredentials,
  ): Promise<AuthResponse> => {
    try {
      const response = await $fetch<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: credentials,
      });

      user.value = response.user;
      token.value = response.token;

      return response;
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 400,
        statusMessage: error.statusMessage || "Login failed",
      });
    }
  };

  // Register function
  const register = async (
    credentials: RegisterCredentials,
  ): Promise<AuthResponse> => {
    try {
      const response = await $fetch<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: credentials,
      });

      user.value = response.user;
      token.value = response.token;

      return response;
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 400,
        statusMessage: error.statusMessage || "Registration failed",
      });
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await $fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.warn("Logout error:", error);
    } finally {
      user.value = null;
      token.value = "";
    }
  };

  // Get current user
  const fetchUser = async (): Promise<User | null> => {
    if (!token.value) {
      return null;
    }

    try {
      const response = await $fetch<{ data: User }>("/api/auth/me");
      user.value = response.data;
      return response.data;
    } catch (error) {
      // Token is invalid, clear it
      user.value = null;
      token.value = "";
      return null;
    }
  };

  // Update user profile
  const updateProfile = async (profileData: Partial<User>): Promise<User> => {
    try {
      const response = await $fetch<{ data: User }>("/api/auth/profile", {
        method: "PUT",
        body: profileData,
      });

      user.value = response.data;
      return response.data;
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 400,
        statusMessage: error.statusMessage || "Profile update failed",
      });
    }
  };

  // Change password
  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    try {
      await $fetch("/api/auth/change-password", {
        method: "POST",
        body: {
          currentPassword,
          newPassword,
        },
      });
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 400,
        statusMessage: error.statusMessage || "Password change failed",
      });
    }
  };

  // Initialize auth state
  const initAuth = async (): Promise<void> => {
    if (token.value && !user.value) {
      await fetchUser();
    }
  };

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isLoggedIn,

    // Actions
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
    changePassword,
    initAuth,
  };
};
