'use client'
import { useState } from 'react'

export default function CreateUser() {
    const [status, setStatus] = useState("")
    
    const handleCreateAdmin = async () => {
        setStatus("Creando...")
        try {
            const res = await fetch('/api/create-admin', { method: 'POST' })
            const data = await res.json()
            if (res.ok) {
                setStatus("¡Usuario Admin creado con éxito!")
            } else {
                setStatus(`Error: ${data.error}`)
            }
        } catch (e) {
            setStatus("Error de conexión.")
        }
    }

    return (
        <div className="p-4 border rounded-md mt-4 text-center bg-white shadow-sm max-w-sm mx-auto">
            <h4 className="font-bold mb-2 text-gray-800">Crear usuario administrador de prueba</h4>
            <p className="text-xs text-gray-500 mb-4">Username: <strong>Kevin</strong> | Password: <strong>password123</strong></p>
            <button 
                onClick={handleCreateAdmin}
                className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
                Crear Admin "Kevin"
            </button>
            {status && <p className="mt-2 text-sm font-semibold text-green-600">{status}</p>}
        </div>
    )
}
