"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex items-center gap-2 text-prussian dark:text-ivory hover:text-indigo dark:hover:text-ash"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <>
          <Sun className="h-5 w-5" />
          <span>Tema Chiaro</span>
        </>
      ) : (
        <>
          <Moon className="h-5 w-5" />
          <span>Tema Scuro</span>
        </>
      )}
    </Button>
  )
} 