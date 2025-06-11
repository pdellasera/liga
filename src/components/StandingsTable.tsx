"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Badge } from "./Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Trophy, Medal, Award } from "lucide-react"
import { useState } from "react"

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

const groupsData = {
  "Grupo Rushbet": [
    {
      pos: 1,
      team: "Los Cracks",
      played: 5,
      won: 4,
      drawn: 1,
      lost: 0,
      gf: 12,
      ga: 3,
      gd: 9,
      points: 13,
      schedule: [
        { day: "L", opponent: "Barrio FC", result: "2-1", venue: "Local", date: "15 Enero 2024", time: "16:00" },
        {
          day: "M",
          opponent: "Racing Barrio",
          result: "1-1",
          venue: "Visitante",
          date: "16 Enero 2024",
          time: "18:00",
        },
        { day: "J", opponent: "Los Guerreros", result: "3-0", venue: "Local", date: "18 Enero 2024", time: "20:00" },
        { day: "S", opponent: "Barrio FC", result: "2-0", venue: "Visitante", date: "20 Enero 2024", time: "15:00" },
        { day: "D", opponent: "Racing Barrio", result: "4-1", venue: "Local", date: "21 Enero 2024", time: "17:00" },
      ],
      qualified: "first",
    },
    {
      pos: 2,
      team: "Barrio FC",
      played: 5,
      won: 3,
      drawn: 1,
      lost: 1,
      gf: 10,
      ga: 5,
      gd: 5,
      points: 10,
      schedule: [
        { day: "L", opponent: "Los Cracks", result: "1-2", venue: "Visitante", date: "15 Enero 2024", time: "16:00" },
        { day: "M", opponent: "Los Guerreros", result: "2-0", venue: "Local", date: "16 Enero 2024", time: "19:00" },
        { day: "V", opponent: "Racing Barrio", result: "3-1", venue: "Local", date: "19 Enero 2024", time: "18:30" },
        { day: "S", opponent: "Los Cracks", result: "0-2", venue: "Local", date: "20 Enero 2024", time: "15:00" },
        {
          day: "D",
          opponent: "Los Guerreros",
          result: "4-0",
          venue: "Visitante",
          date: "21 Enero 2024",
          time: "16:30",
        },
      ],
      qualified: "second",
    },
    {
      pos: 3,
      team: "Racing Barrio",
      played: 5,
      won: 2,
      drawn: 1,
      lost: 2,
      gf: 7,
      ga: 8,
      gd: -1,
      points: 7,
      schedule: [
        { day: "M", opponent: "Los Cracks", result: "1-1", venue: "Local", date: "16 Enero 2024", time: "18:00" },
        {
          day: "J",
          opponent: "Los Guerreros",
          result: "2-1",
          venue: "Visitante",
          date: "18 Enero 2024",
          time: "19:00",
        },
        { day: "V", opponent: "Barrio FC", result: "1-3", venue: "Visitante", date: "19 Enero 2024", time: "18:30" },
        { day: "S", opponent: "Los Guerreros", result: "2-0", venue: "Local", date: "20 Enero 2024", time: "17:00" },
        { day: "D", opponent: "Los Cracks", result: "1-4", venue: "Visitante", date: "21 Enero 2024", time: "17:00" },
      ],
      qualified: null,
    },
    {
      pos: 4,
      team: "Los Guerreros",
      played: 5,
      won: 1,
      drawn: 1,
      lost: 3,
      gf: 4,
      ga: 9,
      gd: -5,
      points: 4,
      schedule: [
        { day: "M", opponent: "Barrio FC", result: "0-2", venue: "Visitante", date: "16 Enero 2024", time: "19:00" },
        { day: "J", opponent: "Racing Barrio", result: "1-2", venue: "Local", date: "18 Enero 2024", time: "19:00" },
        { day: "J", opponent: "Los Cracks", result: "0-3", venue: "Visitante", date: "18 Enero 2024", time: "20:00" },
        {
          day: "S",
          opponent: "Racing Barrio",
          result: "0-2",
          venue: "Visitante",
          date: "20 Enero 2024",
          time: "17:00",
        },
        { day: "D", opponent: "Barrio FC", result: "0-4", venue: "Local", date: "21 Enero 2024", time: "16:30" },
      ],
      qualified: null,
    },
  ],
  "Grupo Coordinadora": [
    {
      pos: 1,
      team: "Trinche United",
      played: 5,
      won: 4,
      drawn: 0,
      lost: 1,
      gf: 11,
      ga: 4,
      gd: 7,
      points: 12,
      schedule: [
        { day: "L", opponent: "Villa Esperanza", result: "2-1", venue: "Local", date: "15 Enero 2024", time: "14:00" },
        {
          day: "M",
          opponent: "Club Atlético",
          result: "3-0",
          venue: "Visitante",
          date: "16 Enero 2024",
          time: "16:00",
        },
        { day: "V", opponent: "San Lorenzo B", result: "2-0", venue: "Local", date: "19 Enero 2024", time: "20:00" },
        {
          day: "S",
          opponent: "Villa Esperanza",
          result: "1-2",
          venue: "Visitante",
          date: "20 Enero 2024",
          time: "19:00",
        },
        { day: "D", opponent: "Club Atlético", result: "3-1", venue: "Local", date: "21 Enero 2024", time: "15:00" },
      ],
      qualified: "first",
    },
    {
      pos: 2,
      team: "Villa Esperanza",
      played: 5,
      won: 3,
      drawn: 2,
      lost: 0,
      gf: 9,
      ga: 5,
      gd: 4,
      points: 11,
      schedule: [
        {
          day: "L",
          opponent: "Trinche United",
          result: "1-2",
          venue: "Visitante",
          date: "15 Enero 2024",
          time: "14:00",
        },
        { day: "M", opponent: "San Lorenzo B", result: "1-1", venue: "Local", date: "16 Enero 2024", time: "17:00" },
        {
          day: "J",
          opponent: "Club Atlético",
          result: "2-0",
          venue: "Visitante",
          date: "18 Enero 2024",
          time: "16:00",
        },
        { day: "S", opponent: "Trinche United", result: "2-1", venue: "Local", date: "20 Enero 2024", time: "19:00" },
        {
          day: "D",
          opponent: "San Lorenzo B",
          result: "3-1",
          venue: "Visitante",
          date: "21 Enero 2024",
          time: "18:00",
        },
      ],
      qualified: "second",
    },
    {
      pos: 3,
      team: "Club Atlético",
      played: 5,
      won: 2,
      drawn: 1,
      lost: 2,
      gf: 6,
      ga: 7,
      gd: -1,
      points: 7,
      schedule: [
        { day: "M", opponent: "Trinche United", result: "0-3", venue: "Local", date: "16 Enero 2024", time: "16:00" },
        { day: "J", opponent: "Villa Esperanza", result: "0-2", venue: "Local", date: "18 Enero 2024", time: "16:00" },
        {
          day: "V",
          opponent: "San Lorenzo B",
          result: "2-1",
          venue: "Visitante",
          date: "19 Enero 2024",
          time: "16:30",
        },
        { day: "S", opponent: "San Lorenzo B", result: "1-1", venue: "Local", date: "20 Enero 2024", time: "16:00" },
        {
          day: "D",
          opponent: "Trinche United",
          result: "1-3",
          venue: "Visitante",
          date: "21 Enero 2024",
          time: "15:00",
        },
      ],
      qualified: null,
    },
    {
      pos: 4,
      team: "San Lorenzo B",
      played: 5,
      won: 0,
      drawn: 1,
      lost: 4,
      gf: 3,
      ga: 12,
      gd: -9,
      points: 1,
      schedule: [
        {
          day: "M",
          opponent: "Villa Esperanza",
          result: "1-1",
          venue: "Visitante",
          date: "16 Enero 2024",
          time: "17:00",
        },
        {
          day: "V",
          opponent: "Trinche United",
          result: "0-2",
          venue: "Visitante",
          date: "19 Enero 2024",
          time: "20:00",
        },
        { day: "V", opponent: "Club Atlético", result: "1-2", venue: "Local", date: "19 Enero 2024", time: "16:30" },
        {
          day: "S",
          opponent: "Club Atlético",
          result: "1-1",
          venue: "Visitante",
          date: "20 Enero 2024",
          time: "16:00",
        },
        { day: "D", opponent: "Villa Esperanza", result: "1-3", venue: "Local", date: "21 Enero 2024", time: "18:00" },
      ],
      qualified: null,
    },
  ],
  "Grupo Electrolit": [
    {
      pos: 1,
      team: "Los Pibes",
      played: 5,
      won: 3,
      drawn: 2,
      lost: 0,
      gf: 10,
      ga: 4,
      gd: 6,
      points: 11,
      schedule: [
        { day: "L", opponent: "Deportivo Sur", result: "1-1", venue: "Local", date: "15 Enero 2024", time: "15:00" },
        {
          day: "M",
          opponent: "Estudiantes FC",
          result: "2-1",
          venue: "Visitante",
          date: "16 Enero 2024",
          time: "20:00",
        },
        { day: "J", opponent: "Atlético Barrio", result: "3-0", venue: "Local", date: "18 Enero 2024", time: "15:00" },
        {
          day: "S",
          opponent: "Deportivo Sur",
          result: "2-0",
          venue: "Visitante",
          date: "20 Enero 2024",
          time: "18:00",
        },
        { day: "D", opponent: "Estudiantes FC", result: "2-2", venue: "Local", date: "21 Enero 2024", time: "19:00" },
      ],
      qualified: "first",
    },
    {
      pos: 2,
      team: "Deportivo Sur",
      played: 5,
      won: 3,
      drawn: 1,
      lost: 1,
      gf: 8,
      ga: 6,
      gd: 2,
      points: 10,
      schedule: [
        { day: "L", opponent: "Los Pibes", result: "1-1", venue: "Visitante", date: "15 Enero 2024", time: "15:00" },
        { day: "M", opponent: "Atlético Barrio", result: "2-0", venue: "Local", date: "16 Enero 2024", time: "15:30" },
        {
          day: "V",
          opponent: "Estudiantes FC",
          result: "3-1",
          venue: "Visitante",
          date: "19 Enero 2024",
          time: "17:30",
        },
        { day: "S", opponent: "Los Pibes", result: "0-2", venue: "Local", date: "20 Enero 2024", time: "18:00" },
        {
          day: "D",
          opponent: "Atlético Barrio",
          result: "2-1",
          venue: "Visitante",
          date: "21 Enero 2024",
          time: "14:00",
        },
      ],
      qualified: "second",
    },
    {
      pos: 3,
      team: "Estudiantes FC",
      played: 5,
      won: 2,
      drawn: 2,
      lost: 1,
      gf: 7,
      ga: 6,
      gd: 1,
      points: 8,
      schedule: [
        { day: "M", opponent: "Los Pibes", result: "1-2", venue: "Local", date: "16 Enero 2024", time: "20:00" },
        {
          day: "J",
          opponent: "Atlético Barrio",
          result: "2-0",
          venue: "Visitante",
          date: "18 Enero 2024",
          time: "17:00",
        },
        { day: "V", opponent: "Deportivo Sur", result: "1-3", venue: "Local", date: "19 Enero 2024", time: "17:30" },
        { day: "S", opponent: "Atlético Barrio", result: "1-1", venue: "Local", date: "20 Enero 2024", time: "14:30" },
        { day: "D", opponent: "Los Pibes", result: "2-2", venue: "Visitante", date: "21 Enero 2024", time: "19:00" },
      ],
      qualified: null,
    },
    {
      pos: 4,
      team: "Atlético Barrio",
      played: 5,
      won: 0,
      drawn: 1,
      lost: 4,
      gf: 2,
      ga: 11,
      gd: -9,
      points: 1,
      schedule: [
        {
          day: "M",
          opponent: "Deportivo Sur",
          result: "0-2",
          venue: "Visitante",
          date: "16 Enero 2024",
          time: "15:30",
        },
        { day: "J", opponent: "Estudiantes FC", result: "0-2", venue: "Local", date: "18 Enero 2024", time: "17:00" },
        { day: "J", opponent: "Los Pibes", result: "0-3", venue: "Visitante", date: "18 Enero 2024", time: "15:00" },
        {
          day: "S",
          opponent: "Estudiantes FC",
          result: "1-1",
          venue: "Visitante",
          date: "20 Enero 2024",
          time: "14:30",
        },
        { day: "D", opponent: "Deportivo Sur", result: "1-2", venue: "Local", date: "21 Enero 2024", time: "14:00" },
      ],
      qualified: null,
    },
  ],
  "Grupo Jet Smart": [
    {
      pos: 1,
      team: "Unidos FC",
      played: 5,
      won: 4,
      drawn: 1,
      lost: 0,
      gf: 13,
      ga: 5,
      gd: 8,
      points: 13,
      schedule: [
        { day: "L", opponent: "Defensores", result: "3-1", venue: "Local", date: "15 Enero 2024", time: "17:00" },
        { day: "M", opponent: "Juventud FC", result: "2-0", venue: "Visitante", date: "16 Enero 2024", time: "14:30" },
        { day: "V", opponent: "Tigres FC", result: "2-2", venue: "Local", date: "19 Enero 2024", time: "15:30" },
        { day: "S", opponent: "Defensores", result: "3-0", venue: "Visitante", date: "20 Enero 2024", time: "20:00" },
        { day: "D", opponent: "Juventud FC", result: "3-2", venue: "Local", date: "21 Enero 2024", time: "20:00" },
      ],
      qualified: "first",
    },
    {
      pos: 2,
      team: "Defensores",
      played: 5,
      won: 2,
      drawn: 2,
      lost: 1,
      gf: 8,
      ga: 7,
      gd: 1,
      points: 8,
      schedule: [
        { day: "L", opponent: "Unidos FC", result: "1-3", venue: "Visitante", date: "15 Enero 2024", time: "17:00" },
        { day: "M", opponent: "Tigres FC", result: "2-1", venue: "Local", date: "16 Enero 2024", time: "18:30" },
        { day: "J", opponent: "Juventud FC", result: "1-1", venue: "Visitante", date: "18 Enero 2024", time: "14:00" },
        { day: "S", opponent: "Unidos FC", result: "0-3", venue: "Local", date: "20 Enero 2024", time: "20:00" },
        { day: "D", opponent: "Tigres FC", result: "4-2", venue: "Visitante", date: "21 Enero 2024", time: "16:00" },
      ],
      qualified: "second",
    },
    {
      pos: 3,
      team: "Juventud FC",
      played: 5,
      won: 2,
      drawn: 1,
      lost: 2,
      gf: 6,
      ga: 8,
      gd: -2,
      points: 7,
      schedule: [
        { day: "M", opponent: "Unidos FC", result: "0-2", venue: "Local", date: "16 Enero 2024", time: "14:30" },
        { day: "J", opponent: "Defensores", result: "1-1", venue: "Local", date: "18 Enero 2024", time: "14:00" },
        { day: "V", opponent: "Tigres FC", result: "2-0", venue: "Visitante", date: "19 Enero 2024", time: "14:00" },
        { day: "S", opponent: "Tigres FC", result: "1-0", venue: "Local", date: "20 Enero 2024", time: "14:00" },
        { day: "D", opponent: "Unidos FC", result: "2-3", venue: "Visitante", date: "21 Enero 2024", time: "20:00" },
      ],
      qualified: null,
    },
    {
      pos: 4,
      team: "Tigres FC",
      played: 5,
      won: 0,
      drawn: 2,
      lost: 3,
      gf: 4,
      ga: 11,
      gd: -7,
      points: 2,
      schedule: [
        { day: "M", opponent: "Defensores", result: "1-2", venue: "Visitante", date: "16 Enero 2024", time: "18:30" },
        { day: "V", opponent: "Unidos FC", result: "2-2", venue: "Visitante", date: "19 Enero 2024", time: "15:30" },
        { day: "V", opponent: "Juventud FC", result: "0-2", venue: "Local", date: "19 Enero 2024", time: "14:00" },
        { day: "S", opponent: "Juventud FC", result: "0-1", venue: "Visitante", date: "20 Enero 2024", time: "14:00" },
        { day: "D", opponent: "Defensores", result: "2-4", venue: "Local", date: "21 Enero 2024", time: "16:00" },
      ],
      qualified: null,
    },
  ],
}

const getPositionColor = (pos: number, qualified: string | null) => {
  if (qualified === "first") return "bg-[#ac3328]/20 text-[#ac3328] border-[#ac3328]/30"
  if (qualified === "second") return "bg-orange-500/20 text-orange-400 border-orange-500/30"
  if (pos <= 2) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  return "bg-gray-500/20 text-gray-400 border-gray-500/30"
}

const getQualificationIcon = (qualified: string | null) => {
  switch (qualified) {
    case "first":
      return <Trophy className="w-3 h-3 text-[#ac3328]" />
    case "second":
      return <Medal className="w-3 h-3 text-orange-400" />
    default:
      return null
  }
}

const getDayColor = (result: string) => {
  if (result.includes("-")) {
    const [home, away] = result.split("-").map(Number)
    if (home > away) return "bg-green-500 text-white" // Victoria
    if (home < away) return "bg-red-500 text-white" // Derrota
    return "bg-yellow-500 text-white" // Empate
  }
  return "bg-gray-500 text-white"
}

// const getResultIcon = (result: string, venue: string) => {
//   if (result.includes("-")) {
//     const [home, away] = result.split("-").map(Number)
//     if (venue === "Local") {
//       if (home > away) return "W" // Victoria local
//       if (home < away) return "L" // Derrota local
//       return "D" // Empate
//     } else {
//       if (away > home) return "W" // Victoria visitante
//       if (away < home) return "L" // Derrota visitante
//       return "D" // Empate
//     }
//   }
//   return "?"
// }

// const getResultIconColor = (result: string, venue: string) => {
//   const icon = getResultIcon(result, venue)
//   switch (icon) {
//     case "W":
//       return "bg-green-500 text-white"
//     case "L":
//       return "bg-red-500 text-white"
//     case "D":
//       return "bg-yellow-500 text-white"
//     default:
//       return "bg-gray-500 text-white"
//   }
// }

function MatchTooltip({ match, teamName, children }: { match: any; teamName: string; children: React.ReactNode }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      {children}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-max">
            {/* Header azul oscuro */}
            <div className="bg-slate-800 text-white px-4 py-2 text-center">
              <div className="font-semibold text-xs">Copa Trinche 2024</div>
            </div>

            {/* Contenido */}
            <div className="p-3 bg-white">
              <div className="text-gray-600 text-xs mb-2 text-center">Partido de Grupo</div>
              <div className="text-center text-sm font-medium text-gray-800 mb-2">{match.date}</div>

              {/* Equipos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={teamLogos[teamName] || "/placeholder.svg"}
                      alt={teamName}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="text-xs font-medium text-gray-800">{teamName}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800">
                    {match.venue === "Local" ? match.result.split("-")[0] : match.result.split("-")[1]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={teamLogos[match.opponent] || "/placeholder.svg"}
                      alt={match.opponent}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="text-sm font-medium text-gray-800">{match.opponent}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800">
                    {match.venue === "Local" ? match.result.split("-")[1] : match.result.split("-")[0]}
                  </span>
                </div>
              </div>

              {/* Resultado circular */}
              {/* <div className="flex justify-center mt-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getResultIconColor(match.result, match.venue)}`}
                >
                  {getResultIcon(match.result, match.venue)}
                </div>
              </div> */}

              {/* Info adicional */}
              <div className="text-center text-xs text-gray-500 mt-2">
                {match.time} • {match.venue === "Local" ? "🏠 Local" : "✈️ Visitante"}
              </div>
            </div>

            {/* Flecha del tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        </div>
      )}
    </div>
  )
}

function GroupTable({ groupName, teams }: { groupName: string; teams: any[] }) {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-[#ac3328]" />
          {groupName}
        </CardTitle>
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ac3328]/20 border border-[#ac3328]/30"></div>
            <span className="text-[#ac3328]">1° Clasificado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500/20 border border-orange-500/30"></div>
            <span className="text-orange-400">2° Clasificado</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20 bg-white/5">
                <th className="text-left p-3 text-white font-semibold text-sm">Pos</th>
                <th className="text-left p-3 text-white font-semibold text-sm">Equipo</th>
                <th className="text-center p-3 text-white font-semibold text-sm">PJ</th>
                <th className="text-center p-3 text-white font-semibold text-sm">G</th>
                <th className="text-center p-3 text-white font-semibold text-sm">E</th>
                <th className="text-center p-3 text-white font-semibold text-sm">P</th>
                <th className="text-center p-3 text-white font-semibold text-sm">GF</th>
                <th className="text-center p-3 text-white font-semibold text-sm">GC</th>
                <th className="text-center p-3 text-white font-semibold text-sm">DG</th>
                <th className="text-center p-3 text-white font-semibold text-sm">Pts</th>
                <th className="text-center p-3 text-white font-semibold text-sm">Días Partido</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <motion.tr
                  key={team.team}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${getPositionColor(team.pos, team.qualified)}`}
                      >
                        {team.pos}
                      </Badge>
                      {getQualificationIcon(team.qualified)}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={teamLogos[team.team] || "/placeholder.svg"}
                        alt={`${team.team} escudo`}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-white font-medium text-sm">{team.team}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center text-gray-300 text-sm">{team.played}</td>
                  <td className="p-3 text-center text-gray-300 text-sm">{team.won}</td>
                  <td className="p-3 text-center text-gray-300 text-sm">{team.drawn}</td>
                  <td className="p-3 text-center text-gray-300 text-sm">{team.lost}</td>
                  <td className="p-3 text-center text-gray-300 text-sm">{team.gf}</td>
                  <td className="p-3 text-center text-gray-300 text-sm">{team.ga}</td>
                  <td className="p-3 text-center text-gray-300 text-sm">{team.gd > 0 ? `+${team.gd}` : team.gd}</td>
                  <td className="p-3 text-center text-white font-bold text-sm">{team.points}</td>
                  <td className="p-3">
                    <div className="flex gap-1 justify-center">
                      {team.schedule.map((match: any, i: number) => (
                        <MatchTooltip key={i} match={match} teamName={team.team}>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer ${getDayColor(match.result)}`}
                          >
                            {match.day}
                          </div>
                        </MatchTooltip>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3 p-4">
          {teams.map((team, index) => (
            <motion.div
              key={team.team}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${getPositionColor(team.pos, team.qualified)}`}
                  >
                    {team.pos}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <img
                      src={teamLogos[team.team] || "/placeholder.svg"}
                      alt={`${team.team} escudo`}
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <span className="text-white font-medium block">{team.team}</span>
                      {team.qualified && (
                        <div className="flex items-center gap-1 mt-1">
                          {getQualificationIcon(team.qualified)}
                          <span className="text-xs text-gray-400">
                            {team.qualified === "first" ? "Clasificado 1°" : "Clasificado 2°"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">{team.points}</span>
                  <span className="text-gray-400 text-sm">pts</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-gray-400">PJ</div>
                  <div className="text-white font-medium">{team.played}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">G-E-P</div>
                  <div className="text-white font-medium">
                    {team.won}-{team.drawn}-{team.lost}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">DG</div>
                  <div className="text-white font-medium">{team.gd > 0 ? `+${team.gd}` : team.gd}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                <div className="flex gap-1">
                  {team.schedule.map((match: any, i: number) => (
                    <MatchTooltip key={i} match={match} teamName={team.team}>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer ${getDayColor(match.result)}`}
                      >
                        {match.day}
                      </div>
                    </MatchTooltip>
                  ))}
                </div>
                <div className="text-gray-400 text-sm">
                  {team.gf}:{team.ga}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function StandingsTable() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Tabs defaultValue="Grupo Rushbet" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
          {Object.keys(groupsData).map((groupName) => (
            <TabsTrigger key={groupName} value={groupName} className="text-xs lg:text-sm">
              {groupName.replace("Grupo ", "")}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(groupsData).map(([groupName, teams]) => (
          <TabsContent key={groupName} value={groupName}>
            <GroupTable groupName={groupName} teams={teams} />
          </TabsContent>
        ))}
      </Tabs>

      {/* Qualification Legend */}
      <motion.div
        className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#ac3328]" />
          Clasificación a Cuartos de Final
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#ac3328]" />
            <span className="text-gray-300">Los primeros de cada grupo clasifican directamente</span>
          </div>
          <div className="flex items-center gap-2">
            <Medal className="w-4 h-4 text-orange-400" />
            <span className="text-gray-300">Los segundos de cada grupo también clasifican</span>
          </div>
        </div>

        {/* Leyenda de días */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <h5 className="text-white font-medium mb-2">Días de Partido:</h5>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-gray-300">
              L=Lunes, M=Martes, M=Miércoles, J=Jueves, V=Viernes, S=Sábado, D=Domingo
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Victoria</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Empate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">Derrota</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
