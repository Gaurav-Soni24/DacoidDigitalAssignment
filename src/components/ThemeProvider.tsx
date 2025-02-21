import { createContext, useContext, useEffect, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: "dark";
  setTheme: (theme: "dark") => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null, // No-op since the theme is fixed
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme] = useState<"dark">("dark"); // Permanently set to "dark"

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark"); // Always add the dark class
  }, []);

  const value = {
    theme,
    setTheme: () => {}, // No-op function (does nothing)
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
