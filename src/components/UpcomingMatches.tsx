"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "./Card"
import { Button } from "./Button"
import { Modal, ModalContent, ModalHeader, ModalTitle } from "./Modal"
import { Badge } from "./Badge"
import { Input } from "./Input"
import { Label } from "./Label"
import {
  Play,
  PlayCircle,
  Ticket,
  MapPin,
  Calendar,
  CreditCard,
  Clock,
  AlertCircle,
  Building2,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  Lock,
  CreditCardIcon,
  Loader2,
  Download,
  Mail,
  Share2,
  Star,
} from "lucide-react"
import { useState, useEffect } from "react"

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

const teamAbbreviations: { [key: string]: string } = {
  "Los Cracks": "CRA",
  "Barrio FC": "BAR",
  "Racing Barrio": "RAC",
  "Los Guerreros": "GUE",
  "Trinche United": "TRI",
  "Villa Esperanza": "VIL",
  "Club Atlético": "ATL",
  "San Lorenzo B": "SLB",
  "Los Pibes": "PIB",
  "Deportivo Sur": "DEP",
  "Estudiantes FC": "EST",
  "Atlético Barrio": "ATB",
  "Unidos FC": "UNI",
  Defensores: "DEF",
  "Juventud FC": "JUV",
  "Tigres FC": "TIG",
}

const upcomingMatches = [
  {
    id: 1,
    homeTeam: "Los Cracks",
    awayTeam: "Barrio FC",
    date: "2024-01-15",
    time: "16:00",
    venue: "Cancha Municipal",
    round: "Jornada 6",
    group: "Grupo Rushbet",
    importance: "high",
    status: "Hoy",
    streamStatus: "live",
    ticketPrice: 15000,
    capacity: 200,
    soldTickets: 150,
  },
  {
    id: 2,
    homeTeam: "Trinche United",
    awayTeam: "Villa Esperanza",
    date: "2024-01-15",
    time: "18:00",
    venue: "Estadio del Barrio",
    round: "Jornada 6",
    group: "Grupo Coordinadora",
    importance: "high",
    status: "Hoy",
    streamStatus: "live",
    ticketPrice: 18000,
    capacity: 300,
    soldTickets: 280,
  },
  {
    id: 3,
    homeTeam: "Los Pibes",
    awayTeam: "Deportivo Sur",
    date: "2024-01-16",
    time: "15:30",
    venue: "Complejo Deportivo",
    round: "Jornada 6",
    group: "Grupo Electrolit",
    importance: "medium",
    status: "Mañana",
    streamStatus: "upcoming",
    ticketPrice: 12000,
    capacity: 150,
    soldTickets: 80,
  },
  {
    id: 4,
    homeTeam: "Unidos FC",
    awayTeam: "Defensores",
    date: "2024-01-16",
    time: "17:00",
    venue: "Cancha Sintética",
    round: "Jornada 6",
    group: "Grupo Jet Smart",
    importance: "medium",
    status: "Mañana",
    streamStatus: "upcoming",
    ticketPrice: 10000,
    capacity: 120,
    soldTickets: 45,
  },
  {
    id: 5,
    homeTeam: "Racing Barrio",
    awayTeam: "Los Guerreros",
    date: "2024-01-17",
    time: "16:30",
    venue: "Campo de Juego",
    round: "Jornada 6",
    group: "Grupo Rushbet",
    importance: "low",
    status: "Miércoles",
    streamStatus: "upcoming",
    ticketPrice: 8000,
    capacity: 100,
    soldTickets: 25,
  },
  {
    id: 6,
    homeTeam: "Club Atlético",
    awayTeam: "San Lorenzo B",
    date: "2024-01-17",
    time: "18:30",
    venue: "Estadio Comunitario",
    round: "Jornada 6",
    group: "Grupo Coordinadora",
    importance: "low",
    status: "Miércoles",
    streamStatus: "upcoming",
    ticketPrice: 8000,
    capacity: 80,
    soldTickets: 15,
  },
]

const getStreamConfig = (streamStatus: string) => {
  switch (streamStatus) {
    case "live":
      return {
        icon: <PlayCircle className="w-4 h-4" />,
        text: "Transmisión en vivo disponible",
        iconBg: "bg-green-500/30 border-green-400/50",
        iconColor: "text-green-400",
        textColor: "text-green-300",
        pulse: true,
      }
    default: 
      return {
        icon: <Play className="w-4 h-4" />,
        text: "Transmisión próximamente",
        iconBg: "bg-gray-500/30 border-gray-400/50",
        iconColor: "text-gray-400",
        textColor: "text-gray-400",
        pulse: false,
      }
  }
}

const paymentMethods = [
  {
    id: "card",
    name: "Tarjeta de Crédito/Débito",
    description: "Visa, Mastercard, American Express",
    icon: <CreditCard className="w-6 h-6" />,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-400/50",
    popular: true,
  },
  {
    id: "pse",
    name: "PSE",
    description: "Pagos Seguros en Línea",
    icon: <Building2 className="w-6 h-6" />,
    color: "text-green-400",
    bg: "bg-green-500/20",
    border: "border-green-400/50",
    popular: false,
  },
  {
    id: "transfer",
    name: "Transferencia Bancaria",
    description: "Bancolombia, Davivienda, BBVA",
    icon: <ArrowRight className="w-6 h-6" />,
    color: "text-purple-400",
    bg: "bg-purple-500/20",
    border: "border-purple-400/50",
    popular: false,
  },
]

// Componente para la pantalla de confirmación de pago exitoso
function PaymentSuccess({
  match,
  selectedQuantity,
  total,
  onClose,
}: {
  match: any
  selectedQuantity: number
  total: number
  onClose: () => void
}) {
  const transactionId = `CT${Date.now().toString().slice(-8)}`

  return (
    <Modal isOpen={true} onClose={onClose} className="max-w-lg">
      <ModalContent className="text-center py-6">
        {/* Icono de éxito animado */}
        <motion.div
          className="relative mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", duration: 0.4 }}
            >
              <CheckCircle className="w-12 h-12 text-green-400" />
            </motion.div>
          </div>
          {/* Efecto de confetti */}
          <motion.div
            className="absolute -top-2 -left-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Star className="w-4 h-4 text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Star className="w-4 h-4 text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Star className="w-4 h-4 text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -right-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <Star className="w-4 h-4 text-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Título y mensaje */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">¡Pago Exitoso!</h2>
          <p className="text-gray-300 mb-6">Tu compra se ha procesado correctamente</p>
        </motion.div>

        {/* Detalles de la compra */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={teamLogos[match.homeTeam] || "/placeholder.svg"}
                alt={match.homeTeam}
                className="w-8 h-8 object-contain"
              />
              <div className="text-left">
                <div className="font-bold text-white">
                  {teamAbbreviations[match.homeTeam]} vs {teamAbbreviations[match.awayTeam]}
                </div>
                <div className="text-sm text-gray-400">{match.round}</div>
              </div>
              <img
                src={teamLogos[match.awayTeam] || "/placeholder.svg"}
                alt={match.awayTeam}
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-copa-red" />
              <span className="text-gray-300">{match.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-copa-red" />
              <span className="text-gray-300">{match.time}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <MapPin className="w-4 h-4 text-copa-red" />
              <span className="text-gray-300">{match.venue}</span>
            </div>
          </div>

          <div className="border-t border-white/20 pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Cantidad:</span>
              <span className="text-white">{selectedQuantity} entrada(s)</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Precio unitario:</span>
              <span className="text-white">${match.ticketPrice.toLocaleString()} COP</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span className="text-white">Total pagado:</span>
              <span className="text-copa-red">${total.toLocaleString()} COP</span>
            </div>
          </div>
        </motion.div>

        {/* Información de la transacción */}
        <motion.div
          className="bg-green-500/10 backdrop-blur-sm rounded-lg p-3 border border-green-400/30 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Transacción completada</span>
          </div>
          <div className="text-xs text-green-300/80">
            ID de transacción: <span className="font-mono">{transactionId}</span>
          </div>
        </motion.div>

        {/* Información sobre las entradas */}
        <motion.div
          className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
            <Mail className="w-4 h-4" />
            <span className="font-medium">Entradas enviadas por correo</span>
          </div>
          <p className="text-xs text-blue-300/80 text-left">
            Recibirás tus entradas digitales en tu correo electrónico en los próximos 5 minutos. Revisa también tu
            carpeta de spam.
          </p>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => {
                // Simular descarga de entradas
                console.log("Descargando entradas...")
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => {
                // Simular compartir
                console.log("Compartiendo...")
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-copa-red to-red-600 hover:from-copa-red-dark hover:to-red-700 text-white font-semibold py-3"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </motion.div>

        {/* Mensaje adicional */}
        <motion.p
          className="text-xs text-gray-400 text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          ¡Gracias por ser parte de la Copa Trinche! Te esperamos en el estadio.
        </motion.p>
      </ModalContent>
    </Modal>
  )
}

function PaymentMethodModal({
  match,
  selectedQuantity,
  total,
  onClose,
}: { match: any; selectedQuantity: number; total: number; onClose: () => void }) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [showCardForm, setShowCardForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Estados para el formulario de tarjeta
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

  // Validar el formulario cuando cambian los campos
  useEffect(() => {
    const isValid =
      cardNumber.replace(/\s/g, "").length === 16 && cardName.length > 3 && expiryDate.length === 5 && cvv.length === 3

    setIsFormValid(isValid)
  }, [cardNumber, cardName, expiryDate, cvv])

  // Formatear número de tarjeta con espacios cada 4 dígitos
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 16)
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
    setCardNumber(formattedValue)
  }

  // Formatear fecha de expiración como MM/YY
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 4)
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2)
    }
    setExpiryDate(value)
  }

  // Manejar la selección de método de pago
  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
  }

  // Manejar el continuar con el método seleccionado
  const handleContinue = () => {
    if (selectedMethod === "card") {
      setShowCardForm(true)
    } else {
      // Para otros métodos de pago, simular procesamiento
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setPaymentSuccess(true)
      }, 3000)
    }
  }

  // Manejar el envío del formulario de tarjeta
  const handleCardSubmit = () => {
    setIsProcessing(true)
    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)
    }, 3000)
  }

  // Manejar el cierre del modal de éxito
  const handleCloseSuccess = () => {
    setPaymentSuccess(false)
    setShowCardForm(false)
    setSelectedMethod(null)
    setCardNumber("")
    setCardName("")
    setExpiryDate("")
    setCvv("")
    onClose()
  }

  // Si el pago fue exitoso, mostrar pantalla de confirmación
  if (paymentSuccess) {
    return (
      <PaymentSuccess match={match} selectedQuantity={selectedQuantity} total={total} onClose={handleCloseSuccess} />
    )
  }

  // Si está procesando el pago, mostrar pantalla de procesamiento
  if (isProcessing) {
    return (
      <Modal isOpen={true} onClose={() => {}} className="max-w-lg">
        <ModalContent className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full bg-copa-red/20 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-copa-red animate-spin" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Lock className="w-3 h-3 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Procesando Pago</h2>
          <p className="text-gray-300 text-center mb-6">
            Estamos procesando tu pago. Por favor no cierres esta ventana.
          </p>

          <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estado:</span>
                <span className="text-white font-medium">Verificando tarjeta...</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-copa-red h-full rounded-full animate-progress"></div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            Este proceso puede tomar unos segundos. Estamos validando tu información.
          </p>
        </ModalContent>
      </Modal>
    )
  }

  // Si se seleccionó tarjeta de crédito, mostrar formulario dentro del modal
  if (showCardForm) {
    return (
      <Modal isOpen={true} onClose={onClose} className="max-w-lg">
        <ModalHeader>
          <div className="flex items-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white mr-2"
              onClick={() => setShowCardForm(false)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Volver
            </Button>
            <ModalTitle className="text-white text-xl font-bold">Datos de la Tarjeta</ModalTitle>
          </div>
        </ModalHeader>

        <ModalContent className="space-y-6">
          {/* Resumen de compra */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={teamLogos[match.homeTeam] || "/placeholder.svg"}
                  alt={match.homeTeam}
                  className="w-6 h-6 object-contain"
                />
                <span className="font-medium text-sm">
                  {teamAbbreviations[match.homeTeam]} vs {teamAbbreviations[match.awayTeam]}
                </span>
                <img
                  src={teamLogos[match.awayTeam] || "/placeholder.svg"}
                  alt={match.awayTeam}
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>
                {selectedQuantity} entrada(s) × ${match.ticketPrice.toLocaleString()}
              </span>
              <span className="font-bold text-white">${total.toLocaleString()} COP</span>
            </div>
            <div className="text-xs text-gray-400">
              {match.venue} • {match.status} • {match.time}
            </div>
          </div>

          {/* Formulario de tarjeta */}
          <div className="space-y-4">
            {/* Número de tarjeta */}
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-gray-300">
                Número de Tarjeta
              </Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="bg-white/10 border-white/20 text-white pl-10"
                  maxLength={19}
                />
                <CreditCardIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Nombre en la tarjeta */}
            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-gray-300">
                Nombre en la Tarjeta
              </Label>
              <Input
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="NOMBRE APELLIDO"
                className="bg-white/10 border-white/20 text-white uppercase"
              />
            </div>

            {/* Fecha y CVV en dos columnas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-gray-300">
                  Fecha de Expiración
                </Label>
                <Input
                  id="expiryDate"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  className="bg-white/10 border-white/20 text-white"
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-gray-300">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 3))}
                  placeholder="123"
                  className="bg-white/10 border-white/20 text-white"
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>
          </div>

          {/* Información de seguridad */}
          <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-3 border border-green-400/30">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <Lock className="w-4 h-4" />
              <span className="font-medium">Pago 100% seguro y encriptado</span>
            </div>
            <p className="text-green-300/80 text-xs mt-1">Tus datos están protegidos con certificación SSL</p>
          </div>

          {/* Botón de pago */}
          <Button
            className="w-full bg-gradient-to-r from-copa-red to-red-600 hover:from-copa-red-dark hover:to-red-700 text-white font-semibold py-3"
            disabled={!isFormValid}
            onClick={handleCardSubmit}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Pagar ${total.toLocaleString()} COP
          </Button>

          <div className="flex items-center justify-center gap-2 mt-2">
            <img src="/placeholder.svg?height=20&width=30" alt="Visa" className="h-5 opacity-70" />
            <img src="/placeholder.svg?height=20&width=30" alt="Mastercard" className="h-5 opacity-70" />
            <img src="/placeholder.svg?height=20&width=30" alt="American Express" className="h-5 opacity-70" />
          </div>
        </ModalContent>
      </Modal>
    )
  }

  // Vista principal de selección de métodos de pago
  return (
    <Modal isOpen={true} onClose={onClose} className="max-w-lg">
      <ModalHeader>
        <ModalTitle className="text-white text-xl font-bold mb-4">Seleccionar Método de Pago</ModalTitle>
      </ModalHeader>

      <ModalContent>
        {/* Resumen de compra */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={teamLogos[match.homeTeam] || "/placeholder.svg"}
                alt={match.homeTeam}
                className="w-6 h-6 object-contain"
              />
              <span className="font-medium text-sm">
                {teamAbbreviations[match.homeTeam]} vs {teamAbbreviations[match.awayTeam]}
              </span>
              <img
                src={teamLogos[match.awayTeam] || "/placeholder.svg"}
                alt={match.awayTeam}
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>
              {selectedQuantity} entrada(s) × ${match.ticketPrice.toLocaleString()}
            </span>
            <span className="font-bold text-white">${total.toLocaleString()} COP</span>
          </div>
          <div className="text-xs text-gray-400">
            {match.venue} • {match.status} • {match.time}
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="space-y-3 mb-6">
          <h3 className="text-white font-semibold mb-4">Elige tu método de pago:</h3>
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                selectedMethod === method.id
                  ? `${method.border} ${method.bg}`
                  : "border-white/20 bg-white/5 hover:bg-white/10"
              }`}
              onClick={() => handleMethodSelect(method.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`${method.color} ${selectedMethod === method.id ? method.bg : "bg-white/10"} p-2 rounded-lg`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{method.name}</h4>
                      {method.popular && <Badge className="bg-copa-red text-white text-xs px-2 py-0.5">Popular</Badge>}
                    </div>
                    <p className="text-gray-400 text-sm">{method.description}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedMethod === method.id ? `${method.border} ${method.bg}` : "border-white/30"
                    } flex items-center justify-center`}
                  >
                    {selectedMethod === method.id && <CheckCircle className={`w-3 h-3 ${method.color}`} />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Información de seguridad */}
        <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-3 border border-green-400/30 mb-6">
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Pago 100% seguro y encriptado</span>
          </div>
          <p className="text-green-300/80 text-xs mt-1">Tus datos están protegidos con certificación SSL</p>
        </div>

        {/* Botón de continuar */}
        <Button
          className="w-full bg-gradient-to-r from-copa-red to-red-600 hover:from-copa-red-dark hover:to-red-700 text-white font-semibold py-3"
          disabled={!selectedMethod}
          onClick={handleContinue}
        >
          <div className="flex items-center gap-2">
            {selectedMethod && paymentMethods.find((m) => m.id === selectedMethod)?.icon}
            <span>
              Continuar con {selectedMethod ? paymentMethods.find((m) => m.id === selectedMethod)?.name : "Pago"}
            </span>
          </div>
        </Button>

        <p className="text-xs text-gray-400 text-center mt-3">
          Al continuar, aceptas nuestros términos y condiciones de venta
        </p>
      </ModalContent>
    </Modal>
  )
}

function TicketModal({ match, isOpen, onClose }: { match: any; isOpen: boolean; onClose: () => void }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const availableTickets = match.capacity - match.soldTickets
  const occupancyPercentage = (match.soldTickets / match.capacity) * 100
  const total = match.ticketPrice * selectedQuantity

  const getAvailabilityStatus = () => {
    if (occupancyPercentage >= 95) return { text: "Últimas entradas", color: "text-red-400", bg: "bg-red-500/20" }
    if (occupancyPercentage >= 80) return { text: "Pocas entradas", color: "text-orange-400", bg: "bg-orange-500/20" }
    return { text: "Entradas disponibles", color: "text-green-400", bg: "bg-green-500/20" }
  }

  const status = getAvailabilityStatus()

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
        <ModalHeader>
          <ModalTitle className="text-white text-xl font-bold mb-4">Comprar Entradas</ModalTitle>
        </ModalHeader>

        <ModalContent>
          {/* Match Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={teamLogos[match.homeTeam] || "/placeholder.svg"}
                  alt={match.homeTeam}
                  className="w-8 h-8 object-contain"
                />
                <span className="font-bold">{teamAbbreviations[match.homeTeam]}</span>
              </div>
              <div className="text-copa-red font-bold">VS</div>
              <div className="flex items-center gap-3">
                <span className="font-bold">{teamAbbreviations[match.awayTeam]}</span>
                <img
                  src={teamLogos[match.awayTeam] || "/placeholder.svg"}
                  alt={match.awayTeam}
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-copa-red" />
                <span>{match.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-copa-red" />
                <span>{match.time}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <MapPin className="w-4 h-4 text-copa-red" />
                <span>{match.venue}</span>
              </div>
            </div>
          </div>

          {/* Availability Status */}
          <div className={`${status.bg} backdrop-blur-sm rounded-lg p-3 border border-white/20 mb-4`}>
            <div className="flex items-center justify-between">
              <span className={`font-medium ${status.color}`}>{status.text}</span>
              <span className="text-gray-300 text-sm">{availableTickets} disponibles</span>
            </div>
            <div className="mt-2 bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-copa-red to-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{match.soldTickets} vendidas</span>
              <span>{match.capacity} total</span>
            </div>
          </div>

          {/* Ticket Selection */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Entrada General</h3>
                <p className="text-gray-400 text-sm">Acceso a todas las áreas públicas</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-copa-red">${match.ticketPrice.toLocaleString()}</div>
                <div className="text-xs text-gray-400">COP</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Cantidad:</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="w-8 h-8 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  -
                </Button>
                <span className="w-8 text-center font-bold">{selectedQuantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedQuantity(Math.min(availableTickets, selectedQuantity + 1))}
                  className="w-8 h-8 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 mb-6">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-copa-red">${total.toLocaleString()} COP</span>
            </div>
          </div>

          {/* Purchase Button */}
          <Button
            className="w-full bg-gradient-to-r from-copa-red to-red-600 hover:from-copa-red-dark hover:to-red-700 text-white font-semibold py-3"
            disabled={availableTickets === 0}
            onClick={() => setShowPaymentModal(true)}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {availableTickets === 0 ? "Agotado" : "Proceder al Pago"}
          </Button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Las entradas se enviarán por correo electrónico después del pago
          </p>
        </ModalContent>
      </Modal>

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <PaymentMethodModal
          match={match}
          selectedQuantity={selectedQuantity}
          total={total}
          onClose={() => {
            setShowPaymentModal(false)
            onClose()
          }}
        />
      )}
    </>
  )
}

export default function UpcomingMatches() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [selectedMatch, setSelectedMatch] = useState<any>(null)

  // Actualizar la hora actual cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {upcomingMatches.map((match, index) => {
        const streamConfig = getStreamConfig(match.streamStatus)
        const availableTickets = match.capacity - match.soldTickets

        // Verificar si el partido ya comenzó (si es hoy)
        const isToday = match.status === "Hoy"
        const matchHour = Number.parseInt(match.time.split(":")[0])
        const matchMinute = Number.parseInt(match.time.split(":")[1])
        const currentHour = currentTime.getHours()
        const currentMinute = currentTime.getMinutes()

        const matchHasStarted =
          isToday && (currentHour > matchHour || (currentHour === matchHour && currentMinute >= matchMinute))

        return (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-4 pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">Copa Trinche 2024</h3>
                      <p className="text-gray-300 text-xs">
                        {match.round} • {match.group} • {match.venue}
                      </p>
                    </div>
                    <span className="text-white font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs border border-white/30">
                      {match.status}
                    </span>
                  </div>
                </div>

                {/* Teams Section */}
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    {/* Home Team */}
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={teamLogos[match.homeTeam] || "/placeholder.svg"}
                        alt={`${match.homeTeam} escudo`}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-white font-bold text-base">{teamAbbreviations[match.homeTeam]}</span>
                    </div>

                    {/* Time */}
                    <div className="text-white font-bold text-2xl px-4">{match.time}</div>

                    {/* Away Team */}
                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <span className="text-white font-bold text-base">{teamAbbreviations[match.awayTeam]}</span>
                      <img
                        src={teamLogos[match.awayTeam] || "/placeholder.svg"}
                        alt={`${match.awayTeam} escudo`}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Ticket Section */}
                <div className="px-4 py-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-copa-red" />
                      <span className="text-white font-medium text-sm">${match.ticketPrice.toLocaleString()} COP</span>
                    </div>

                    {matchHasStarted ? (
                      <Badge variant="outline" className="text-xs text-amber-400 border-amber-400/50">
                        Partido en curso
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          availableTickets > 20
                            ? "text-green-400 border-green-400/50"
                            : availableTickets > 0
                              ? "text-orange-400 border-orange-400/50"
                              : "text-red-400 border-red-400/50"
                        }`}
                      >
                        {availableTickets > 0 ? `${availableTickets} disponibles` : "Agotado"}
                      </Badge>
                    )}
                  </div>

                  {matchHasStarted ? (
                    <div className="w-full bg-amber-500/20 backdrop-blur-sm text-white font-medium rounded-md py-2 px-4 flex items-center justify-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">Venta de entradas cerrada</span>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-copa-red to-red-600 hover:from-copa-red-dark hover:to-red-700 text-white font-semibold mb-3"
                      disabled={availableTickets === 0}
                      onClick={() => setSelectedMatch(match)}
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      {availableTickets === 0 ? "Agotado" : "Comprar Entrada"}
                    </Button>
                  )}
                </div>

                {/* Stream Section */}
                <div className="px-4 py-3 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${streamConfig.iconBg} backdrop-blur-sm rounded-full p-1.5 border ${streamConfig.pulse ? "animate-pulse" : ""}`}
                    >
                      <div className={streamConfig.iconColor}>{streamConfig.icon}</div>
                    </div>
                    <span className={`text-xs font-medium ${streamConfig.textColor}`}>{streamConfig.text}</span>
                    {match.streamStatus === "live" && (
                      <div className="ml-auto">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-400 text-xs font-bold">EN VIVO</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}

      {/* Ticket Modal */}
      {selectedMatch && (
        <TicketModal match={selectedMatch} isOpen={!!selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  )
}
