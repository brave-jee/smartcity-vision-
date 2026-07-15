export type AuthUser = {
  id: string
  username: string
  displayName: string
  role: 'admin' | 'operator'
}

export type LoginPayload = {
  username: string
  password: string
}

export type LoginResult = {
  token: string
  user: AuthUser
}
