"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Button } from "./Button"
import { Input } from "./Input"
import { Label } from "./Label"
import { Badge } from "./Badge"
import { ArrowLeft, Plus, Trophy, Calendar, Users, Settings, Save, Edit, Shuffle } from "lucide-react"
import { useState } from "react"

interface Tournament {
  id: string
  name: string
  startDate: string
  endDate: string
  format: string
  status: "draft" | "active" | "completed"
  groups: Group[]
}

interface Group {
  id: string
  name: string
  teams: string[]
}

const availableTeams = [
  "Los Cracks",
  "Barrio FC",
  "Racing Barrio",
  "Los Guerreros",
  "Trinche United",
  "Villa Esperanza",
  "Club Atlético",
  "San Lorenzo B",
  "Los Pibes",
  "Deportivo Sur",
  "Estudiantes FC",
  "Atlético Barrio",
  "Unidos FC",
  "Defensores",
  "Juventud FC",
  "Tigres FC",
]

export default function TournamentManagement({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"create" | "manage" | "groups">("create")
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)

  // Estados para crear torneo
  const [tournamentForm, setTournamentForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    format: "groups",
  })

  // Estados para grupos
  const [groups, setGroups] = useState<Group[]>([
    { id: "1", name: "Grupo Rushbet", teams: [] },
    { id: "2", name: "Grupo Coordinadora", teams: [] },
    { id: "3", name: "Grupo Electrolit", teams: [] },
    { id: "4", name: "Grupo Jet Smart", teams: [] },
  ])

  const [unassignedTeams, setUnassignedTeams] = useState<string[]>([...availableTeams])

  // Torneos existentes (mock data)
  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: "1",
      name: "Copa Trinche 2024",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      format: "groups",
      status: "active",
      groups: [
        { id: "1", name: "Grupo Rushbet", teams: ["Los Cracks", "Barrio FC", "Racing Barrio", "Los Guerreros"] },
        {
          id: "2",
          name: "Grupo Coordinadora",
          teams: ["Trinche United", "Villa Esperanza", "Club Atlético", "San Lorenzo B"],
        },
        {
          id: "3",
          name: "Grupo Electrolit",
          teams: ["Los Pibes", "Deportivo Sur", "Estudiantes FC", "Atlético Barrio"],
        },
        { id: "4", name: "Grupo Jet Smart", teams: ["Unidos FC", "Defensores", "Juventud FC", "Tigres FC"] },
      ],
    },
  ])

  const handleCreateTournament = () => {
    if (tournamentForm.name && tournamentForm.startDate && tournamentForm.endDate) {
      const newTournament: Tournament = {
        id: Date.now().toString(),
        name: tournamentForm.name,
        startDate: tournamentForm.startDate,
        endDate: tournamentForm.endDate,
        format: tournamentForm.format,
        status: "draft",
        groups: [],
      }
      setTournaments([...tournaments, newTournament])
      setTournamentForm({ name: "", startDate: "", endDate: "", format: "groups" })
      alert("Torneo creado exitosamente!")
    }
  }

  const handleAddTeamToGroup = (groupId: string, team: string) => {
    const group = groups.find((g) => g.id === groupId)
    if (group && group.teams.length < 4) {
      setGroups(groups.map((g) => (g.id === groupId ? { ...g, teams: [...g.teams, team] } : g)))
      setUnassignedTeams(unassignedTeams.filter((t) => t !== team))
    }
  }

  const handleRemoveTeamFromGroup = (groupId: string, team: string) => {
    setGroups(groups.map((g) => (g.id === groupId ? { ...g, teams: g.teams.filter((t) => t !== team) } : g)))
    setUnassignedTeams([...unassignedTeams, team])
  }

  const handleRandomAssignment = () => {
    const allTeams = [...availableTeams]
    const shuffledTeams = allTeams.sort(() => Math.random() - 0.5)

    const newGroups = groups.map((group, index) => ({
      ...group,
      teams: shuffledTeams.slice(index * 4, (index + 1) * 4),
    }))

    setGroups(newGroups)
    setUnassignedTeams([])
  }

  const handleSaveGroups = () => {
    if (selectedTournament) {
      const updatedTournaments = tournaments.map((tournament) =>
        tournament.id === selectedTournament.id ? { ...tournament, groups: groups } : tournament,
      )
      setTournaments(updatedTournaments)
      alert("Grupos guardados exitosamente!")
    }
  }

  const handleSelectTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    if (tournament.groups.length > 0) {
      setGroups(tournament.groups)
      const assignedTeams = tournament.groups.flatMap((g) => g.teams)
      setUnassignedTeams(availableTeams.filter((team) => !assignedTeams.includes(team)))
    }
    setActiveTab("groups")
  }

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
              <h2 className="text-3xl font-bold text-white">Gestión de Torneos</h2>
              <p className="text-gray-300">Crea y administra competencias</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={activeTab === "create" ? "default" : "outline"}
              onClick={() => setActiveTab("create")}
              className={
                activeTab === "create"
                  ? "bg-[#ac3328] text-white"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Torneo
            </Button>
            <Button
              variant={activeTab === "manage" ? "default" : "outline"}
              onClick={() => setActiveTab("manage")}
              className={
                activeTab === "manage"
                  ? "bg-[#ac3328] text-white"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }
            >
              <Trophy className="w-4 h-4 mr-2" />
              Gestionar Torneos
            </Button>
            {selectedTournament && (
              <Button
                variant={activeTab === "groups" ? "default" : "outline"}
                onClick={() => setActiveTab("groups")}
                className={
                  activeTab === "groups"
                    ? "bg-[#ac3328] text-white"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }
              >
                <Users className="w-4 h-4 mr-2" />
                Grupos - {selectedTournament.name}
              </Button>
            )}
          </div>

          {/* Create Tournament Tab */}
          {activeTab === "create" && (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#ac3328]" />
                  Crear Nuevo Torneo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tournamentName" className="text-gray-300">
                        Nombre del Torneo
                      </Label>
                      <Input
                        id="tournamentName"
                        value={tournamentForm.name}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, name: e.target.value })}
                        placeholder="Ej: Copa Trinche 2024"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="format" className="text-gray-300">
                        Formato
                      </Label>
                      <select
                        id="format"
                        value={tournamentForm.format}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, format: e.target.value })}
                        className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                      >
                        <option value="groups" className="bg-slate-800">
                          Fase de Grupos
                        </option>
                        <option value="knockout" className="bg-slate-800">
                          Eliminación Directa
                        </option>
                        <option value="league" className="bg-slate-800">
                          Liga
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="startDate" className="text-gray-300">
                        Fecha de Inicio
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={tournamentForm.startDate}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, startDate: e.target.value })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="endDate" className="text-gray-300">
                        Fecha de Finalización
                      </Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={tournamentForm.endDate}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, endDate: e.target.value })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreateTournament}
                  className="w-full bg-gradient-to-r from-[#ac3328] to-red-600 hover:from-[#8b2a21] hover:to-red-700 text-white font-semibold"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Crear Torneo
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Manage Tournaments Tab */}
          {activeTab === "manage" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tournaments.map((tournament) => (
                  <Card
                    key={tournament.id}
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-white font-bold text-lg mb-2">{tournament.name}</h3>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">
                                {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                                {new Date(tournament.endDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Trophy className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300 capitalize">{tournament.format}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            tournament.status === "active"
                              ? "text-green-400 border-green-400/50"
                              : tournament.status === "completed"
                                ? "text-blue-400 border-blue-400/50"
                                : "text-yellow-400 border-yellow-400/50"
                          }
                        >
                          {tournament.status === "active"
                            ? "Activo"
                            : tournament.status === "completed"
                              ? "Finalizado"
                              : "Borrador"}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Grupos:</span>
                          <span className="text-white font-medium">{tournament.groups.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Equipos:</span>
                          <span className="text-white font-medium">
                            {tournament.groups.reduce((total, group) => total + group.teams.length, 0)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSelectTournament(tournament)}
                          className="flex-1 bg-[#ac3328] hover:bg-[#8b2a21] text-white"
                        >
                          <Users className="w-4 h-4 mr-1" />
                          Grupos
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {tournaments.length === 0 && (
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-12 text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-white text-xl font-semibold mb-2">No hay torneos creados</h3>
                    <p className="text-gray-400 mb-6">Crea tu primer torneo para comenzar</p>
                    <Button
                      onClick={() => setActiveTab("create")}
                      className="bg-[#ac3328] hover:bg-[#8b2a21] text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Crear Torneo
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Groups Management Tab */}
          {activeTab === "groups" && selectedTournament && (
            <div className="space-y-6">
              {/* Controls */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#ac3328]" />
                    Configuración de Grupos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={handleRandomAssignment} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Shuffle className="w-4 h-4 mr-2" />
                      Asignación Aleatoria
                    </Button>
                    <Button onClick={handleSaveGroups} className="bg-green-600 hover:bg-green-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Grupos
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="w-4 h-4" />
                      <span>Equipos sin asignar: {unassignedTeams.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Unassigned Teams */}
              {unassignedTeams.length > 0 && (
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Equipos Disponibles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {unassignedTeams.map((team) => (
                        <Badge
                          key={team}
                          variant="outline"
                          className="text-white border-white/30 cursor-pointer hover:bg-white/10"
                        >
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Groups */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {groups.map((group) => (
                  <Card key={group.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span>{group.name}</span>
                        <Badge variant="outline" className="text-gray-300">
                          {group.teams.length}/4
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {group.teams.map((team, index) => (
                          <div
                            key={team}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#ac3328] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <span className="text-white font-medium">{team}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveTeamFromGroup(group.id, team)}
                              className="bg-red-500/20 border-red-400/50 text-red-400 hover:bg-red-500/30"
                            >
                              Quitar
                            </Button>
                          </div>
                        ))}

                        {group.teams.length < 4 && unassignedTeams.length > 0 && (
                          <div className="border-2 border-dashed border-white/20 rounded-lg p-4">
                            <p className="text-gray-400 text-sm mb-2">Agregar equipo:</p>
                            <div className="flex flex-wrap gap-2">
                              {unassignedTeams.slice(0, 3).map((team) => (
                                <Button
                                  key={team}
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleAddTeamToGroup(group.id, team)}
                                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                                >
                                  + {team}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  )
}
