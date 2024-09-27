"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cloud, CloudRain, Sun } from "lucide-react"

const weatherTypes = [
  { icon: CloudRain, color: "text-blue-500", label: "Rainy" },
  { icon: Cloud, color: "text-gray-500", label: "Cloudy" },
  { icon: Sun, color: "text-yellow-500", label: "Sunny" },
]

export default function WeatherLoader() {
  const [currentWeather, setCurrentWeather] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeather((prev) => (prev + 1) % weatherTypes.length)
    }, 2000) // Change weather every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-sky-300">
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWeather}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {weatherTypes.map((weather, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: index === currentWeather ? 1 : 0,
                  rotate: index === currentWeather ? 0 : -180
                }}
                transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                className={`absolute ${weather.color}`}
              >
                <weather.icon size={64} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        <motion.p
          key={weatherTypes[currentWeather].label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-xl font-semibold text-gray-800"
        >
        </motion.p>
      </div>
    </div>
  )
}