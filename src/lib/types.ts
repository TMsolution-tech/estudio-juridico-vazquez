export type Novedad = {
  id: string
  titulo: string
  texto: string
  categoria: string
  imagen_url: string | null
  is_published: boolean
  created_at: string
}

export type Consulta = {
  id: string
  nombre: string
  email: string
  telefono: string | null
  asunto: string | null
  mensaje: string
  leida: boolean
  created_at: string
}

export const NOVEDAD_CATEGORIAS = [
  'Aviso',
  'Novedad',
  'Importante',
  'Feriado',
  'Otro',
] as const

export const CONSULTA_ASUNTOS = [
  'Defensa penal',
  'Delitos complejos',
  'Asesoría preventiva',
  'Otro',
] as const
