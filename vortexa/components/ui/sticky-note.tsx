"use client";
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const newsItems = [
  "Earthquake warning issued for coastal regions",
  "Hurricane approaching: Prepare for evacuation",
  "Wildfire alert: Stay indoors and follow safety guidelines",
  "Flood warning: Avoid low-lying areas",
]

export default function StickyNote() {
  const [currentNews, setCurrentNews] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="fixed bottom-4 right-4 bg-yellow-200 p-4 rounded-lg shadow-lg max-w-sm"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="font-bold text-lg mb-2">Latest News</h3>
          <p className="text-gray-800">{newsItems[currentNews]}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}