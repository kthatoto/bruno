const leagues = [
  { id: 'league1', name: '第1リーグ', eventId: 'xbit-futsal-second', order: 1 },
  { id: 'league2', name: '第2リーグ', eventId: 'xbit-futsal-second', order: 2 }
]
const teams = {
  league1: [
    { id: 'albatross', name: 'Albatross' },
    { id: 'buffalo', name: 'Buffalo' },
    { id: 'capybara', name: 'Capybara' },
    { id: 'dolphin', name: 'Dolphin' },
  ],
  league2: [
    { id: 'eagle', name: 'Eagle' },
    { id: 'falcon', name: 'Falcon' },
    { id: 'giraffe', name: 'Giraffe' },
    { id: 'horse', name: 'Horse' },
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
