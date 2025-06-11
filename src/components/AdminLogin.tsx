"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Button } from "./Button"
import { Input } from "./Input"
import { Label } from "./Label"
import { ArrowLeft, Shield, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useState } from "react"

interface AdminLoginProps {
  onBack: () => void
  onLoginSuccess: () => void
}

export default function AdminLogin({ onBack, onLoginSuccess }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simular autenticación
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "copatrinche2024") {
        onLoginSuccess()
      } else {
        setError("Credenciales incorrectas. Intenta nuevamente.")
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ac3328]/10 to-red-600/10" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5" />

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Inicio
        </Button>

        {/* Login Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-[#ac3328] to-red-600 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">Panel Administrativo</CardTitle>
            <p className="text-gray-300 text-sm">Acceso restringido para administradores</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Usuario
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  placeholder="Ingresa tu usuario"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#ac3328] focus:ring-[#ac3328]"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    placeholder="Ingresa tu contraseña"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#ac3328] focus:ring-[#ac3328] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading || !credentials.username || !credentials.password}
                className="w-full bg-gradient-to-r from-[#ac3328] to-red-600 hover:from-[#8b2a21] hover:to-red-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verificando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Iniciar Sesión
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-gray-400 text-xs text-center mb-2">Credenciales de demostración:</p>
              <div className="bg-white/5 rounded-lg p-3 text-xs">
                <div className="text-gray-300">
                  <strong>Usuario:</strong> admin
                </div>
                <div className="text-gray-300">
                  <strong>Contraseña:</strong> copatrinche2024
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-2 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 text-xs">
              <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Acceso Seguro:</strong> Esta área está protegida y todas las acciones son registradas para
                auditoría.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">© 2024 Copa Trinche - Panel Administrativo</p>
        </div>
      </motion.div>
    </div>
  )
}
