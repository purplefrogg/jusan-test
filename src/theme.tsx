import { ReactNode, createContext, useContext, useState } from 'react'

type THemeType = 'dark' | 'light'
export const themeContext = createContext<THemeType>('dark')
export const themeSetContext = createContext((v: THemeType) => {})
export const useTheme = () => {
  const theme = useContext(themeContext)
  const themeSet = useContext(themeSetContext)

  return [theme, themeSet] as const
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <themeContext.Provider value={theme}>
      <themeSetContext.Provider value={v => setTheme(() => v)}>
        {children}
      </themeSetContext.Provider>
    </themeContext.Provider>
  )
}
