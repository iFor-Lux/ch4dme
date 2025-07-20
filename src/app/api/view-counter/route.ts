import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const COUNTER_FILE = path.join(process.cwd(), 'view_count.txt')

export async function GET() {
  try {
    // Verificar si el archivo existe
    try {
      await fs.access(COUNTER_FILE)
    } catch {
      // Si no existe, crearlo con valor 0
      await fs.writeFile(COUNTER_FILE, '0')
    }
    
    // Leer el contador actual
    const currentCount = await fs.readFile(COUNTER_FILE, 'utf-8')
    const count = parseInt(currentCount.trim()) || 0
    
    // Incrementar el contador
    const newCount = count + 1
    
    // Guardar el nuevo valor
    await fs.writeFile(COUNTER_FILE, newCount.toString())
    
    return NextResponse.json({ count: newCount })
  } catch (error) {
    console.error('Error updating view counter:', error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}