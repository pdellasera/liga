"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Button } from "./Button"
import { Input } from "./Input"
import { Label } from "./Label"
import { Badge } from "./Badge"
import { ArrowLeft, Plus, Users, Edit, Trash2, Save, ImageIcon, FileText } from "lucide-react"
import { useState } from "react"

interface Player {
  id: string
  name: string
  position: string
  number: number
  age: number
  nationality: string
}

interface Club {
  id: string
  name: string
  logo: string
  founded: string
  colors: string
  players: Player[]
}

const positions = [
  "Portero",
  "Defensa Central",
  "Lateral Derecho",
  "Lateral Izquierdo",
  "Mediocampista Defensivo",
  "Mediocampista Central",
  "Mediocampista Ofensivo",
  "Extremo Derecho",
  "Extremo Izquierdo",
  "Delantero Centro",
]

export default function ClubManagement({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"create" | "manage" | "roster">("create")
  const [selectedClub, setSelectedClub] = useState<Club | null>(null)
  //const [isEditing, setIsEditing] = useState(false)

  // Estados para crear club
  const [clubForm, setClubForm] = useState({
    name: "",
    founded: "",
    colors: "",
    logo: null as File | null,
  })

  // Estados para plantilla
  const [players, setPlayers] = useState<Player[]>([])
  const [playerForm, setPlayerForm] = useState({
    name: "",
    position: "",
    number: "",
    age: "",
    nationality: "Colombia",
  })

  // Clubes existentes (mock data)
  const [clubs, setClubs] = useState<Club[]>([
    {
      id: "1",
      name: "Los Cracks",
      logo: "/images/escudos/soccer-club-template.png",
      founded: "2020",
      colors: "Rojo y Blanco",
      players: [
        { id: "1", name: "Juan Pérez", position: "Portero", number: 1, age: 25, nationality: "Colombia" },
        { id: "2", name: "Carlos Rodríguez", position: "Defensa Central", number: 4, age: 28, nationality: "Colombia" },
        {
          id: "3",
          name: "Miguel Torres",
          position: "Mediocampista Central",
          number: 10,
          age: 26,
          nationality: "Colombia",
        },
      ],
    },
    {
      id: "2",
      name: "Barrio FC",
      logo: "/placeholder.svg?height=64&width=64",
      founded: "2019",
      colors: "Azul y Amarillo",
      players: [],
    },
  ])

  const handleCreateClub = () => {
    if (clubForm.name && clubForm.founded && clubForm.colors) {
      const newClub: Club = {
        id: Date.now().toString(),
        name: clubForm.name,
        logo: clubForm.logo ? URL.createObjectURL(clubForm.logo) : "/placeholder.svg?height=64&width=64",
        founded: clubForm.founded,
        colors: clubForm.colors,
        players: [],
      }
      setClubs([...clubs, newClub])
      setClubForm({ name: "", founded: "", colors: "", logo: null })
      alert("Club creado exitosamente!")
    }
  }

  const handleAddPlayer = () => {
    if (playerForm.name && playerForm.position && playerForm.number && playerForm.age) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: playerForm.name,
        position: playerForm.position,
        number: Number.parseInt(playerForm.number),
        age: Number.parseInt(playerForm.age),
        nationality: playerForm.nationality,
      }
      setPlayers([...players, newPlayer])
      setPlayerForm({ name: "", position: "", number: "", age: "", nationality: "Colombia" })
    }
  }

  const handleRemovePlayer = (playerId: string) => {
    setPlayers(players.filter((p) => p.id !== playerId))
  }

  const handleSaveRoster = () => {
    if (selectedClub) {
      const updatedClubs = clubs.map((club) => (club.id === selectedClub.id ? { ...club, players: players } : club))
      setClubs(updatedClubs)
      alert("Plantilla guardada exitosamente!")
    }
  }

  const handleSelectClub = (club: Club) => {
    setSelectedClub(club)
    setPlayers(club.players)
    setActiveTab("roster")
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
              <h2 className="text-3xl font-bold text-white">Gestión de Clubes</h2>
              <p className="text-gray-300">Administra equipos y plantillas</p>
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
              Crear Club
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
              <Users className="w-4 h-4 mr-2" />
              Gestionar Clubes
            </Button>
            {selectedClub && (
              <Button
                variant={activeTab === "roster" ? "default" : "outline"}
                onClick={() => setActiveTab("roster")}
                className={
                  activeTab === "roster"
                    ? "bg-[#ac3328] text-white"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }
              >
                <FileText className="w-4 h-4 mr-2" />
                Plantilla - {selectedClub.name}
              </Button>
            )}
          </div>

          {/* Create Club Tab */}
          {activeTab === "create" && (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#ac3328]" />
                  Crear Nuevo Club
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="clubName" className="text-gray-300">
                        Nombre del Club
                      </Label>
                      <Input
                        id="clubName"
                        value={clubForm.name}
                        onChange={(e) => setClubForm({ ...clubForm, name: e.target.value })}
                        placeholder="Ej: Deportivo Barrio"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="founded" className="text-gray-300">
                        Año de Fundación
                      </Label>
                      <Input
                        id="founded"
                        value={clubForm.founded}
                        onChange={(e) => setClubForm({ ...clubForm, founded: e.target.value })}
                        placeholder="Ej: 2020"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="colors" className="text-gray-300">
                        Colores del Equipo
                      </Label>
                      <Input
                        id="colors"
                        value={clubForm.colors}
                        onChange={(e) => setClubForm({ ...clubForm, colors: e.target.value })}
                        placeholder="Ej: Rojo y Blanco"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="logo" className="text-gray-300">
                        Logo del Club
                      </Label>
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                        <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-400 text-sm mb-2">Arrastra una imagen o haz clic para seleccionar</p>
                        <Input
                          id="logo"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setClubForm({ ...clubForm, logo: e.target.files?.[0] || null })}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreateClub}
                  className="w-full bg-gradient-to-r from-[#ac3328] to-red-600 hover:from-[#8b2a21] hover:to-red-700 text-white font-semibold"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Crear Club
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Manage Clubs Tab */}
          {activeTab === "manage" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club) => (
                  <Card
                    key={club.id}
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={club.logo || "/placeholder.svg?height=64&width=64"}
                          alt={club.name}
                          className="w-16 h-16 object-contain rounded-lg bg-white/10 p-2"
                        />
                        <div>
                          <h3 className="text-white font-bold text-lg">{club.name}</h3>
                          <p className="text-gray-300 text-sm">Fundado en {club.founded}</p>
                          <Badge variant="outline" className="text-xs mt-1 text-gray-300 border-gray-400/50">
                            {club.colors}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Jugadores:</span>
                          <span className="text-white font-medium">{club.players.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Estado:</span>
                          <Badge variant="outline" className="text-green-400 border-green-400/50">
                            Activo
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSelectClub(club)}
                          className="flex-1 bg-[#ac3328] hover:bg-[#8b2a21] text-white"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Plantilla
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

              {clubs.length === 0 && (
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-12 text-center">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-white text-xl font-semibold mb-2">No hay clubes registrados</h3>
                    <p className="text-gray-400 mb-6">Crea tu primer club para comenzar</p>
                    <Button
                      onClick={() => setActiveTab("create")}
                      className="bg-[#ac3328] hover:bg-[#8b2a21] text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Crear Club
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Roster Management Tab */}
          {activeTab === "roster" && selectedClub && (
            <div className="space-y-6">
              {/* Add Player Form */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#ac3328]" />
                    Agregar Jugador
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="playerName" className="text-gray-300">
                        Nombre
                      </Label>
                      <Input
                        id="playerName"
                        value={playerForm.name}
                        onChange={(e) => setPlayerForm({ ...playerForm, name: e.target.value })}
                        placeholder="Nombre completo"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="position" className="text-gray-300">
                        Posición
                      </Label>
                      <select
                        id="position"
                        value={playerForm.position}
                        onChange={(e) => setPlayerForm({ ...playerForm, position: e.target.value })}
                        className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                      >
                        <option value="">Seleccionar</option>
                        {positions.map((pos) => (
                          <option key={pos} value={pos} className="bg-slate-800">
                            {pos}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="number" className="text-gray-300">
                        Número
                      </Label>
                      <Input
                        id="number"
                        type="number"
                        value={playerForm.number}
                        onChange={(e) => setPlayerForm({ ...playerForm, number: e.target.value })}
                        placeholder="1-99"
                        min="1"
                        max="99"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="age" className="text-gray-300">
                        Edad
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={playerForm.age}
                        onChange={(e) => setPlayerForm({ ...playerForm, age: e.target.value })}
                        placeholder="18-45"
                        min="16"
                        max="50"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div className="flex items-end">
                      <Button onClick={handleAddPlayer} className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Players List */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#ac3328]" />
                    Plantilla - {selectedClub.name} ({players.length} jugadores)
                  </CardTitle>
                  <Button onClick={handleSaveRoster} className="bg-[#ac3328] hover:bg-[#8b2a21] text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Plantilla
                  </Button>
                </CardHeader>
                <CardContent>
                  {players.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-400">No hay jugadores en la plantilla</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left p-3 text-white font-semibold">#</th>
                            <th className="text-left p-3 text-white font-semibold">Nombre</th>
                            <th className="text-left p-3 text-white font-semibold">Posición</th>
                            <th className="text-left p-3 text-white font-semibold">Edad</th>
                            <th className="text-left p-3 text-white font-semibold">Nacionalidad</th>
                            <th className="text-center p-3 text-white font-semibold">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {players.map((player) => (
                            <tr key={player.id} className="border-b border-white/10 hover:bg-white/5">
                              <td className="p-3 text-white font-bold">{player.number}</td>
                              <td className="p-3 text-white">{player.name}</td>
                              <td className="p-3 text-gray-300">{player.position}</td>
                              <td className="p-3 text-gray-300">{player.age}</td>
                              <td className="p-3 text-gray-300">{player.nationality}</td>
                              <td className="p-3 text-center">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRemovePlayer(player.id)}
                                  className="bg-red-500/20 border-red-400/50 text-red-400 hover:bg-red-500/30"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  )
}
