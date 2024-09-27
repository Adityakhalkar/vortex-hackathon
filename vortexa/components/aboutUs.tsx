import { Shield, Users, BarChart } from 'lucide-react'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-8">About Crisis Connect</h1>
        
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Crisis Connect, we are committed to safeguarding communities through advanced AI-driven disaster prediction and prevention systems. Our platform leverages cutting-edge satellite imagery and environmental data to provide authorities and individuals with accurate, real-time insights into disaster-prone areas.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            By forecasting risks such as floods, wildfires, and earthquakes, we aim to help mitigate the devastating impacts of natural disasters before they strike.
          </p>
        </div>

        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Our Mission</h2>
        <div className="bg-blue-700 text-white rounded-lg shadow-xl p-8 mb-12">
          <p className="text-xl leading-relaxed">
            Our mission is simple: protect lives, reduce damage, and empower communities with the tools they need for effective disaster management. Whether it&apos;s guiding evacuation planning, optimizing resource allocation, or educating the public on preventive measures, we are dedicated to making the world safer, one prediction at a time.
          </p>
        </div>

        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Shield className="w-12 h-12 text-blue-500" />, title: "Disaster Prevention", description: "We provide actionable insights to help prevent and mitigate the impact of natural disasters." },
            { icon: <Users className="w-12 h-12 text-blue-500" />, title: "Community Empowerment", description: "We educate and empower communities with the knowledge to prepare for potential disasters." },
            { icon: <BarChart className="w-12 h-12 text-blue-500" />, title: "Resource Optimization", description: "We help authorities optimize resource allocation for effective disaster management." },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              {item.icon}
              <h3 className="text-xl font-semibold text-blue-700 mt-4 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}