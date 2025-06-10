"use client"

import { motion } from "framer-motion"
import { Trophy, Users, Calendar, TrendingUp, Medal, Target, Clock, MapPin } from "lucide-react"
import Header from "../../components/Header"
import { Badge } from "../../components/Badge"
import { Button } from "../../components/Button"
import { Card, CardContent } from "../../components/Card"
import StandingsTable from "../../components/StandingsTable"
import StatsCharts from "../../components/StatsCharts"
import UpcomingMatches from "../../components/UpcomingMatches"
import SponsorsSection from "../../components/SponsorsSection"



const fadeInUp = {
  initial: { opacity: 0, y: 60 },
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

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ac3328]/20 to-red-600/20" />
        <motion.div
          className="relative mx-auto max-w-7xl text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <Badge className="mb-4 bg-gradient-to-r from-[#ac3328] to-red-600 text-white px-4 py-2 text-sm font-semibold">
              Temporada 2024
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
              Copa{" "}
              <span className="bg-gradient-to-r from-[#ac3328] to-red-400 bg-clip-text text-transparent">Trinche</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              La liga más emocionante del barrio. Donde cada partido cuenta y cada gol es una historia.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">16 Equipos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">4 Grupos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">Fase de Grupos</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button
              className="bg-gradient-to-r from-[#ac3328] to-red-600 hover:from-[#8b2a21] hover:to-red-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
            >
              Ver Tabla de Posiciones
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="px-4 py-8">
        <motion.div
          className="mx-auto max-w-7xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div variants={fadeInUp}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-[#ac3328]" />
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-sm text-gray-300">Goles</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <Medal className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold">40</div>
                  <div className="text-sm text-gray-300">Partidos</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-gray-300">Jornada</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <div className="text-2xl font-bold">2.2</div>
                  <div className="text-sm text-gray-300">Goles/Partido</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Standings Table */}
      <section className="px-4 py-8">
        <motion.div
          className="mx-auto max-w-7xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Tabla de Posiciones</h2>
            <p className="text-gray-300">Clasificación actual de la Copa Trinche</p>
          </div>
          <StandingsTable />
        </motion.div>
      </section>

      {/* Statistics Charts */}
      <section className="px-4 py-8">
        <motion.div
          className="mx-auto max-w-7xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Estadísticas</h2>
            <p className="text-gray-300">Análisis detallado de la temporada</p>
          </div>
          <StatsCharts />
        </motion.div>
      </section>

      {/* Upcoming Matches */}
      <section className="px-4 py-8">
        <motion.div
          className="mx-auto max-w-7xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Próximos Partidos</h2>
            <p className="text-gray-300">No te pierdas la acción</p>
          </div>
          <UpcomingMatches />
        </motion.div>
      </section>

      {/* Sponsors Section */}
      <SponsorsSection />

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 px-4 py-8 mt-12">
        <div className="mx-auto max-w-7xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/image/copa-trinche-logo.png" alt="Copa Trinche" className="h-8 w-auto object-contain" />
          </div>
          <p className="text-gray-400 text-sm">© 2024 Copa Trinche. Todos los derechos reservados.</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-gray-500 text-xs">
            <MapPin className="w-3 h-3" />
            <span>Bogotá, Colombia</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
