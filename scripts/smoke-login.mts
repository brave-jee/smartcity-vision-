/** Standalone smoke test — relative imports only (no Vite alias). */
import { DEMO_ACCOUNT } from '../src/features/auth/constants.ts'

function encodeBase64Url(value: string) {
  const base64 = Buffer.from(value, 'utf8').toString('base64')
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

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

async function loginApi(payload: { username: string; password: string }) {
  await new Promise((r) => setTimeout(r, 50))
  const username = payload.username.trim()
  const password = payload.password
  if (username === DEMO_ACCOUNT.username && password === DEMO_ACCOUNT.password) {
    return { token: createMockJwt(username), user: DEMO_ACCOUNT.user }
  }
  throw new Error('账号或密码错误')
}

async function main() {
  const ok = await loginApi({ username: 'admin', password: 'admin123' })
  if (ok.token.split('.').length !== 3) throw new Error('token shape invalid')
  if (ok.user.username !== 'admin') throw new Error('user invalid')
  console.log('PASS login success')

  try {
    await loginApi({ username: 'admin', password: 'wrong' })
    throw new Error('should have failed')
  } catch (e) {
    if (!(e instanceof Error) || e.message !== '账号或密码错误') throw e
    console.log('PASS login reject wrong password')
  }
}

main().catch((e) => {
  console.error('FAIL', e)
  process.exit(1)
})
