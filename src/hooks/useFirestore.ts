import {
  InjectionKey,
  inject,
  provide,
  reactive,
  computed,
  toRefs,
} from '@vue/composition-api'

import { Event, League, Team, Player, Game, GameStatus } from '@/types'

const getDataByID = async (fs: any, collectionName: string, id: string) => {
  const docRef: any = fs.collection(collectionName).doc(id)
  const docSnapshot: any = await docRef.get()
  return {
    id: docSnapshot.id,
    ...docSnapshot.data()
  }
}
const getDataArrayBySnapshot = (snapshot: any) => {
  return snapshot.docs.map((docSnapshot: any) => {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    }
  })
}

const firestore = (context: any) => {
  const fs: any = context.root.$fire.firestore
  const fetched = reactive<{
    currentPlayer: boolean
    event: boolean
    leagues: boolean
    teams: boolean
  }>({
    currentPlayer: false,
    event: false,
    leagues: false,
    teams: false
  })
  const state = reactive<{
    currentPlayer?: Player
    eventId?: string
    event?: Event
    leagues: League[]
    teams: Team[]
    games: Game[]
  }>({
    currentPlayer: undefined,
    eventId: context.root.$route.params.eventId,
    event: undefined,
    leagues: [],
    teams: [],
    games: []
  })

  const findPlayer = async (uid: string) => await getDataByID(fs, 'players', uid)

  const fetchCurrentPlayer = async () => {
    if (fetched.currentPlayer) return
    const currentUser = context.root.$fire.auth.currentUser
    if (!currentUser) return
    const player = await getDataByID(fs, 'players', currentUser.uid)
    if (player.name) state.currentPlayer = player
    if (state.currentPlayer) fetched.currentPlayer = true
  }
  const fetchEvent = async () => {
    if (fetched.event) return
    if (!state.eventId) return
    state.event = await getDataByID(fs, 'events', state.eventId)
    fetched.event = true
  }
  const fetchLeagues = async () => {
    if (fetched.leagues) return
    const snapshot = await fs.collection('leagues').where('eventId', '==', state.eventId).get()
    state.leagues = getDataArrayBySnapshot(snapshot)
    fetched.leagues = true
  }
  const fetchTeams = async () => {
    if (fetched.teams) return
    if (!fetched.leagues) await fetchLeagues()
    const snapshot = await fs.collection('teams').where('leagueId', 'in', state.leagues.map((l: League) => l.id)).get()
    state.teams = getDataArrayBySnapshot(snapshot)
    fetched.teams = true
  }
  const fetchGames = async () => {
    if (!fetched.leagues) await fetchLeagues()
    const snapshot = await fs.collection('games').where('leagueId', 'in', state.leagues.map((l: League) => l.id)).get()
    state.games = getDataArrayBySnapshot(snapshot)
  }

  const firstLeague = computed<League | undefined>(() => {
    if (!fetched.leagues) return
    return state.leagues.find((league: League) => league.order === 1)
  })
  const firstLeagueTeams = computed<Team[] | undefined>(() => {
    if (!fetched.teams || !fetched.leagues) return
    return state.teams.filter((team: Team) => team.leagueId === firstLeague.value!.id)
  })
  const onGoingGameInfo = computed(() => {
    // if (state.games.length === 0) return
    // const game = state.games.find((g: Game) => g.status === 'going')
    // if (!game) return
    return {
      left: {
        teamName: "Albatross",
        players: [
          { id: 'ppB7PrJa2dRIxSks2pK0ryc6KH42', name: "あああああああ", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" },
          { name: "いいいいいいい", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" },
          { name: "ううううううう", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" },
          { name: "えええええええ", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" },
          { name: "おおおおおおお", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" },
          { name: "かかかかかかか", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" }
        ]
      },
      right: {
        teamName: "Buffalo",
        players: [
          { name: "あああああああ", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" },
          { name: "いいいいいいい", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" },
          { name: "ううううううう", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" },
          { name: "えええええええ", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" },
          { name: "おおおおおおお", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" },
          { name: "かかかかかかか", photoURL: "https://pics.prcm.jp/b61765cc61ae6/77484629/jpeg/77484629.jpeg" }
        ]
      }
    }
  })

  const createPlayer = async (params: any, teamId: string) => {
    const playerRef = fs.collection('players').doc(params.id)
    await playerRef.set({
      ...params,
      niceCount: 0
    })
    fs.collection('memberships').add({
      playerId: params.id,
      teamId
    })
  }
  const postNice = async (playerId: string) => {
    const playerRef = fs.collection('players').doc(playerId)
    await playerRef.update(
      'niceCount',
      context.root.$fireModule.firestore.FieldValue.increment(1)
    )
    const now = new Date()
    localStorage.setItem('lastNicedAt', now.getTime())
  }

  const updateGameStatus = async (gameId: string, status: GameStatus) => {
    const gameRef = fs.collection('games').doc(gameId)
    await gameRef.update({ status })
  }

  return {
    ...toRefs(state),
    findPlayer,
    fetchCurrentPlayer,
    fetchEvent,
    fetchTeams,
    fetchGames,

    firstLeague,
    firstLeagueTeams,
    onGoingGameInfo,

    createPlayer,
    postNice,
    updateGameStatus
  }
}

export const provideFirestore = (context: any) => {
  const state = firestore(context)
  provide(FirestoreKey, state)
  return state
}
export default function useFirestore () {
  const firestore = inject(FirestoreKey)
  if (!firestore) {
    throw new Error("Firestore are not provided");
  }
  return firestore;
}
type FirestoreType = ReturnType<typeof firestore>
const FirestoreKey: InjectionKey<FirestoreType> = Symbol('firestore')
