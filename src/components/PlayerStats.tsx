"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Badge } from "./Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Target, Clock, Activity, Trophy, Medal, Award } from "lucide-react"

const teamLogos: { [key: string]: string } = {
  "Los Cracks": "/escudos/soccer-club-template.png",
  "Barrio FC": "/escudos/soccer-club-template.png",
  "Racing Barrio": "/escudos/soccer-club-template.png",
  "Los Guerreros": "/escudos/soccer-club-template.png",
  "Trinche United": "/escudos/soccer-club-template.png",
  "Villa Esperanza": "/escudos/soccer-club-template.png",
  "Club Atlético": "/escudos/soccer-club-template.png",
  "San Lorenzo B": "/escudos/soccer-club-template.png",
  "Los Pibes": "/escudos/soccer-club-template.png",
  "Deportivo Sur": "/escudos/soccer-club-template.png",
  "Estudiantes FC": "/escudos/soccer-club-template.png",
  "Atlético Barrio": "/escudos/soccer-club-template.png",
  "Unidos FC": "/escudos/soccer-club-template.png",
  Defensores: "/escudos/soccer-club-template.png",
  "Juventud FC": "/escudos/soccer-club-template.png",
  "Tigres FC": "/escudos/soccer-club-template.png",
}

const topScorers = [
  {
    pos: 1,
    name: "Carlos Rodríguez",
    team: "Los Cracks",
    goals: 8,
    matches: 5,
    average: 1.6,
    position: "Delantero",
  },
  {
    pos: 2,
    name: "Miguel Santos",
    team: "Unidos FC",
    goals: 7,
    matches: 5,
    average: 1.4,
    position: "Mediocampista",
  },
  {
    pos: 3,
    name: "Juan Pérez",
    team: "Villa Esperanza",
    goals: 6,
    matches: 5,
    average: 1.2,
    position: "Delantero",
  },
  {
    pos: 4,
    name: "Diego Martín",
    team: "Trinche United",
    goals: 5,
    matches: 4,
    average: 1.25,
    position: "Delantero",
  },
  {
    pos: 5,
    name: "Andrés López",
    team: "Los Pibes",
    goals: 5,
    matches: 5,
    average: 1.0,
    position: "Mediocampista",
  },
]

const mostMinutes = [
  {
    pos: 1,
    name: "Roberto García",
    team: "Los Cracks",
    minutes: 450,
    matches: 5,
    average: 90,
    position: "Portero",
  },
  {
    pos: 2,
    name: "Fernando Silva",
    team: "Unidos FC",
    minutes: 445,
    matches: 5,
    average: 89,
    position: "Defensor",
  },
  {
    pos: 3,
    name: "Luis Morales",
    team: "Villa Esperanza",
    minutes: 440,
    matches: 5,
    average: 88,
    position: "Mediocampista",
  },
  {
    pos: 4,
    name: "Pablo Ruiz",
    team: "Trinche United",
    minutes: 435,
    matches: 5,
    average: 87,
    position: "Defensor",
  },
  {
    pos: 5,
    name: "Mario Jiménez",
    team: "Los Pibes",
    minutes: 430,
    matches: 5,
    average: 86,
    position: "Mediocampista",
  },
]

const bestPerformance = [
  {
    pos: 1,
    name: "Carlos Rodríguez",
    team: "Los Cracks",
    rating: 9.2,
    matches: 5,
    goals: 8,
    assists: 3,
    position: "Delantero",
  },
  {
    pos: 2,
    name: "Miguel Santos",
    team: "Unidos FC",
    rating: 8.8,
    matches: 5,
    goals: 7,
    assists: 4,
    position: "Mediocampista",
  },
  {
    pos: 3,
    name: "Roberto García",
    team: "Los Cracks",
    rating: 8.6,
    matches: 5,
    goals: 0,
    assists: 0,
    position: "Portero",
  },
  {
    pos: 4,
    name: "Fernando Silva",
    team: "Unidos FC",
    rating: 8.4,
    matches: 5,
    goals: 1,
    assists: 2,
    position: "Defensor",
  },
  {
    pos: 5,
    name: "Juan Pérez",
    team: "Villa Esperanza",
    rating: 8.2,
    matches: 5,
    goals: 6,
    assists: 1,
    position: "Delantero",
  },
]

const getPositionColor = (pos: number) => {
  if (pos === 1) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  if (pos === 2) return "bg-gray-400/20 text-gray-300 border-gray-400/30"
  if (pos === 3) return "bg-orange-600/20 text-orange-400 border-orange-600/30"
  return "bg-gray-500/20 text-gray-400 border-gray-500/30"
}

const getPositionIcon = (pos: number) => {
  switch (pos) {
    case 1:
      return <Trophy className="w-3 h-3 text-yellow-400" />
    case 2:
      return <Medal className="w-3 h-3 text-gray-300" />
    case 3:
      return <Award className="w-3 h-3 text-orange-400" />
    default:
      return null
  }
}

function PlayerTable({ players, type }: { players: any[]; type: "scorers" | "minutes" | "performance" }) {
  return (
    <div className="space-y-3">
      {players.map((player, index) => (
        <motion.div
          key={player.name}
          className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Badge
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${getPositionColor(player.pos)}`}
                >
                  {player.pos}
                </Badge>
                {getPositionIcon(player.pos)}
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={teamLogos[player.team] || "/placeholder.svg"}
                  alt={`${player.team} escudo`}
                  className="w-6 h-6 object-contain"
                />
                <div>
                  <div className="text-white font-medium text-sm">{player.name}</div>
                  <div className="text-gray-400 text-xs">
                    {player.team} • {player.position}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              {type === "scorers" && (
                <>
                  <div className="text-white font-bold text-lg">{player.goals}</div>
                  <div className="text-gray-400 text-xs">goles ({player.average}/partido)</div>
                </>
              )}
              {type === "minutes" && (
                <>
                  <div className="text-white font-bold text-lg">{player.minutes}'</div>
                  <div className="text-gray-400 text-xs">promedio: {player.average}'/partido</div>
                </>
              )}
              {type === "performance" && (
                <>
                  <div className="text-white font-bold text-lg">{player.rating}</div>
                  <div className="text-gray-400 text-xs">rating promedio</div>
                </>
              )}
            </div>
          </div>

          {type === "performance" && (
            <div className="flex justify-between mt-2 pt-2 border-t border-white/10 text-xs">
              <span className="text-gray-400">
                Goles: <span className="text-white">{player.goals}</span>
              </span>
              <span className="text-gray-400">
                Asistencias: <span className="text-white">{player.assists}</span>
              </span>
              <span className="text-gray-400">
                Partidos: <span className="text-white">{player.matches}</span>
              </span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function PlayersStats() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Tabs defaultValue="scorers" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="scorers" className="text-xs lg:text-sm">
            <Target className="w-4 h-4 mr-1" />
            Goleadores
          </TabsTrigger>
          <TabsTrigger value="minutes" className="text-xs lg:text-sm">
            <Clock className="w-4 h-4 mr-1" />
            Minutos
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-xs lg:text-sm">
            <Activity className="w-4 h-4 mr-1" />
            Rendimiento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scorers">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-[#ac3328]" />
                Tabla de Goleadores
              </CardTitle>
              <p className="text-gray-300 text-sm">Los máximos artilleros de la Copa Trinche</p>
            </CardHeader>
            <CardContent>
              <PlayerTable players={topScorers} type="scorers" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="minutes">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                Jugadores con Más Minutos
              </CardTitle>
              <p className="text-gray-300 text-sm">Los jugadores más utilizados por sus equipos</p>
            </CardHeader>
            <CardContent>
              <PlayerTable players={mostMinutes} type="minutes" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Mejor Rendimiento Físico
              </CardTitle>
              <p className="text-gray-300 text-sm">Jugadores con mejor rating promedio</p>
            </CardHeader>
            <CardContent>
              <PlayerTable players={bestPerformance} type="performance" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Legend */}
      <motion.div
        className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          Reconocimientos
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300">1° Lugar - Oro</span>
          </div>
          <div className="flex items-center gap-2">
            <Medal className="w-4 h-4 text-gray-300" />
            <span className="text-gray-300">2° Lugar - Plata</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-400" />
            <span className="text-gray-300">3° Lugar - Bronce</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
