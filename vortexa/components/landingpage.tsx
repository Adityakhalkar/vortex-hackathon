"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import StickyNote from '@/components/ui/sticky-note'

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const startTime = Date.now()

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawBeach = () => {
      if (!ctx || !canvas) return

      const currentTime = Date.now()
      const elapsedTime = (currentTime - startTime) / 1000 // Time in seconds

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Parallax effect
      const parallaxOffsetX = (mousePosition.x / canvas.width - 0.5) * 20
      const parallaxOffsetY = (mousePosition.y / canvas.height - 0.5) * 10

      // Draw sky
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7)
      skyGradient.addColorStop(0, '#87CEEB') // Light blue
      skyGradient.addColorStop(0.5, '#FFA07A') // Light salmon
      skyGradient.addColorStop(1, '#FF6347') // Tomato
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.7)

      // Draw sun
      const sunY = canvas.height * 0.2 + (elapsedTime * 2) % (canvas.height * 0.5)
      ctx.beginPath()
      ctx.arc(canvas.width * 0.8 + parallaxOffsetX, sunY + parallaxOffsetY, 40, 0, Math.PI * 2)
      ctx.fillStyle = '#FDB813'
      ctx.fill()

      // Draw distant mountains
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.5)
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height * 0.5 + Math.sin(x * 0.01) * 20
        ctx.lineTo(x + parallaxOffsetX * 0.5, y + parallaxOffsetY * 0.5)
      }
      ctx.lineTo(canvas.width, canvas.height * 0.7)
      ctx.lineTo(0, canvas.height * 0.7)
      ctx.fillStyle = '#4B0082' // Indigo
      ctx.fill()

      // Draw sand
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.7)
      ctx.lineTo(canvas.width, canvas.height * 0.7)
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      ctx.fillStyle = '#F4A460' // Sandy brown
      ctx.fill()

      // Draw waves
      const waveAmplitude = 10
      const waveFrequency = 0.02
      const waveSpeed = 0.5
      
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.7)
      
      for (let x = 0; x < canvas.width; x++) {
        const waveOffset = Math.sin((x * waveFrequency) + (elapsedTime * waveSpeed)) * waveAmplitude
        const y = canvas.height * 0.7 + waveOffset + (canvas.height * 0.3 * (x / canvas.width))
        ctx.lineTo(x, y)
      }
      
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      
      const waveGradient = ctx.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height)
      waveGradient.addColorStop(0, 'rgba(30, 144, 255, 0.8)') // Dodger blue with opacity
      waveGradient.addColorStop(1, 'rgba(0, 0, 139, 0.6)') // Dark blue with opacity
      ctx.fillStyle = waveGradient
      ctx.fill()

      // Draw foam
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x += 5) {
        const waveOffset = Math.sin((x * waveFrequency) + (elapsedTime * waveSpeed)) * waveAmplitude
        const y = canvas.height * 0.7 + waveOffset + (canvas.height * 0.3 * (x / canvas.width))
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + 2)
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.stroke()

      animationFrameId = requestAnimationFrame(drawBeach)
    }

    drawBeach()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [mousePosition])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Beach Animation Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">

        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl w-full space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg">
                Crisis Connect
              </h1>
              <p className="mt-3 text-xl sm:text-2xl md:text-3xl text-white drop-shadow-md">
                Saving your life can&apos;t be easier
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <a
                href="#get-started"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out transform hover:scale-105"
              >
                Get Started
              </a>
              <a
                href="#learn-more"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out transform hover:scale-105"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </main>

        <StickyNote />
      </div>
    </div>
  )
}