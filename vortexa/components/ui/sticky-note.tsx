'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Location {
  latitude: string
  longitude: string
}

interface SafeZone {
  name: string
  display_name: string
  distance: number
}

interface SafeZoneResponse {
  name?: string
  display_name: string
  lat: string
  lon: string
}

export default function SafetyAlert() {
  const [currentNews, setCurrentNews] = useState<string>('')
  const [isVisible, setIsVisible] = useState(true)
  const [safeZones, setSafeZones] = useState<SafeZone[]>([])
  const [location, setLocation] = useState<Location | null>(null)
  const [, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get the user's current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude: latitude.toString(), longitude: longitude.toString() })
        },
        (error) => {
          setError(error.message)
          setCurrentNews('Unable to retrieve location. Please enable location services.')
        }
      )
    } else {
      setError('Geolocation is not supported by this browser.')
      setCurrentNews('Geolocation is not supported by this browser.')
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (!location) return // Wait until location is available

      try {
        // Fetch safe zones based on the user's current location
        const safeZonesResponse = await fetch(
          `https://vortex-backend-de3g.onrender.com/safe-zones?lat=${location.latitude}&lon=${location.longitude}`
        )
        const safeZonesData: SafeZoneResponse[] = await safeZonesResponse.json()

        // Calculate distances and sort safe zones
        const safeZonesWithDistance = safeZonesData.map((zone: SafeZoneResponse) => ({
          name: zone.name || 'Unnamed Hospital',
          display_name: zone.display_name,
          distance: calculateDistance(
            parseFloat(location.latitude),
            parseFloat(location.longitude),
            parseFloat(zone.lat),
            parseFloat(zone.lon)
          )
        }))

        safeZonesWithDistance.sort((a: SafeZone, b: SafeZone) => a.distance - b.distance)
        setSafeZones(safeZonesWithDistance.slice(0, 3))

        // Set current news
        setCurrentNews(`Nearest hospital: ${safeZonesWithDistance[0].name} (${safeZonesWithDistance[0].distance.toFixed(2)} km away)`)
      } catch (error) {
        console.error('Error fetching data:', error)
        setCurrentNews('Unable to fetch safety information. Please check your connection.')
      }
    }

    fetchData()
    const timer = setInterval(fetchData, 60000) // Refresh every minute

    return () => clearInterval(timer)
  }, [location]) // Dependency on `location`

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  if (!currentNews) {
    return <div>Loading...</div>
  }

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
          <h3 className="font-bold text-lg mb-2">Safety Alert</h3>
          <p className="text-gray-800 mb-2">{currentNews}</p>
          <h4 className="font-semibold text-md mb-1">Nearby Safe Zones:</h4>
          <ul className="text-sm">
            {safeZones.map((zone, index) => (
              <li key={index} className="mb-1">
                {zone.name} - {zone.distance.toFixed(2)} km
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
