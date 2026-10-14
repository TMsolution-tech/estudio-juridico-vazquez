import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { notifyConsulta } from '@/lib/mail'

const schema = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  telefono: z.string().trim().max(40).optional().nullable(),
  asunto: z.string().trim().max(120).optional().nullable(),
  mensaje: z.string().trim().min(5).max(4000),
})

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('consultas').insert({
    nombre: parsed.data.nombre,
    email: parsed.data.email,
    telefono: parsed.data.telefono || null,
    asunto: parsed.data.asunto || null,
    mensaje: parsed.data.mensaje,
  })
  if (error) {
    console.error('consultas insert:', error)
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
  }

  try {
    await notifyConsulta(parsed.data)
  } catch (e) {
    console.error('notifyConsulta:', e) // la consulta ya quedó guardada
  }

  return NextResponse.json({ ok: true })
}
