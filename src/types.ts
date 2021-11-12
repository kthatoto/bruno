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
  gender: number
}
export interface Membership {
  playerId: string
  teamId: string
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
  name: string
}
export interface Game {
  id: string
  leagueId: string
  teamIds: string
  status: "not_started" | "going" | "finished"
  order: number
  result: any
}
export interface Goal {
  id: string
  gameId: string
  teamId: string
  playerId: string
}
