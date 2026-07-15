/** Demo account for local mock login (replace with real backend later). */
export const DEMO_ACCOUNT = {
  username: 'admin',
  password: 'admin123',
  user: {
    id: 'u-001',
    username: 'admin',
    displayName: '城市指挥员',
    role: 'admin' as const,
  },
}

export const AUTH_STORAGE_KEY = 'smartcity-auth'
