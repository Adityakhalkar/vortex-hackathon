'use client'

import { useState } from 'react'
import { AlertTriangle, Wind, Droplet, Mountain } from 'lucide-react'

const disasterTypes = [
  {
    name: 'Earthquakes',
    icon: <AlertTriangle className="w-6 h-6" />,
    description: 'An earthquake is a sudden shaking of the ground caused by movements deep within the Earth. It happens when the Earth\'s plates, which are like huge puzzle pieces, shift and move against each other. This energy causes the ground to shake, sometimes gently and other times violently.',
    safety: [
      'Drop, Cover, and Hold On: Get under sturdy furniture',
      'Stay Indoors: If you\'re inside, stay there. Move away from windows, outside walls, and anything that could fall, like shelves or light fixtures.',
      'Move to Open Space if Outside: If you\'re outdoors, move to a clear area away from buildings, trees, streetlights, and power lines.',
      'Stay Away from Elevators: Always use stairs if you need to evacuate a building after the shaking stops—elevators can become dangerous.',
      'Be Prepared for Aftershocks: After the main quake, smaller aftershocks may follow. Be ready to drop, cover, and hold on again if necessary.'
    ]
  },
  {
    name: 'Cyclones',
    icon: <Wind className="w-6 h-6" />,
    description: 'A cyclone is a powerful storm system characterized by strong winds, heavy rainfall, and storm surges. Cyclones form over warm ocean waters and can cause significant damage when they reach land, bringing severe flooding, storm surges, and high-speed winds.',
    safety: [
      'Evacuate if Instructed: Follow evacuation orders from local authorities immediately. Move to higher ground or inland.',
      'Secure Your Home: Board up windows and doors if you cannot evacuate, stay indoors and move to a windowless interior room. Protect yourself from flying debris by seeking shelter under a sturdy furniture or closet.',
      'Turn Off Utilities: If there\'s time, switch off gas, electricity, and water to prevent accidents caused by damaged infrastructure.',
      'Avoid Low-Lying Areas: Move away from coastal areas or riverbanks, as storm surges can cause flooding.',
      'Stay Informed: Keep a battery-powered or hand-crank radio nearby for updates and warnings.'
    ]
  },
  {
    name: 'Floods',
    icon: <Droplet className="w-6 h-6" />,
    description: 'A flood occurs when an area of land that is usually dry land, typically caused by heavy rainfall, overflowing rivers, broken dams, or rapid melting of snow. Floods can happen suddenly, called flash floods, or gradually over time.',
    safety: [
      'Move to Higher Ground: As soon as you become aware of a potential flood, move to higher ground immediately, especially if you\'re in a low-lying area.',
      'Avoid Walking or Driving in Flood Waters: It takes just six inches of moving water to knock you down, and one foot of water can sweep many cars away.',
      'Prepare an Emergency Kit: Keep supplies at the ready, including food, water, first aid supplies, and important documents.',
      'Follow Evacuation Orders: If authorities advise evacuation, do so immediately. Don\'t wait until it\'s too late.',
      'Turn Off Utilities: If instructed, turn off gas, electricity, and water to avoid hazards, but only if you can do so safely.'
    ]
  },
  {
    name: 'Landslides',
    icon: <Mountain className="w-6 h-6" />,
    description: 'Landslides occur when rock, soil, or debris moves down a slope due to gravity. Landslides are often triggered by factors such as heavy rainfall, earthquakes, volcanic eruptions, or changes in groundwater.',
    safety: [
      'Move to Higher Ground: If you live in a landslide-prone area, relocate to higher ground immediately if there are warning signs such as unusual cracks, bulging ground, or tilting trees.',
      'Stay Alert During Heavy Rain: Monitor weather reports, especially during heavy rainfall, which can increase the risk of landslides. Be ready to evacuate if necessary.',
      'Listen for Unusual Sounds: Listen for unusual sounds like rumbling or cracking, which may indicate an imminent landslide. If you hear these, evacuate immediately.',
      'Avoid River Valleys: Landslides can block rivers and cause sudden flooding. Stay away from riverbeds and low-lying areas if a landslide is likely.',
      'Stay Away from the Path of the Slide: If a landslide occurs, try to move away from its path and to the nearest stable, high ground.'
    ]
  },
  {
    name: 'Wildfires',
    icon: <AlertTriangle className="w-6 h-6" />,
    description: 'Wildfires are uncontrolled fires that burn in forests, grasslands, or other areas of vegetation. They can spread rapidly and are often caused by human activities or natural events such as lightning.',
    safety: [
      'Evacuate Early: If you receive evacuation orders, leave the area immediately. Do not wait for the last minute.',
      'Create a Fire-Resistant Zone: Clear flammable vegetation and debris around your home, and maintain a defensible space of at least 30 feet.',
      'Stay Indoors: If there is smoke or ash in your area, stay indoors and keep windows and doors closed to avoid inhaling harmful particles.',
      'Keep Emergency Supplies Ready: Prepare an emergency kit with essentials like water, food, medications, and important documents.',
      'Monitor Weather and Alerts: Stay informed about fire conditions in your area through local news and emergency services.'
    ]
  }
]

export default function DisasterInfo() {
  const [selectedTab, setSelectedTab] = useState('Earthquakes')

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Natural Disasters</h1>
      
      {/* Tabs */}
      <div className="flex flex-wrap justify-center space-x-2 space-y-2 mb-8">
        {disasterTypes.map((disaster) => (
          <button
            key={disaster.name}
            onClick={() => setSelectedTab(disaster.name)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${
              selectedTab === disaster.name
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {disaster.icon}
            <span>{disaster.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {disasterTypes.map((disaster) => (
        selectedTab === disaster.name && (
          <div key={disaster.name} className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              {disaster.icon}
              <span className="ml-2">{disaster.name}</span>
            </h2>
            <p className="mb-6 text-gray-600">{disaster.description}</p>

            <h3 className="text-xl font-semibold mb-4 text-gray-700">Safety Tips</h3>
            <ul className="space-y-3">
              {disaster.safety.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-6 h-6 mr-2 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  )
}