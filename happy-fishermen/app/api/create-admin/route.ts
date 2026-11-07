import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST() {
    try {
        const username = "Kevin"
        const plainPassword = "password123"
        
        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { username }
        })

        if (existingUser) {
             return NextResponse.json({ message: "El usuario ya existe." }, { status: 200 })
        }

        const passwordHash = await bcrypt.hash(plainPassword, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                passwordHash,
                role: "ADMIN" 
            }
        })
        
        return NextResponse.json({ message: "Usuario creado.", user: { id: newUser.id, username: newUser.username } }, { status: 201 })

    } catch (error: any) {
        console.error("Error creando admin:", error)
        return NextResponse.json({ error: "Error interno del servidor", details: error.message }, { status: 500 })
    }
}
