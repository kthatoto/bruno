const leagues = [
  { name: '第1リーグ', eventId: 'xbit-futsal-second', order: 1 },
  { name: '第2リーグ', eventId: 'xbit-futsal-second', order: 2 }
]
const teams = {
  league1: [
    { slug: 'albatross', name: 'チームA' },
    { slug: 'buffalo', name: 'チームB' },
    { slug: 'capybara', name: 'チームC' },
    { slug: 'dolphin', name: 'チームD' },
  ],
  league2: [
    { slug: 'eagle', name: 'チームA' },
    { slug: 'falcon', name: 'チームB' },
    { slug: 'giraffe', name: 'チームC' },
    { slug: 'horse', name: 'チームD' },
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
