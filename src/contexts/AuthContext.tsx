import {api} from "@/api";
import {LoginSchemaType, SignUpSchemaType} from "@/schemas/auth";
import {tokenStore} from "@/storage/secureStorage";
import {User} from "@/types/user";
import React, {createContext, useEffect, useState} from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginSchemaType) => Promise<void>;
  signup: (data: SignUpSchemaType) => Promise<void>;
  logout: () => Promise<void>;
  tryRestoreSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;

  const fetchMe = async () => {
    try {
      const res = await api.get("/users/me");
      const fetchedUser = res.data.user as User;
      setUser(fetchedUser);
      return true;
    } catch (error) {
      // if 401 -> handled by api interceptor, will try refresh automatically
      console.error("Failed to fetch user profile:", error);
      return false;
    }
  };

  const tryRestoreSession = async () => {
    try {
      const accessToken = tokenStore.getAccessToken();
      const refreshToken = tokenStore.getRefreshToken();

      console.log("accessTOken inside context => ", accessToken);
      console.log("refreshTOken inside context => ", refreshToken);

      // If no tokens exist, user is not authenticated
      if (!accessToken && !refreshToken) {
        setUser(null);
        setIsLoading(false);
        console.log(
          "Called when none of the tokens exist and Loading state => ",
          isLoading,
        );

        return;
      }

      // If we have an access token, set it in the API headers
      if (accessToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        // Try to fetch user profile
        const success = await fetchMe();

        if (success) {
          setIsLoading(false);
          return;
        }
      }

      // If access token failed or doesn't exist, but we have refresh token
      if (refreshToken && !accessToken) {
        // The API interceptor will handle the refresh automatically
        // when we make the fetchMe request
        const success = await fetchMe();

        if (!success) {
          // If refresh also failed, clear everything
          tokenStore.clear();
          api.defaults.headers.common["Authorization"] = undefined;
          setUser(null);
          setIsLoading(false);
        }
      } else {
        // No refresh token available, clear everything
        tokenStore.clear();
        api.defaults.headers.common["Authorization"] = undefined;
        setUser(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Session restore failed:", error);
      tokenStore.clear();
      api.defaults.headers.common["Authorization"] = undefined;
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initialize API with stored token on app start
    const initializeAPI = async () => {
      const accessToken = tokenStore.getAccessToken();
      if (accessToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      }

      // Then try to restore session
      await tryRestoreSession();
    };

    initializeAPI();
  }, []);

  const signup = async ({name, email, password}: SignUpSchemaType) => {
    setIsLoading(true);
    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async ({email, password}: LoginSchemaType) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", {email, password});
      const {accessToken, refreshToken, expiresAt} = res.data;

      // Save tokens
      tokenStore.saveTokens({accessToken, refreshToken, expiresAt});

      // Set authorization header
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Fetch user profile
      const me = await api.get("/users/me");
      setUser(me.data.user);
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const refreshToken = tokenStore.getRefreshToken();
      if (refreshToken) {
        try {
          await api.post("/auth/logout", {refreshToken});
        } catch (e) {
          // Ignore server logout errors, we'll clear local state anyway
          console.warn("Server logout failed, clearing local state anyway:", e);
        }
      }
    } finally {
      // Always clear local state
      tokenStore.clear();
      api.defaults.headers.common["Authorization"] = undefined;
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signup,
        login,
        logout,
        tryRestoreSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
