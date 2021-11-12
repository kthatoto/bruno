const leagues = [
  { id: 'league1', name: '第1リーグ', eventId: 'xbit-futsal-second', order: 1 },
  { id: 'league2', name: '第2リーグ', eventId: 'xbit-futsal-second', order: 2 }
]
const teams = {
  league1: [
    { slug: 'albatross', name: 'Albatross' },
    { slug: 'buffalo', name: 'Buffalo' },
    { slug: 'capybara', name: 'Capybara' },
    { slug: 'dolphin', name: 'Dolphin' },
  ],
  league2: [
    { slug: 'eagle', name: 'Eagle' },
    { slug: 'falcon', name: 'Falcon' },
    { slug: 'giraffe', name: 'Giraffe' },
    { slug: 'horse', name: 'Horse' },
  ],
}
const games = {
  league1: [
    { teamIds: 'albatross,buffalo', order: 1 },
    { teamIds: 'capybara,dolphin', order: 2 },
    { teamIds: 'dolphin,albatross', order: 3 },
    { teamIds: 'albatross,capybara', order: 4 },
    { teamIds: 'capybara,buffalo', order: 5 },
    { teamIds: 'buffalo,dolphin', order: 6 }
  ],
  league2: [
    { teamIds: 'eagle,falcon', order: 7 },
    { teamIds: 'giraffe,horse', order: 8 },
    { teamIds: 'horse,eagle', order: 9 },
    { teamIds: 'eagle,giraffe', order: 10 },
    { teamIds: 'giraffe,falcon', order: 11 },
    { teamIds: 'falcon,horse', order: 12 }
  ]
}
export default async (fs) => {
  leagues.forEach(async (league) => {
    const leagueRef = await fs.collection('leagues').doc(league.id)
    await leagueRef.set(league)

    teams[`league${league.order}`].forEach(async (team) => {
      const teamRef = fs.collection('teams').doc(team.slug)
      await teamRef.set({ ...team, leagueId: league.id })
    })

    games[`league${league.order}`].forEach(async (game) => {
      const gameRef = fs.collection('games').doc(`game${game.order}`)
      await gameRef.set({
        ...game,
        leagueId: league.id,
        status: 'not_started',
        result: null
      })
    })
  })
}
