"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CloudRainIcon, Cloud, LeafIcon, DropletIcon, Heart, Flame, Shield, Thermometer } from 'lucide-react'
import Image from 'next/image'

import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

// Dummy data for 7 days
// const weatherData = [
//     { city: "pune", temp: "73.3", humidity: "93.0", windspeed: "9.2", precip: "0.01", conditions: "Rain, Overcast", wind_direction: "239.6", cloud_cover: "100.0" },
//     { city: "pune", temp: "75.2", humidity: "88.5", windspeed: "8.7", precip: "0.00", conditions: "Partly Cloudy", wind_direction: "220.3", cloud_cover: "65.0" },
//     { city: "pune", temp: "78.1", humidity: "82.0", windspeed: "10.5", precip: "0.00", conditions: "Sunny", wind_direction: "200.1", cloud_cover: "10.0" },
//     { city: "pune", temp: "76.8", humidity: "85.5", windspeed: "7.8", precip: "0.02", conditions: "Light Rain", wind_direction: "180.7", cloud_cover: "80.0" },
//     { city: "pune", temp: "74.5", humidity: "90.0", windspeed: "6.5", precip: "0.05", conditions: "Rain", wind_direction: "210.5", cloud_cover: "95.0" },
//     { city: "pune", temp: "77.0", humidity: "86.5", windspeed: "8.0", precip: "0.00", conditions: "Cloudy", wind_direction: "195.2", cloud_cover: "75.0" },
//     { city: "pune", temp: "79.2", humidity: "80.0", windspeed: "11.2", precip: "0.00", conditions: "Clear", wind_direction: "225.8", cloud_cover: "5.0" },
// ]

const fields = [
    { key: 'temp', label: 'Temperature (°F)' },
    { key: 'humidity', label: 'Humidity (%)' },
    { key: 'windspeed', label: 'Wind Speed (mph)' },
    { key: 'precip', label: 'Precipitation (in)' },
    { key: 'cloud_cover', label: 'Cloud Cover (%)' },
]

const riskItems = [
    { name: 'Ambulance', icon: <Heart className="w-6 h-6" />, value: 102 , color: 'bg-blue-200' },
    { name: 'Fire', icon: <Flame className="w-6 h-6" />, value: 101, color: 'bg-red-200' },
    { name: 'Police', icon: <Shield className="w-6 h-6" />, value: 100, color: 'bg-yellow-200' },
]


// const cityData = {
//     "city": "pune",
//     "temp": "73.3",
//     "humidity": "93.0",
//     "windspeed": "9.2",
//     "precip": "0.01",
//     "conditions": "Rain, Overcast"
// }



const alertItems = [
    { name: 'TEMPRATURE', unit: '°F', icon: <Thermometer className="w-5 h-5" />,color: 'bg-red-200', jsonSearchQuery: 'temp', changeGraphTo: 'temp' },
    { name: 'HUMIDITY', unit: '%', icon: <DropletIcon className="w-5 h-5" />, color: 'bg-gray-200', jsonSearchQuery: 'humidity', changeGraphTo: 'humidity' },
    { name: 'WINDSPEED', unit: 'kmh', icon: <LeafIcon className="w-5 h-5" />, color: 'bg-green-200', jsonSearchQuery: 'windspeed' , changeGraphTo: 'wgust'},
    { name: 'PRECIPITATION', unit: 'mm', icon: <CloudRainIcon className="w-5 h-5" />, color: 'bg-blue-200', jsonSearchQuery: 'precip', changeGraphTo: 'precip' },
    { name: 'WEATHER', unit: '', icon: <Cloud className="w-5 h-5" />, color: 'bg-yellow-200', jsonSearchQuery: 'conditions', changeGraphTo: '' },
]








export default function DisasterDashboard() {

    const [selectedField, setSelectedField] = useState('temp')


    const [cityData, setCityData] = useState({
        city: "pune",
        temp: "73.3",
        humidity: "93.0",
        windspeed: "9.2",
        precip: "0.01",
        conditions: "Rain, Overcast"
    })

    const [weatherData, setWeatherData] = useState([])

    const chartData = {
        labels: weatherData.map((_, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: fields.find(field => field.key === selectedField)?.label || '',
                data: weatherData.map(day => parseFloat(day[selectedField])),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `7-Day ${fields.find(field => field.key === selectedField)?.label} Forecast for Pune`,
            },
        },
    }

    useEffect(() => {
        
        // fetch current weather
        fetch('https://vortex-backend-de3g.onrender.com/current-weather/?city=' + 'mumbai')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .then(data => {
            setCityData(data)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error)
        })



        // fetch weather forecast
        fetch('https://vortex-backend-de3g.onrender.com/weather/?city=' + 'mumbai')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .then(data => {
            setWeatherData(data)
            console.log(data)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error)
        })



        return () => {
            
        }
    }, [])

    return (
        <div className="h-100svh bg-gray-100 p-8 text-gray-900">


            <main className='grid grid-cols-1 sm:grid-cols-2 gap-8 w-full h-full'>

                <div className='w-full h-full flex flex-col flex-1'>

                    <motion.div
                        id='graph'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-lg shadow-lg p-6"
                    >
                        <div className="w-full h-full mx-auto bg-white ">
                            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Weather Forecast Graph</h2>
                            <div className="mb-4">

                            </div>
                            <div className=" p-4 rounded-lg">
                                <Line options={options} data={chartData} />
                            </div>

                        </div>
                    </motion.div>



                    


                    <motion.div
                        id='alerts'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-8 bg-white rounded-lg shadow-lg p-6 "
                    >
                        <h2 className="text-2xl font-bold mb">Weather Alerts</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer" >
                            {alertItems.map((item) => (
                                <motion.div 
                                    key={item.name} 
                                    className={`${item.color} rounded-lg p-4`} 
                                    onClick={() => setSelectedField(item.changeGraphTo)}
                                    whileHover={{scale: 1.05}}
                                >
                                    <div className="flex items-center justify-start gap-2">
                                        {item.icon}
                                        <span className="text-sm font-semibold">{item.name}</span>
                                    </div>
                                    <div className="text-xl font-bold">{cityData[item.jsonSearchQuery as keyof typeof cityData]} {item.unit}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>

                <div className='w-full h-full flex flex-col '>

                <motion.div
                        id='map'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-lg shadow-lg p-6 h-[60%]"
                    >
                        <h2 className="text-2xl font-bold mb-4">Map</h2>
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                            <Image
                                src="/placeholder.svg"
                                alt="Map"
                                className="object-cover rounded-lg"
                            />
                            
                        </div>
                        <p className="text-gray-600">
                            Deornre nne seealaea inva slios Aized ds inuistefox, etam elebe bw
                            nseting avonrinues, allesiniers nuntrons, fitche slein bvare
                        </p>
                    </motion.div>
                    
                    <motion.div
                        id='conacts'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-8 bg-white rounded-lg shadow-lg p-6 flex-1"
                    >
                        <h2 className="text-2xl font-bold mb-4">Contacts</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {riskItems.map((item) => (
                                <div key={item.name} className={`${item.color} rounded-lg p-4`} >
                                    <div className="flex items-center justify-start gap-2 ">
                                        {item.icon}
                                        <span className="text-sm font-semibold">{item.name}</span>
                                    </div>
                                    <div className="text-xl font-bold">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>





            </main>
        </div>
    )
}