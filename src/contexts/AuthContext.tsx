import {api} from "@/api";
import {LoginSchemaType, SignUpSchemaType} from "@/schemas/auth";
import {tokenStore} from "@/storage/secureStorage";
import {User} from "@/types/user";
import React, {createContext, useEffect, useState} from "react";
import {toast} from "sonner-native";

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
      return false;
    }
  };

  const tryRestoreSession = async () => {
    setIsLoading(true);
    try {
      const accessToken = tokenStore.getAccessToken();
      const refreshToken = tokenStore.getRefreshToken();

      if (!accessToken && !refreshToken) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // if tokens exists, we attempt to fetch /me, interceptor will refresh if needed
      try {
        await fetchMe();
      } catch (error) {
        // ignore
      } finally {
        // If after fetchMe we still have no user, ensure user is null
        if (!user) setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // on mount, try restoring session
    tryRestoreSession();
  }, []);

  const signup = async ({name, email, password}: SignUpSchemaType) => {
    setIsLoading(true);
    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      toast.success("Account created!", {
        description: "Your account has been created. Please login.",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const login = async ({email, password}: LoginSchemaType) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", {email, password});
      const {accessToken, refreshToken, expiresAt} = res.data;

      tokenStore.saveTokens({accessToken, refreshToken, expiresAt});
      // we ensure that the api uses new token
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      //fetch profile
      const me = await api.get("/users/me");
      setUser(me.data.user);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const refreshToken = tokenStore.getRefreshToken();
      if (refreshToken) {
        try {
          await api.post("/auth/logout", {refreshToken: refreshToken});
        } catch (e) {
          // ignore server logout errors, we'll clear local state anyway
        }
      }
    } finally {
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
