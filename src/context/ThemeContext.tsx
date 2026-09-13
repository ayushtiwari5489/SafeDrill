import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      // Clear legacy dark session if it exists to satisfy the user's explicit request for light theme
      const legacy = localStorage.getItem("safedrill_theme");
      if (legacy === "dark") {
        localStorage.removeItem("safedrill_theme");
      }
      const saved = localStorage.getItem("safedrill_theme_v3");
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch {
      // Fallback
    }
    return "light"; // Default to light theme across the whole website
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
      document.body.style.backgroundColor = "#020617";
      document.body.style.color = "#f8fafc";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      document.body.style.backgroundColor = "#f8fafc";
      document.body.style.color = "#0f172a";
    }
    try {
      localStorage.setItem("safedrill_theme_v3", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
