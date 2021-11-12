import {
  InjectionKey,
  inject,
  provide,
  reactive,
  computed,
} from '@vue/composition-api'

import { League, Team } from '@/types'

const getDataByID = async (fs: any, collectionName: string, id: string) => {
  const docRef: any = fs.collection(collectionName).doc(id)
  const docSnapshot: any = await docRef.get()
  return docSnapshot.data()
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
    leagues: boolean
    teams: boolean
  }>({
    leagues: false,
    teams: false
  })
  const state = reactive<{
    eventId?: string
    leagues: League[]
    teams: Team[]
  }>({
    eventId: context.root.$route.params.eventId,
    leagues: [],
    teams: []
  })

  const findPlayer = async (uid: string) => await getDataByID(fs, 'players', uid)
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

  const firstLeague = computed<League | undefined>(() => {
    if (!fetched.leagues) return
    return state.leagues.find((league: League) => league.order === 1)
  })
  const firstLeagueTeams = computed<Team[] | undefined>(() => {
    if (!fetched.teams || !fetched.leagues) return
    return state.teams.filter((team: Team) => team.leagueId === firstLeague.value!.id)
  })

  return {
    findPlayer,
    fetchTeams,

    firstLeague,
    firstLeagueTeams
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
