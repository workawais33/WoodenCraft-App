import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("woodenCraftCurrentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const register = ({ name, email, password }) => {
    const savedUsers = JSON.parse(
      localStorage.getItem("woodenCraftUsers") || "[]",
    );

    const existingUser = savedUsers.find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    const updatedUsers = [...savedUsers, newUser];

    localStorage.setItem("woodenCraftUsers", JSON.stringify(updatedUsers));

    const authenticatedUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    localStorage.setItem(
      "woodenCraftCurrentUser",
      JSON.stringify(authenticatedUser),
    );

    setUser(authenticatedUser);

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  const login = ({ email, password }) => {
    const savedUsers = JSON.parse(
      localStorage.getItem("woodenCraftUsers") || "[]",
    );

    const existingUser = savedUsers.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password,
    );

    if (!existingUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const authenticatedUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };

    localStorage.setItem(
      "woodenCraftCurrentUser",
      JSON.stringify(authenticatedUser),
    );

    setUser(authenticatedUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };

  const logout = () => {
    localStorage.removeItem("woodenCraftCurrentUser");
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;