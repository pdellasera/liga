"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Button } from "./Button"
import { Badge } from "./Badge"
import {
  Users,
  Trophy,
  FileText,
  Plus,
  Settings,
  Calendar,
  Upload,
  Eye,
  LogOut,
  Bell,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react"
import { useState } from "react"
import ClubManagement from "./ClubManagement"
import TournamentManagement from "./TournamentManagement"
import MatchEvaluations from "./MatchEvaluation"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const adminModules = [
  {
    id: "clubs",
    title: "Gestión de Clubes",
    description: "Crear clubes, subir plantillas y gestionar equipos",
    icon: <Users className="w-8 h-8" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-400/30",
    actions: ["Crear Club", "Subir Plantilla", "Editar Equipos"],
    stats: { total: 16, pending: 2 },
  },
  {
    id: "tournaments",
    title: "Gestión de Torneos",
    description: "Crear torneos, asignar grupos y configurar competencias",
    icon: <Trophy className="w-8 h-8" />,
    color: "text-[#ac3328]",
    bgColor: "bg-[#ac3328]/20",
    borderColor: "border-[#ac3328]/30",
    actions: ["Crear Torneo", "Asignar Grupos", "Configurar Fixture"],
    stats: { total: 1, pending: 0 },
  },
  {
    id: "evaluations",
    title: "Evaluaciones de Partidos",
    description: "Subir resultados, estadísticas y evaluaciones",
    icon: <FileText className="w-8 h-8" />,
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-400/30",
    actions: ["Subir Resultado", "Cargar Estadísticas", "Evaluar Rendimiento"],
    stats: { total: 40, pending: 5 },
  },
]

const recentActivities = [
  {
    id: 1,
    type: "match",
    title: "Partido evaluado",
    description: "Los Cracks vs Barrio FC - Resultado: 2-1",
    time: "Hace 2 horas",
    icon: <CheckCircle className="w-4 h-4 text-green-400" />,
  },
  {
    id: 2,
    type: "club",
    title: "Nuevo club registrado",
    description: "Racing Barrio - Plantilla completa",
    time: "Hace 5 horas",
    icon: <Users className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 3,
    type: "tournament",
    title: "Grupos actualizados",
    description: "Copa Trinche 2024 - Asignación finalizada",
    time: "Hace 1 día",
    icon: <Trophy className="w-4 h-4 text-[#ac3328]" />,
  },
  {
    id: 4,
    type: "alert",
    title: "Evaluación pendiente",
    description: "Racing Barrio vs Los Guerreros",
    time: "Hace 2 días",
    icon: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
  },
]

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Actualizar hora cada minuto
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  })

  const renderActiveModule = () => {
    switch (activeModule) {
      case "clubs":
        return <ClubManagement onBack={() => setActiveModule(null)} />
      case "tournaments":
        return <TournamentManagement onBack={() => setActiveModule(null)} />
      case "evaluations":
        return <MatchEvaluations onBack={() => setActiveModule(null)} />
      default:
        return null
    }
  }

  if (activeModule) {
    return renderActiveModule()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      {/* Admin Header */}
      <motion.header
        className="bg-black/20 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img src="/image/copa-trinche-logo.png" alt="Copa Trinche" className="h-8 w-auto object-contain" />
              <div className="hidden sm:block">
                <h1 className="text-white font-bold text-lg">Panel Administrativo</h1>
                <p className="text-gray-400 text-xs">Copa Trinche 2024</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="text-white relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              </Button>

              {/* Current Time */}
              <div className="hidden md:block text-right">
                <div className="text-white text-sm font-medium">
                  {currentTime.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="text-gray-400 text-xs">
                  {currentTime.toLocaleDateString("es-CO", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </div>
              </div>

              {/* Logout */}
              <Button
                variant="outline"
                onClick={onLogout}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <section className="px-4 py-8">
        <motion.div className="mx-auto max-w-7xl" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Welcome Section */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Bienvenido, Administrador</h2>
                <p className="text-gray-300">Gestiona todos los aspectos de la Copa Trinche desde aquí</p>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-green-400 text-sm font-medium">Sistema Activo</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Equipos Registrados</p>
                    <p className="text-2xl font-bold text-white">16</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 text-xs">+2 esta semana</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Torneos Activos</p>
                    <p className="text-2xl font-bold text-white">1</p>
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 text-xs">En progreso</span>
                    </div>
                  </div>
                  <Trophy className="w-8 h-8 text-[#ac3328]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Partidos Jugados</p>
                    <p className="text-2xl font-bold text-white">40</p>
                    <div className="flex items-center gap-1 mt-1">
                      <BarChart3 className="w-3 h-3 text-blue-400" />
                      <span className="text-blue-400 text-xs">83% evaluados</span>
                    </div>
                  </div>
                  <Calendar className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Evaluaciones Pendientes</p>
                    <p className="text-2xl font-bold text-white">5</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-yellow-400" />
                      <span className="text-yellow-400 text-xs">Requiere atención</span>
                    </div>
                  </div>
                  <FileText className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Admin Modules */}
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp} className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#ac3328]" />
                  Módulos de Gestión
                </h3>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {adminModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                      <CardHeader className="pb-4">
                        <div className={`${module.bgColor} ${module.borderColor} border rounded-lg p-4 mb-4 relative`}>
                          <div className={`${module.color} flex justify-center`}>{module.icon}</div>
                          {module.stats.pending > 0 && (
                            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                              {module.stats.pending}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-white text-lg text-center">{module.title}</CardTitle>
                        <p className="text-gray-300 text-sm text-center">{module.description}</p>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Total:</span>
                            <span className="text-white font-medium">{module.stats.total}</span>
                          </div>
                          {module.stats.pending > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Pendientes:</span>
                              <span className="text-yellow-400 font-medium">{module.stats.pending}</span>
                            </div>
                          )}
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-[#ac3328] to-red-600 hover:from-[#8b2a21] hover:to-red-700 text-white font-semibold"
                          onClick={() => setActiveModule(module.id)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Gestionar
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-1">
              <motion.div variants={fadeInUp}>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#ac3328]" />
                      Actividad Reciente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="flex-shrink-0 mt-0.5">{activity.icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">{activity.title}</p>
                          <p className="text-gray-400 text-xs mt-1">{activity.description}</p>
                          <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={fadeInUp} className="mt-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#ac3328]" />
                      Acciones Rápidas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 justify-start"
                      onClick={() => setActiveModule("clubs")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nuevo Club
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 justify-start"
                      onClick={() => setActiveModule("tournaments")}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Nuevo Torneo
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 justify-start"
                      onClick={() => setActiveModule("evaluations")}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Resultado
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 justify-start"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Reportes
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
