"use client"

import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Home } from "lucide-react"
import { AddPropertyForm } from "./add-property-form"

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">PropertyHub</h1>
          </div>

          <div className="flex items-center space-x-4">
            <AddPropertyForm />
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
