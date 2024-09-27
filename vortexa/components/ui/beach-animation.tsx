"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function BeachAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const startTime = Date.now()

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
    }
  }, [mousePosition])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg cursor-move"
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        className="w-full h-full"
      />
    </motion.div>
  )
}