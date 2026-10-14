'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { NOVEDAD_CATEGORIAS, type Novedad } from '@/lib/types'

const inputCls =
  'w-full border border-linea bg-papel px-3.5 py-2.5 text-sm text-tinta outline-none transition focus:border-oxblood'
const labelCls =
  'text-[0.62rem] font-bold uppercase tracking-[0.14em] text-tinta-soft'

const BUCKET = 'novedades'

// El client se crea lazy: en SSR/prerender no hay env ni browser.
function sb() {
  return createClient()
}

export function AdminNovedades() {
  const [items, setItems] = useState<Novedad[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const load = useCallback(async () => {
    const { data } = await sb()
      .from('novedades')
      .select('*')
      .order('created_at', { ascending: false })
    setItems((data ?? []) as Novedad[])
    setLoading(false)
  }, [])

  useEffect(() => {
    Promise.resolve().then(load)
  }, [load])

  function onFile(f: File | undefined) {
    if (!f) return
    if (f.size > 2 * 1024 * 1024) {
      showToast('La imagen supera los 2 MB')
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function uploadImage(): Promise<string | null> {
    if (!file) return null
    const ext = file.name.split('.').pop() || 'jpg'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await sb().storage.from(BUCKET).upload(path, file)
    if (error) {
      showToast('Error al subir la imagen')
      return null
    }
    const { data } = sb().storage.from(BUCKET).getPublicUrl(path)
    return data.publicUrl
  }

  async function publicar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const titulo = String(fd.get('titulo')).trim()
    const texto = String(fd.get('texto')).trim()
    if (!titulo || !texto) {
      showToast('Completá título y contenido')
      return
    }
    setSaving(true)
    const imagen_url = await uploadImage()
    const { error } = await sb().from('novedades').insert({
      titulo,
      texto,
      categoria: String(fd.get('categoria')),
      imagen_url,
    })
    setSaving(false)
    if (error) {
      showToast('Error al publicar')
      return
    }
    formRef.current?.reset()
    setFile(null)
    setPreview(null)
    showToast('Novedad publicada en el sitio')
    load()
  }

  async function togglePublicada(n: Novedad) {
    await sb()
      .from('novedades')
      .update({ is_published: !n.is_published })
      .eq('id', n.id)
    load()
  }

  async function eliminar(id: string) {
    await sb().from('novedades').delete().eq('id', id)
    showToast('Novedad eliminada')
    load()
  }

  return (
    <div>
      {/* Formulario */}
      <form
        ref={formRef}
        onSubmit={publicar}
        className="mb-10 border border-linea bg-papel p-6 sm:p-8"
      >
        <h2 className="font-display mb-6 border-b border-linea pb-4 text-lg font-bold text-tinta">
          + Nueva novedad
        </h2>
        <div className="mb-4 grid gap-4 sm:grid-cols-[1fr_180px]">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Título *</label>
            <input name="titulo" required className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Categoría</label>
            <select name="categoria" className={inputCls}>
              {NOVEDAD_CATEGORIAS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-1.5">
          <label className={labelCls}>Contenido *</label>
          <textarea name="texto" required rows={4} className={`${inputCls} resize-y`} />
        </div>
        <div className="mb-6 flex flex-col gap-1.5">
          <label className={labelCls}>Imagen (opcional)</label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              onFile(e.dataTransfer.files[0])
            }}
            onClick={() => fileRef.current?.click()}
            className="cursor-pointer border-2 border-dashed border-linea bg-marfil px-6 py-7 text-center transition hover:border-oxblood"
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
            <p className="text-sm text-tinta-soft">
              Arrastrá una imagen o{' '}
              <span className="font-semibold text-oxblood">
                hacé clic para seleccionar
              </span>
              <br />
              <span className="text-xs">JPG, PNG, WEBP — máx. 2 MB</span>
            </p>
          </div>
          {preview && (
            <div className="relative mt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 w-full border border-linea object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setFile(null)
                  setPreview(null)
                  if (fileRef.current) fileRef.current.value = ''
                }}
                className="absolute right-2 top-2 bg-black/60 px-2.5 py-1 text-[0.65rem] font-bold text-white hover:bg-oxblood"
              >
                ✕ Quitar
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-oxblood px-7 py-3 text-xs font-bold uppercase tracking-widest text-crema transition hover:bg-vino disabled:opacity-50"
        >
          {saving ? 'Publicando…' : 'Publicar en el sitio'}
        </button>
      </form>

      {/* Lista */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-tinta">Publicadas</h2>
        <span className="bg-oxblood px-2.5 py-0.5 text-[0.65rem] font-bold text-crema">
          {items.length}
        </span>
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-tinta-soft">Cargando…</p>
      ) : items.length === 0 ? (
        <p className="border border-dashed border-linea py-14 text-center text-sm text-tinta-soft">
          No hay novedades publicadas todavía.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((n) => (
            <article key={n.id} className="border border-linea bg-papel">
              {n.imagen_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={n.imagen_url}
                  alt={n.titulo}
                  className="max-h-44 w-full object-cover"
                />
              )}
              <div className="flex items-start gap-4 p-5">
                <div className="flex-1">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-oxblood">
                    {n.categoria}
                    {!n.is_published && (
                      <span className="ml-2 text-tinta-soft">· oculta</span>
                    )}
                  </p>
                  <h3 className="font-display mt-1 text-base font-bold text-tinta">
                    {n.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-tinta-soft">
                    {n.texto}
                  </p>
                  <p className="mt-2 text-[0.68rem] text-tinta-soft/70">
                    {new Date(n.created_at).toLocaleDateString('es-AR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <button
                    onClick={() => togglePublicada(n)}
                    className="border border-linea px-3 py-1.5 text-[0.68rem] font-bold text-tinta-soft transition hover:border-oxblood hover:text-oxblood"
                  >
                    {n.is_published ? 'Ocultar' : 'Publicar'}
                  </button>
                  <button
                    onClick={() => eliminar(n.id)}
                    className="border border-linea px-3 py-1.5 text-[0.68rem] font-bold text-tinta-soft transition hover:border-red-700 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-7 right-7 z-50 bg-noche px-5 py-3 text-sm font-semibold text-crema shadow-xl">
          {toast}
        </div>
      )}
    </div>
  )
}
