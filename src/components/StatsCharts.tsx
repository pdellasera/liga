"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card"
import { useEffect, useRef, useState } from "react"
import * as echarts from "echarts"

export default function StatsCharts() {
  const goalsChartRef = useRef<HTMLDivElement>(null)
  const performanceChartRef = useRef<HTMLDivElement>(null)
  const attendanceChartRef = useRef<HTMLDivElement>(null)

  // Estado para controlar si los gráficos están montados
  const [chartsInitialized, setChartsInitialized] = useState(false)

  // Referencias a las instancias de los gráficos
  const goalsChartInstance = useRef<echarts.ECharts | null>(null)
  const performanceChartInstance = useRef<echarts.ECharts | null>(null)
  const attendanceChartInstance = useRef<echarts.ECharts | null>(null)

  // Inicializar los gráficos después de que los componentes estén montados
  useEffect(() => {
    // Pequeño retraso para asegurar que los contenedores estén renderizados
    const timer = setTimeout(() => {
      initializeCharts()
      setChartsInitialized(true)
    }, 100)

    return () => {
      clearTimeout(timer)
      // Limpiar las instancias de los gráficos al desmontar
      disposeCharts()
    }
  }, [])

  // Manejar el redimensionamiento de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (chartsInitialized) {
        resizeCharts()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [chartsInitialized])

  // Inicializar todos los gráficos
  const initializeCharts = () => {
    initializeGoalsChart()
    initializePerformanceChart()
    initializeAttendanceChart()
  }

  // Redimensionar todos los gráficos
  const resizeCharts = () => {
    goalsChartInstance.current?.resize()
    performanceChartInstance.current?.resize()
    attendanceChartInstance.current?.resize()
  }

  // Limpiar todas las instancias de los gráficos
  const disposeCharts = () => {
    goalsChartInstance.current?.dispose()
    performanceChartInstance.current?.dispose()
    attendanceChartInstance.current?.dispose()

    goalsChartInstance.current = null
    performanceChartInstance.current = null
    attendanceChartInstance.current = null
  }

  // Inicializar el gráfico de goles
  const initializeGoalsChart = () => {
    if (!goalsChartRef.current) return

    // Limpiar instancia previa si existe
    if (goalsChartInstance.current) {
      goalsChartInstance.current.dispose()
    }

    // Crear nueva instancia
    goalsChartInstance.current = echarts.init(goalsChartRef.current)

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        borderColor: "#ac3328",
        borderWidth: 1,
        textStyle: {
          color: "#fff",
          fontSize: 13,
        },
        padding: [10, 15],
        formatter: (params: any) => {
          const data = params[0]
          const teamName = data.name
          const goals = data.value
          const rank = data.dataIndex + 1

          return `<div style="font-weight: bold; color: #ac3328; margin-bottom: 5px;">
                    🏆 ${teamName}
                  </div>
                  <div style="margin-bottom: 3px;">
                    ⚽ Goles: <span style="color: #10B981; font-weight: bold;">${goals}</span>
                  </div>
                  <div style="color: #9CA3AF; font-size: 11px;">
                    📊 Posición: #${rank} en goleadores
                  </div>`
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["Los Cracks", "Unidos FC", "Trinche Utd", "Villa Esp.", "Los Pibes", "Dep. Sur"],
        axisLabel: { color: "#9CA3AF", fontSize: 10 },
        axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.2)" } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#9CA3AF" },
        axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.2)" } },
        splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.1)" } },
      },
      series: [
        {
          data: [12, 13, 11, 9, 10, 8],
          type: "bar",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#ac3328" },
              { offset: 1, color: "#dc2626" },
            ]),
          },
          barWidth: "60%",
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#d97706" },
                { offset: 1, color: "#f59e0b" },
              ]),
            },
          },
          animationDuration: 1000,
          animationEasing: "elasticOut",
        },
      ],
    }

    goalsChartInstance.current.setOption(option)
  }

  // Inicializar el gráfico de rendimiento
  const initializePerformanceChart = () => {
    if (!performanceChartRef.current) return

    // Limpiar instancia previa si existe
    if (performanceChartInstance.current) {
      performanceChartInstance.current.dispose()
    }

    // Crear nueva instancia
    performanceChartInstance.current = echarts.init(performanceChartRef.current)

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        borderColor: "#ac3328",
        borderWidth: 1,
        textStyle: {
          color: "#fff",
          fontSize: 13,
        },
        padding: [10, 15],
        formatter: (params: any) => {
          const indicators = ["Ataque", "Defensa", "Posesión", "Precisión", "Disciplina"]
          const icons = ["⚔️", "🛡️", "⚽", "🎯", "📋"]

          let content = `<div style="font-weight: bold; color: #ac3328; margin-bottom: 8px;">
                          🏅 ${params.name}
                        </div>`

          params.value.forEach((value: number, index: number) => {
            const percentage = value
            const color = percentage >= 80 ? "#10B981" : percentage >= 60 ? "#F59E0B" : "#EF4444"

            content += `<div style="margin-bottom: 4px; display: flex; align-items: center;">
                          <span style="margin-right: 8px;">${icons[index]}</span>
                          <span style="margin-right: 10px; min-width: 70px;">${indicators[index]}:</span>
                          <span style="color: ${color}; font-weight: bold;">${percentage}%</span>
                        </div>`
          })

          return content
        },
      },
      legend: {
        data: ["Los Cracks", "Unidos FC"],
        textStyle: { color: "#9CA3AF" },
        right: "5%",
        top: "5%",
      },
      radar: {
        indicator: [
          { name: "Ataque", max: 100 },
          { name: "Defensa", max: 100 },
          { name: "Posesión", max: 100 },
          { name: "Precisión", max: 100 },
          { name: "Disciplina", max: 100 },
        ],
        axisName: { color: "#9CA3AF", fontSize: 12 },
        axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.2)" } },
        splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.1)" } },
        splitArea: { show: false },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: [95, 85, 78, 82, 75],
              name: "Los Cracks",
              itemStyle: { color: "#ac3328" },
              areaStyle: { color: "rgba(172, 51, 40, 0.2)" },
              lineStyle: { width: 2 },
              symbolSize: 6,
              emphasis: {
                lineStyle: { width: 4 },
                symbolSize: 10,
              },
              animationDuration: 1200,
              animationEasing: "cubicOut",
            },
            {
              value: [88, 78, 85, 79, 88],
              name: "Unidos FC",
              itemStyle: { color: "#dc2626" },
              areaStyle: { color: "rgba(220, 38, 38, 0.2)" },
              lineStyle: { width: 2 },
              symbolSize: 6,
              emphasis: {
                lineStyle: { width: 4 },
                symbolSize: 10,
              },
              animationDuration: 1200,
              animationDelay: 300,
              animationEasing: "cubicOut",
            },
          ],
        },
      ],
    }

    performanceChartInstance.current.setOption(option)
  }

  // Inicializar el gráfico de asistencia
  const initializeAttendanceChart = () => {
    if (!attendanceChartRef.current) return

    // Limpiar instancia previa si existe
    if (attendanceChartInstance.current) {
      attendanceChartInstance.current.dispose()
    }

    // Crear nueva instancia
    attendanceChartInstance.current = echarts.init(attendanceChartRef.current)

    const attendanceData = [120, 145, 132, 168, 155, 142, 178, 165, 188, 195]

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        borderColor: "#10B981",
        borderWidth: 1,
        textStyle: {
          color: "#fff",
          fontSize: 13,
        },
        padding: [10, 15],
        formatter: (params: any) => {
          const data = params[0]
          const jornada = data.name
          const asistencia = data.value
          const dataIndex = data.dataIndex

          // Calcular tendencia
          let tendencia = ""
          let tendenciaColor = "#9CA3AF"
          let tendenciaIcon = "➡️"

          if (dataIndex > 0) {
            const anterior = attendanceData[dataIndex - 1]
            const diferencia = asistencia - anterior

            if (diferencia > 0) {
              tendencia = `+${diferencia} vs anterior`
              tendenciaColor = "#10B981"
              tendenciaIcon = "📈"
            } else if (diferencia < 0) {
              tendencia = `${diferencia} vs anterior`
              tendenciaColor = "#EF4444"
              tendenciaIcon = "📉"
            } else {
              tendencia = "Sin cambios"
              tendenciaIcon = "➡️"
            }
          }

          // Calcular promedio hasta la fecha
          const promedio = Math.round(
            attendanceData.slice(0, dataIndex + 1).reduce((a, b) => a + b, 0) / (dataIndex + 1),
          )

          let content = `<div style="font-weight: bold; color: #10B981; margin-bottom: 6px;">
                          🏟️ ${jornada}
                        </div>
                        <div style="margin-bottom: 4px;">
                          👥 Asistencia: <span style="color: #10B981; font-weight: bold;">${asistencia}</span> personas
                        </div>`

          if (tendencia) {
            content += `<div style="margin-bottom: 4px; color: ${tendenciaColor};">
                          ${tendenciaIcon} ${tendencia}
                        </div>`
          }

          content += `<div style="color: #9CA3AF; font-size: 11px;">
                        📊 Promedio: ${promedio} personas
                      </div>`

          return content
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"],
        axisLabel: { color: "#9CA3AF" },
        axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.2)" } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#9CA3AF" },
        axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.2)" } },
        splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.1)" } },
      },
      series: [
        {
          data: attendanceData,
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          itemStyle: { color: "#10B981" },
          lineStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#10B981" },
              { offset: 1, color: "#ac3328" },
            ]),
            width: 3,
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowBlur: 10,
            shadowOffsetY: 5,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(16, 185, 129, 0.3)" },
              { offset: 1, color: "rgba(172, 51, 40, 0.05)" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: "#fff",
              borderColor: "#10B981",
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 10,
            },
          },
          animationDuration: 1500,
          animationDelay: (idx: number) => idx * 100,
        },
      ],
    }

    attendanceChartInstance.current.setOption(option)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Goles por Equipo</CardTitle>
            <CardDescription className="text-gray-300">Top 6 equipos goleadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={goalsChartRef} className="w-full h-64" style={{ minHeight: "256px" }} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Rendimiento</CardTitle>
            <CardDescription className="text-gray-300">Comparativa de líderes</CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={performanceChartRef} className="w-full h-64" style={{ minHeight: "256px" }} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="lg:col-span-2 xl:col-span-1"
      >
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Asistencia</CardTitle>
            <CardDescription className="text-gray-300">Promedio por jornada</CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={attendanceChartRef} className="w-full h-64" style={{ minHeight: "256px" }} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
