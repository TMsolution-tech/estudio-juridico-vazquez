import nodemailer from 'nodemailer'

// Aviso por mail al estudio cuando llega una consulta.
// Usa SMTP de Gmail con contraseña de aplicación (igual que Don Valdez).
// Si falta config, no rompe: la consulta ya quedó guardada en la DB.
export async function notifyConsulta(consulta: {
  nombre: string
  email: string
  telefono?: string | null
  asunto?: string | null
  mensaje: string
}) {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  const to = process.env.NOTIFY_EMAIL
  if (!user || !pass || !to) return

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `"Web Vázquez Estudio Penal" <${user}>`,
    to,
    replyTo: consulta.email,
    subject: `Nueva consulta web — ${consulta.asunto || 'Consulta general'}`,
    text: [
      `Nombre: ${consulta.nombre}`,
      `Email: ${consulta.email}`,
      `Teléfono: ${consulta.telefono || '—'}`,
      `Asunto: ${consulta.asunto || 'Consulta general'}`,
      '',
      consulta.mensaje,
    ].join('\n'),
  })
}
