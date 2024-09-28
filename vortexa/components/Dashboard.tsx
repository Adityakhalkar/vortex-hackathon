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

const fields = [
    { key: 'temp', label: 'Temperature (°F)' },
    { key: 'humidity', label: 'Humidity (%)' },
    { key: 'windspeed', label: 'Wind Speed (mph)' },
    { key: 'precip', label: 'Precipitation (in)' },
    { key: 'cloud_cover', label: 'Cloud Cover (%)' },
]

const riskItems = [
    { name: 'Ambulance', icon: <Heart className="w-6 h-6" />, value: 102, color: 'bg-blue-200' },
    { name: 'Fire', icon: <Flame className="w-6 h-6" />, value: 101, color: 'bg-red-200' },
    { name: 'Police', icon: <Shield className="w-6 h-6" />, value: 100, color: 'bg-yellow-200' },
]

const alertItems = [
    { name: 'TEMPRATURE', unit: '°F', icon: <Thermometer className="w-5 h-5" />, color: 'bg-red-200', jsonSearchQuery: 'temp', changeGraphTo: 'temp', interactive: true },
    { name: 'HUMIDITY', unit: '%', icon: <DropletIcon className="w-5 h-5" />, color: 'bg-gray-200', jsonSearchQuery: 'humidity', changeGraphTo: 'humidity', interactive: true },
    { name: 'WINDSPEED', unit: 'kmh', icon: <LeafIcon className="w-5 h-5" />, color: 'bg-green-200', jsonSearchQuery: 'windspeed', changeGraphTo: 'wgust', interactive: true },
    { name: 'PRECIPITATION', unit: 'mm', icon: <CloudRainIcon className="w-5 h-5" />, color: 'bg-blue-200', jsonSearchQuery: 'precip', changeGraphTo: 'precip', interactive: true },
    { name: 'WEATHER', unit: '', icon: <Cloud className="w-5 h-5" />, color: 'bg-yellow-200', jsonSearchQuery: 'conditions', changeGraphTo: '', interactive: false },
]

export default function DisasterDashboard() {
    const [selectedField, setSelectedField] = useState('temp')
    const [selectedCity, setSelectedCity] = useState('mumbai') // Default city
    const [cityData, setCityData] = useState({
        city: "mumbai",
        temp: "73.3",
        humidity: "93.0",
        windspeed: "9.2",
        precip: "0.01",
        conditions: "Rain, Overcast"
    })
    const [weatherData, setWeatherData] = useState([])

    const [safePlaces, setSafePlaces] = useState<{ name: string, display_name: string, osm_id: string }[]>([])

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
                text: `7-Day ${fields.find(field => field.key === selectedField)?.label} Forecast for ${selectedCity}`,
            },
        },
    }

    useEffect(() => {
        // Fetch current weather and forecast whenever selectedCity changes
        const fetchWeatherData = async () => {
            try {
                // Fetch current weather
                const currentWeatherResponse = await fetch(`https://vortex-backend-de3g.onrender.com/current-weather/?city=${selectedCity}`);
                if (!currentWeatherResponse.ok) throw new Error('Network response was not ok');
                const currentWeatherData = await currentWeatherResponse.json();
                setCityData(currentWeatherData);

                // Fetch weather forecast
                const weatherForecastResponse = await fetch(`https://vortex-backend-de3g.onrender.com/weather/?city=${selectedCity}`);
                if (!weatherForecastResponse.ok) throw new Error('Network response was not ok');
                const weatherForecastData = await weatherForecastResponse.json();
                setWeatherData(weatherForecastData);



                // fetch safe places in city
                // const coordinatesPlacesResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityData.city}&limit=50&appid=1779406e9f90ca7ca89c61efaf59681d`)
                // const coordinatesData = await coordinatesPlacesResponse.json()
                // const lat = coordinatesData[0].lat
                // const lon = coordinatesData[0].lon

                const safePlacesResponse = await fetch(`https://vortex-backend-de3g.onrender.com/safe-zones/?lat=18.6214797&lon=73.8208455`)
                const safePlacesData = await safePlacesResponse.json()

                // console.log(safePlacesData)
                setSafePlaces(safePlacesData)


            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchWeatherData();
    }, [selectedCity]);

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
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Weather Forecast Graph for {selectedCity}</h2>
                        <div className="mb-4">
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="border border-gray-300 rounded p-2"
                            >
                                {/* Add your list of cities here */}
                                <option value="mumbai">Mumbai</option>
                                <option value="pune">Pune</option>
                                <option value="delhi">Delhi</option>
                                <option value="bangalore">Bangalore</option>
                                <option value="chennai">Chennai</option>
                                <option value="kolkata">Kolkata</option>
                                <option value="hyderabad">Hyderabad</option>
                                {/* Add more cities as needed */}
                            </select>
                        </div>
                        <div className="p-4 rounded-lg">
                            <Line options={options} data={chartData} />
                        </div>
                    </motion.div>

                    <motion.div
                        id='alerts'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-8 bg-white rounded-lg shadow-lg p-6 "
                    >
                        <h2 className="text-2xl font-bold mb-4">Weather Alerts</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer" >
                            {alertItems.map((item) => (
                                <motion.div
                                    key={item.name}
                                    className={`${item.color} rounded-lg p-4`}
                                    onClick={() => {
                                        if (item.interactive)
                                            setSelectedField(item.changeGraphTo)
                                    }}
                                    whileHover={{ scale: item.interactive ? 1.05 : 1 }}
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
                        className="bg-white rounded-lg shadow-lg p-6 "
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center">Map of India with Clouds</h2>
                        <div className="w-full  flex-1">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/2021_CIMSS_03B_Gulab_visible_infrared_satellite_loop.gif?20210926220544"
                                alt="Cloud Coverage Map of India"
                                className="object-fill rounded-lg m-auto"
                                width={600}
                                height={450}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        id='contacts'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-8 bg-white rounded-lg shadow-lg p-6 h-full"
                    >
                        <h2 className="text-2xl font-bold mb-4">Emergency Contacts</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {riskItems.map((item) => (
                                <div key={item.name} className={`${item.color} rounded-lg p-4`}>
                                    <div className="flex items-center justify-start gap-2">
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

            <motion.div
                id='safe-zones'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8  rounded-lg shadow-lg p-6 w-full "
            >
                <h2 className="text-2xl font-bold mb-4">Safe places</h2>

                <div className=' flex flex-wrap w-full justify-center gap-8'>
                   {
  safePlaces.map((item, index) => {
    return (
      <div key={item.osm_id || index} className='flex flex-col bg-white rounded-md w-[400px] p-[10px]'>
        <h2 className='mb-2 text-[20px] font-bold'>{item.name}</h2>
        <p className='max-h-[200px]'>{item.display_name}</p>
        <p className='mt-4 overflow-scroll'>{item.osm_id}</p>
      </div>
    );
  })
}

                </div>


            </motion.div>


        </div>
    )
}