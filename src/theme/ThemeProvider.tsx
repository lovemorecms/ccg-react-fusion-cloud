import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyColorMode,
  getPreferredColorMode,
  persistColorMode,
  type ColorMode,
} from './theme'

type ThemeContextValue = {
  colorMode: ColorMode
  isDark: boolean
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorModeState] = useState<ColorMode>(() => getPreferredColorMode())

  useEffect(() => {
    applyColorMode(colorMode)
    persistColorMode(colorMode)
  }, [colorMode])

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode)
  }, [])

  const toggleColorMode = useCallback(() => {
    setColorModeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({
      colorMode,
      isDark: colorMode === 'dark',
      setColorMode,
      toggleColorMode,
    }),
    [colorMode, setColorMode, toggleColorMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
