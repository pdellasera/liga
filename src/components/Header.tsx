"use client"

import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { Button } from "./Button"
import { MobileMenu } from "./MobileMenu"
import { useState } from "react"

const navItems = [
  { name: "Inicio", href: "#" },
  { name: "Tabla", href: "#tabla" },
  { name: "Estadísticas", href: "#stats" },
  { name: "Partidos", href: "#partidos" },
  { name: "Equipos", href: "#equipos" },
]

interface HeaderProps {
  onAdminClick?: () => void
}

export default function Header({ onAdminClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img src="/image/copa-trinche-logo.png" alt="Copa Trinche" className="h-8 sm:h-10 w-auto object-contain" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              onClick={onAdminClick}
              className="text-gray-300 hover:text-white transition-colors font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              whileHover={{ y: -2 }}
            >
              Admin
            </motion.button>
          </nav>

          {/* Mobile Navigation Button */}
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>

          {/* Mobile Menu */}
          <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="flex items-center gap-2 mb-8">
              <img src="/image/copa-trinche-logo.png" alt="Copa Trinche" className="h-6 w-auto object-contain" />
            </div>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={() => {
                  if (onAdminClick) onAdminClick()
                  setIsOpen(false)
                }}
                className="text-gray-300 hover:text-white transition-colors font-medium py-2 text-left"
              >
                Admin
              </button>
            </nav>
          </MobileMenu>
        </div>
      </div>
    </motion.header>
  )
}
