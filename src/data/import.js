const leagues = [
  { name: '第1リーグ', eventId: 'xbit-futsal-second', order: 1 },
  { name: '第2リーグ', eventId: 'xbit-futsal-second', order: 2 }
]
const teams = {
  league1: [
    { slug: 'league-1-a', name: 'チームA' },
    { slug: 'league-1-b', name: 'チームB' },
    { slug: 'league-1-c', name: 'チームC' },
    { slug: 'league-1-d', name: 'チームD' },
  ],
  league2: [
    { slug: 'league-2-a', name: 'チームA' },
    { slug: 'league-2-b', name: 'チームB' },
    { slug: 'league-2-c', name: 'チームC' },
    { slug: 'league-2-d', name: 'チームD' },
  ],
}
export default async (fs) => {
  leagues.forEach(async (league) => {
    const result = await fs.collection('leagues').add(league)
    const leagueId = result.id
    teams[`league${league.order}`].forEach(async (team) => {
      await fs.collection('teams').add({ ...team, leagueId })
    })
  })
}
