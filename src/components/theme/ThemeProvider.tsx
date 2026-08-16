"use client"

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  type ReactNode,
} from "react"

type Theme = "dark" | "light"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getThemeSnapshot(): Theme {
  try {
    const saved = localStorage.getItem("theme")
    if (saved === "light" || saved === "dark") {
      return saved
    }
  } catch {
    // Ignore localStorage access restrictions
  }
  return "dark"
}

function getServerSnapshot(): Theme {
  return "dark"
}

const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  const handleStorage = (e: StorageEvent) => {
    if (e.key === "theme") {
      callback()
    }
  }
  window.addEventListener("storage", handleStorage)
  return () => {
    listeners.delete(callback)
    window.removeEventListener("storage", handleStorage)
  }
}

function emitThemeChange() {
  listeners.forEach((listener) => listener())
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot)

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem("theme", newTheme)
      if (newTheme === "light") {
        document.documentElement.classList.add("light")
        document.documentElement.setAttribute("data-theme", "light")
      } else {
        document.documentElement.classList.remove("light")
        document.documentElement.setAttribute("data-theme", "dark")
      }
      emitThemeChange()
    } catch (e) {
      console.warn("Could not save theme to localStorage:", e)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
