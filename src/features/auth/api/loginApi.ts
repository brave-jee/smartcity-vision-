import { DEMO_ACCOUNT } from '@/features/auth/constants'
import type { LoginPayload, LoginResult } from '@/features/auth/types'

/** UTF-8 safe Base64URL — plain btoa() breaks on Chinese display names. */
function encodeBase64Url(value: string) {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

/** Mock JWT for front-end demos — not cryptographically signed. */
function createMockJwt(username: string) {
  const header = encodeBase64Url(JSON.stringify({ alg: 'none', typ: 'JWT' }))
  const payload = encodeBase64Url(
    JSON.stringify({
      sub: username,
      name: DEMO_ACCOUNT.user.displayName,
      role: DEMO_ACCOUNT.user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
    }),
  )
  return `${header}.${payload}.mock-signature`
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function loginApi(payload: LoginPayload): Promise<LoginResult> {
  await delay(600)

  const username = payload.username.trim()
  const password = payload.password

  if (username === DEMO_ACCOUNT.username && password === DEMO_ACCOUNT.password) {
    return {
      token: createMockJwt(username),
      user: DEMO_ACCOUNT.user,
    }
  }

  throw new Error('账号或密码错误')
}
