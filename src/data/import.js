const leagues = [
  { id: 'league1', name: '第1リーグ', eventId: 'xbit-futsal-second', order: 1 },
  { id: 'league2', name: '第2リーグ', eventId: 'xbit-futsal-second', order: 2 }
]
const teams = {
  league1: [
    { id: 'albatross', name: 'Albatross' },
    { id: 'buffalo', name: 'Buffalo' },
    { id: 'capybara', name: 'Capybara' }
  ],
  league2: [
    { id: 'dolphin', name: 'Dolphin' },
    { id: 'eagle', name: 'Eagle' },
    { id: 'falcon', name: 'Falcon' }
  ],
}
const games = {
  league1: [
    { teamIds: 'albatross,buffalo', order: 1 },
    { teamIds: 'buffalo,capybara', order: 2 },
    { teamIds: 'capybara,albatross', order: 3 },
    { teamIds: 'albatross,buffalo', order: 4 },
    { teamIds: 'buffalo,capybara', order: 5 },
    { teamIds: 'capybara,albatross', order: 6 }
  ],
  league2: [
    { teamIds: 'dolphin,eagle', order: 7 },
    { teamIds: 'eagle,falcon', order: 8 },
    { teamIds: 'falcon,dolphin', order: 9 },
    { teamIds: 'dolphin,eagle', order: 10 },
    { teamIds: 'eagle,falcon', order: 11 },
    { teamIds: 'falcon,dolphin', order: 12 }
  ]
}
export default async (fs) => {
  leagues.forEach(async (league) => {
    const leagueRef = await fs.collection('leagues').doc(league.id)
    await leagueRef.set(league)

    teams[`league${league.order}`].forEach(async (team) => {
      const teamRef = fs.collection('teams').doc(team.id)
      await teamRef.set({
        ...team,
        leagueId: league.id
      })
    })

    games[`league${league.order}`].forEach(async (game) => {
      const id = `game${game.order}`
      const gameRef = fs.collection('games').doc(id)
      await gameRef.set({
        ...game,
        id,
        leagueId: league.id,
        status: 'not_started',
        result: null
      })
    })
  })
}
