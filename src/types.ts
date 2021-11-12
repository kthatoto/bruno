export interface AuthUser {
  uid: string
  displayName: string | null
  photoURL: string | null
}
export interface Event {
  id: string
  name: string
}
export interface Player {
  id: string
  name: string
  photoURL: string
}
export interface League {
  id: string
  name: string
  eventId: string
  order: number
}
export interface Team {
  id: string
  leagueId: string
  slug: string
  name: string
}
