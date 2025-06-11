"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Button } from "./Button"
import { Input } from "./Input"
import { Label } from "./Label"
import { Badge } from "./Badge"
import { ArrowLeft, Upload, FileText, Calendar, Save, Eye, AlertCircle } from "lucide-react"
import { useState } from "react"

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  venue: string
  status: "pending" | "completed" | "evaluated"
  homeScore?: number
  awayScore?: number
  evaluation?: MatchEvaluation
}

interface MatchEvaluation {
  homeStats: TeamStats
  awayStats: TeamStats
  events: MatchEvent[]
  referee: string
  notes: string
}

interface TeamStats {
  goals: number
  shots: number
  shotsOnTarget: number
  possession: number
  fouls: number
  yellowCards: number
  redCards: number
  corners: number
}

interface MatchEvent {
  minute: number
  type: "goal" | "yellow_card" | "red_card" | "substitution"
  player: string
  team: string
  description: string
}

const teamLogos: { [key: string]: string } = {
  "Los Cracks": "/images/escudos/soccer-club-template.png",
  "Barrio FC": "/placeholder.svg?height=32&width=32",
  "Racing Barrio": "/placeholder.svg?height=32&width=32",
  "Los Guerreros": "/placeholder.svg?height=32&width=32",
}

export default function MatchEvaluations({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"pending" | "upload" | "history">("pending")
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [isEvaluating, setIsEvaluating] = useState(false)

  // Estados para evaluación
  const [evaluation, setEvaluation] = useState<MatchEvaluation>({
    homeStats: {
      goals: 0,
      shots: 0,
      shotsOnTarget: 0,
      possession: 50,
      fouls: 0,
      yellowCards: 0,
      redCards: 0,
      corners: 0,
    },
    awayStats: {
      goals: 0,
      shots: 0,
      shotsOnTarget: 0,
      possession: 50,
      fouls: 0,
      yellowCards: 0,
      redCards: 0,
      corners: 0,
    },
    events: [],
    referee: "",
    notes: "",
  })

  // Partidos (mock data)
  const [matches, setMatches] = useState<Match[]>([
    {
      id: "1",
      homeTeam: "Los Cracks",
      awayTeam: "Barrio FC",
      date: "2024-01-15",
      time: "16:00",
      venue: "Cancha Municipal",
      status: "completed",
      homeScore: 2,
      awayScore: 1,
    },
    {
      id: "2",
      homeTeam: "Racing Barrio",
      awayTeam: "Los Guerreros",
      date: "2024-01-16",
      time: "18:00",
      venue: "Estadio del Barrio",
      status: "pending",
    },
    {
      id: "3",
      homeTeam: "Los Cracks",
      awayTeam: "Racing Barrio",
      date: "2024-01-14",
      time: "20:00",
      venue: "Complejo Deportivo",
      status: "evaluated",
      homeScore: 1,
      awayScore: 1,
      evaluation: {
        homeStats: {
          goals: 1,
          shots: 8,
          shotsOnTarget: 4,
          possession: 55,
          fouls: 12,
          yellowCards: 2,
          redCards: 0,
          corners: 5,
        },
        awayStats: {
          goals: 1,
          shots: 6,
          shotsOnTarget: 3,
          possession: 45,
          fouls: 15,
          yellowCards: 3,
          redCards: 1,
          corners: 3,
        },
        events: [
          { minute: 25, type: "goal", player: "Juan Pérez", team: "Los Cracks", description: "Gol de cabeza" },
          { minute: 67, type: "goal", player: "Carlos López", team: "Racing Barrio", description: "Tiro libre" },
        ],
        referee: "Roberto Martínez",
        notes: "Partido muy disputado con buen nivel técnico",
      },
    },
  ])

  const handleStartEvaluation = (match: Match) => {
    setSelectedMatch(match)
    setIsEvaluating(true)
    if (match.homeScore !== undefined && match.awayScore !== undefined) {
      setEvaluation((prev) => ({
        ...prev,
        homeStats: { ...prev.homeStats, goals: match.homeScore! },
        awayStats: { ...prev.awayStats, goals: match.awayScore! },
      }))
    }
  }

  const handleSaveEvaluation = () => {
    if (selectedMatch) {
      const updatedMatches = matches.map((match) =>
        match.id === selectedMatch.id
          ? {
              ...match,
              status: "evaluated" as const,
              evaluation: evaluation,
              homeScore: evaluation.homeStats.goals,
              awayScore: evaluation.awayStats.goals,
            }
          : match,
      )
      setMatches(updatedMatches)
      setIsEvaluating(false)
      setSelectedMatch(null)
      alert("Evaluación guardada exitosamente!")
    }
  }

  const updateHomeStats = (field: keyof TeamStats, value: number) => {
    setEvaluation((prev) => ({
      ...prev,
      homeStats: { ...prev.homeStats, [field]: value },
    }))
  }

  const updateAwayStats = (field: keyof TeamStats, value: number) => {
    setEvaluation((prev) => ({
      ...prev,
      awayStats: { ...prev.awayStats, [field]: value },
    }))
  }

  const pendingMatches = matches.filter((m) => m.status === "pending" || m.status === "completed")
  const evaluatedMatches = matches.filter((m) => m.status === "evaluated")

  // Vista de evaluación detallada
  if (isEvaluating && selectedMatch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
        <section className="px-4 py-12">
          <motion.div
            className="mx-auto max-w-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="outline"
                onClick={() => setIsEvaluating(false)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <h2 className="text-3xl font-bold text-white">Evaluar Partido</h2>
                <p className="text-gray-300">
                  {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                </p>
              </div>
            </div>

            {/* Match Info */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={teamLogos[selectedMatch.homeTeam] || "/placeholder.svg?height=48&width=48"}
                      alt={selectedMatch.homeTeam}
                      className="w-12 h-12 object-contain"
                    />
                    <div className="text-center">
                      <div className="text-white font-bold text-2xl">
                        {evaluation.homeStats.goals} - {evaluation.awayStats.goals}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {selectedMatch.date} • {selectedMatch.time}
                      </div>
                    </div>
                    <img
                      src={teamLogos[selectedMatch.awayTeam] || "/placeholder.svg?height=48&width=48"}
                      alt={selectedMatch.awayTeam}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{selectedMatch.venue}</div>
                    <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                      {selectedMatch.status === "completed" ? "Finalizado" : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Home Team Stats */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <img
                      src={teamLogos[selectedMatch.homeTeam] || "/placeholder.svg?height=24&width=24"}
                      alt={selectedMatch.homeTeam}
                      className="w-6 h-6 object-contain"
                    />
                    {selectedMatch.homeTeam}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Goles</Label>
                      <Input
                        type="number"
                        value={evaluation.homeStats.goals}
                        onChange={(e) => updateHomeStats("goals", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Tiros</Label>
                      <Input
                        type="number"
                        value={evaluation.homeStats.shots}
                        onChange={(e) => updateHomeStats("shots", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Tiros al Arco</Label>
                      <Input
                        type="number"
                        value={evaluation.homeStats.shotsOnTarget}
                        onChange={(e) => updateHomeStats("shotsOnTarget", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Posesión (%)</Label>
                      <Input
                        type="number"
                        value={evaluation.homeStats.possession}
                        onChange={(e) => updateHomeStats("possession", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Faltas</Label>
                      <Input
                        type="number"
                        value={evaluation.homeStats.fouls}
                        onChange={(e) => updateHomeStats("fouls", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Tarjetas Amarillas</Label>
                      <Input
                        type="number"
                        value={evaluation.homeStats.yellowCards}
                        onChange={(e) => updateHomeStats("yellowCards", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Tarjetas Rojas</Label>
                      <Input
                        type="number"
                        value={evaluation.homeStats.redCards}
                        onChange={(e) => updateHomeStats("redCards", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Córners</Label>
                      <Input
                        type="number"
                        value={evaluation.homeStats.corners}
                        onChange={(e) => updateHomeStats("corners", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Away Team Stats */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <img
                      src={teamLogos[selectedMatch.awayTeam] || "/placeholder.svg?height=24&width=24"}
                      alt={selectedMatch.awayTeam}
                      className="w-6 h-6 object-contain"
                    />
                    {selectedMatch.awayTeam}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Goles</Label>
                      <Input
                        type="number"
                        value={evaluation.awayStats.goals}
                        onChange={(e) => updateAwayStats("goals", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Tiros</Label>
                      <Input
                        type="number"
                        value={evaluation.awayStats.shots}
                        onChange={(e) => updateAwayStats("shots", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Tiros al Arco</Label>
                      <Input
                        type="number"
                        value={evaluation.awayStats.shotsOnTarget}
                        onChange={(e) => updateAwayStats("shotsOnTarget", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Posesión (%)</Label>
                      <Input
                        type="number"
                        value={evaluation.awayStats.possession}
                        onChange={(e) => updateAwayStats("possession", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Faltas</Label>
                      <Input
                        type="number"
                        value={evaluation.awayStats.fouls}
                        onChange={(e) => updateAwayStats("fouls", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Tarjetas Amarillas</Label>
                      <Input
                        type="number"
                        value={evaluation.awayStats.yellowCards}
                        onChange={(e) => updateAwayStats("yellowCards", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Tarjetas Rojas</Label>
                      <Input
                        type="number"
                        value={evaluation.awayStats.redCards}
                        onChange={(e) => updateAwayStats("redCards", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Córners</Label>
                      <Input
                        type="number"
                        value={evaluation.awayStats.corners}
                        onChange={(e) => updateAwayStats("corners", Number.parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Información Adicional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Árbitro</Label>
                  <Input
                    value={evaluation.referee}
                    onChange={(e) => setEvaluation((prev) => ({ ...prev, referee: e.target.value }))}
                    placeholder="Nombre del árbitro"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Notas del Partido</Label>
                  <textarea
                    value={evaluation.notes}
                    onChange={(e) => setEvaluation((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Observaciones, incidencias, comentarios..."
                    rows={4}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSaveEvaluation}
                className="bg-gradient-to-r from-[#ac3328] to-red-600 hover:from-[#8b2a21] hover:to-red-700 text-white font-semibold px-8"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Evaluación
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    )
  }

  // Vista principal de evaluaciones
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <section className="px-4 py-12">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={onBack}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div>
              <h2 className="text-3xl font-bold text-white">Evaluaciones de Partidos</h2>
              <p className="text-gray-300">Gestiona resultados y estadísticas</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={activeTab === "pending" ? "default" : "outline"}
              onClick={() => setActiveTab("pending")}
              className={
                activeTab === "pending"
                  ? "bg-[#ac3328] text-white"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Pendientes ({pendingMatches.length})
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "outline"}
              onClick={() => setActiveTab("history")}
              className={
                activeTab === "history"
                  ? "bg-[#ac3328] text-white"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }
            >
              <FileText className="w-4 h-4 mr-2" />
              Historial ({evaluatedMatches.length})
            </Button>
          </div>

          {/* Pending Matches Tab */}
          {activeTab === "pending" && (
            <div className="space-y-4">
              {pendingMatches.length === 0 ? (
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-white text-xl font-semibold mb-2">No hay partidos pendientes</h3>
                    <p className="text-gray-400">Todos los partidos han sido evaluados</p>
                  </CardContent>
                </Card>
              ) : (
                pendingMatches.map((match) => (
                  <Card
                    key={match.id}
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={teamLogos[match.homeTeam] || "/placeholder.svg?height=40&width=40"}
                              alt={match.homeTeam}
                              className="w-10 h-10 object-contain"
                            />
                            <div className="text-center">
                              <div className="text-white font-bold text-lg">
                                {match.homeScore !== undefined ? `${match.homeScore} - ${match.awayScore}` : "vs"}
                              </div>
                              <div className="text-gray-300 text-sm">
                                {match.date} • {match.time}
                              </div>
                            </div>
                            <img
                              src={teamLogos[match.awayTeam] || "/placeholder.svg?height=40&width=40"}
                              alt={match.awayTeam}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {match.homeTeam} vs {match.awayTeam}
                            </div>
                            <div className="text-gray-400 text-sm">{match.venue}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant="outline"
                            className={
                              match.status === "completed"
                                ? "text-blue-400 border-blue-400/50"
                                : "text-yellow-400 border-yellow-400/50"
                            }
                          >
                            {match.status === "completed" ? "Finalizado" : "Pendiente"}
                          </Badge>
                          <Button
                            onClick={() => handleStartEvaluation(match)}
                            className="bg-[#ac3328] hover:bg-[#8b2a21] text-white"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Evaluar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="space-y-4">
              {evaluatedMatches.length === 0 ? (
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-12 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-white text-xl font-semibold mb-2">No hay evaluaciones</h3>
                    <p className="text-gray-400">Aún no se han evaluado partidos</p>
                  </CardContent>
                </Card>
              ) : (
                evaluatedMatches.map((match) => (
                  <Card key={match.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={teamLogos[match.homeTeam] || "/placeholder.svg?height=40&width=40"}
                              alt={match.homeTeam}
                              className="w-10 h-10 object-contain"
                            />
                            <div className="text-center">
                              <div className="text-white font-bold text-lg">
                                {match.homeScore} - {match.awayScore}
                              </div>
                              <div className="text-gray-300 text-sm">
                                {match.date} • {match.time}
                              </div>
                            </div>
                            <img
                              src={teamLogos[match.awayTeam] || "/placeholder.svg?height=40&width=40"}
                              alt={match.awayTeam}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {match.homeTeam} vs {match.awayTeam}
                            </div>
                            <div className="text-gray-400 text-sm">{match.venue}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-green-400 border-green-400/50">
                            Evaluado
                          </Badge>
                          <Button
                            variant="outline"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalles
                          </Button>
                        </div>
                      </div>

                      {match.evaluation && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                          <div className="text-center">
                            <div className="text-gray-400 text-sm">Posesión</div>
                            <div className="text-white font-medium">
                              {match.evaluation.homeStats.possession}% - {match.evaluation.awayStats.possession}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-400 text-sm">Tiros al Arco</div>
                            <div className="text-white font-medium">
                              {match.evaluation.homeStats.shotsOnTarget} - {match.evaluation.awayStats.shotsOnTarget}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-400 text-sm">Árbitro</div>
                            <div className="text-white font-medium">{match.evaluation.referee}</div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  )
}
