import { CanvasTexture, NearestFilter, RepeatWrapping, SRGBColorSpace, type Texture } from 'three'

const FACADE_ACCENTS = ['#5ec4b6', '#7eb8d6', '#d4b483', '#6aa8c8']

/**
 * 生成夜景立面窗格纹理（亮窗/暗窗交错）。
 * 使用 Canvas 程序化贴图，无需外网资源。
 */
function paintFacade(seed: number, accent: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  ctx.fillStyle = '#101820'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const cols = 8
  const rows = 18
  const cellW = canvas.width / cols
  const cellH = canvas.height / rows
  let state = seed

  const next = () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const lit = next() > 0.38
      const warm = next() > 0.55
      ctx.fillStyle = lit ? (warm ? '#e8c57a' : accent) : '#1a2a38'
      const padX = 2
      const padY = 2
      ctx.fillRect(col * cellW + padX, row * cellH + padY, cellW - padX * 2, cellH - padY * 2)
    }
  }

  ctx.fillStyle = '#0c141c'
  ctx.fillRect(0, 0, canvas.width, 10)

  return canvas
}

let cachedFacades: Texture[] | null = null

/** 获取可复用的一组立面纹理 */
export function getFacadeTextures(): Texture[] {
  if (cachedFacades) return cachedFacades

  cachedFacades = FACADE_ACCENTS.map((accent, index) => {
    const canvas = paintFacade(1000 + index * 97, accent)
    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.magFilter = NearestFilter
    texture.minFilter = NearestFilter
    texture.needsUpdate = true
    return texture
  })

  return cachedFacades
}
