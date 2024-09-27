import { useState } from 'react'

export function SearchBar() {
  const [address, setAddress] = useState({
    area: '',
    city: '',
    state: '',
    pincode: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted address:', address)
    // Here you would typically send the address to your backend or perform a search
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Search Properties</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="area"
          placeholder="Area"
          value={address.area}
          onChange={handleChange}
          className="col-span-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button type="submit" className="w-full mt-6 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Search
      </button>
    </form>
  )
}
