export interface Credentials {
  credentials: {
    loggedIn: boolean
    userId: number | null
  }
  setCredentials: (
    value: { loggedIn: boolean; userId: number | null } | null,
  ) => void
}
