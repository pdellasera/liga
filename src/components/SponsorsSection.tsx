"use client"

import { motion } from "framer-motion"
import { Card } from "./Card"
import { Heart, Users } from "lucide-react"

const sponsors = [
  { name: "NOVO FUTBOL", category: "main" },
  { name: "RUSHBET", category: "main" },
  { name: "Electrolit", category: "main" },
  { name: "COORDINADORA", category: "main" },
  { name: "golty", category: "main" },
  { name: "Sofascore", category: "main" },
  { name: "mentikol", category: "secondary" },
  { name: "JetSMART", category: "secondary" },
  { name: "compensar", category: "secondary" },
]

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

export default function SponsorsSection() {
  return (
    <section className="px-4 py-12 bg-gradient-to-r from-black/10 to-copa-red/5">
      <motion.div
        className="mx-auto max-w-7xl"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-copa-red" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Nuestros Patrocinadores</h2>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Gracias a nuestros patrocinadores, la Copa Trinche sigue creciendo y brindando la mejor experiencia
            futbolística del barrio.
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 sm:p-12">
            {/* Main Sponsors */}
            <div className="mb-8">
              <h3 className="text-white font-semibold text-lg mb-6 text-center flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-copa-red" />
                Patrocinadores Principales
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
                {sponsors
                  .filter((sponsor) => sponsor.category === "main")
                  .map((sponsor, index) => (
                    <motion.div
                      key={sponsor.name}
                      className="group cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-24 h-16 sm:w-32 sm:h-20 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:border-copa-red/30 transition-all duration-300">
                        <span className="text-white text-xs sm:text-sm font-medium text-center px-2">
                          {sponsor.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            {/* Secondary Sponsors */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 text-center flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-orange-400" />
                Patrocinadores Oficiales
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-items-center">
                {sponsors
                  .filter((sponsor) => sponsor.category === "secondary")
                  .map((sponsor, index) => (
                    <motion.div
                      key={sponsor.name}
                      className="group cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index + 6) * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-32 h-20 sm:w-40 sm:h-24 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:border-orange-400/30 transition-all duration-300">
                        <span className="text-white text-sm sm:text-base font-medium text-center px-3">
                          {sponsor.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={fadeInUp} className="text-center mt-8">
          <p className="text-gray-400 text-sm mb-4">¿Quieres ser parte de la Copa Trinche?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-copa-red text-sm font-medium">
              <Heart className="w-4 h-4 text-white" />
              <span className="text-white">Contactanos para ser patrocinador</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="text-gray-400 text-sm">info@copatrinche.com</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
