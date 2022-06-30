<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import useFirestore from '@/hooks/useFirestore'
import { Game, GameStatus } from '@/types'

export default defineComponent({
  setup (_, context: any) {
    const { games, fetchGames, updateGameStatus } = useFirestore()
    setTimeout(() => fetchGames(), 500)
    const sortedGames = computed(() => games.value.sort((a, b) => a.order - b.order))
    const onChange = async (game: Game, status: GameStatus) => {
      await updateGameStatus(game.id, status)
      fetchGames()
    }
    return {
      sortedGames,
      onChange
    }
  }
})
</script>

<template>
  <div class="master-games">
    <table>
      <thead>
        <tr>
          <th>game.id</th>
          <td>not_stared</td>
          <td>going</td>
          <td>finished</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in sortedGames">
          <th>{{ game.id }}</th>
          <td>
            <el-radio border :value="game.status" label="not_started" @change="onChange(game, 'not_started')">1</el-radio>
          </td>
          <td>
            <el-radio border :value="game.status" label="going" @change="onChange(game, 'going')">2</el-radio>
          </td>
          <td>
            <el-radio border :value="game.status" label="finished" @change="onChange(game, 'finished')">3</el-radio>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.master-games {
  padding: 32px 16px;
  table {
    border-collapse: collapse;
  }
  td, th {
    padding: 16px 8px;
    border: 1px solid #444;
  }
}
</style>
