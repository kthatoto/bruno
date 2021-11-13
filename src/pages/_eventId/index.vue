<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import HeaderLayout from '@/components/HeaderLayout.vue'
import useFirestore from '@/hooks/useFirestore'
import PlayerCard from '@/components/PlayerCard.vue'

export default defineComponent({
  components: { HeaderLayout, PlayerCard },
  setup (_, context: any) {
    const {
      fetchGames,
      onGoingGameInfo
    } = useFirestore()

    fetchGames()
    const left = computed(() => onGoingGameInfo.value.left)
    const right = computed(() => onGoingGameInfo.value.right)

    return {
      onGoingGameInfo,
      left,
      right
    }
  }
})
</script>

<template>
  <HeaderLayout>
    <div class="home">
      <h2>現在の試合</h2>

      <template v-if="onGoingGameInfo">
        <div class="match">
          <div class="team left">
            <h3>{{ left.teamName }}</h3>
            <PlayerCard v-for="(player, i) in left.players" :key="i" :player="player" />
          </div>

          <div class="vs">vs</div>

          <div class="team right">
            <h3>{{ right.teamName }}</h3>
            <PlayerCard v-for="(player, i) in right.players" :key="i" :player="player" />
          </div>
        </div>
      </template>

      <template v-else>
        <h3>ただいま試合は行われていません</h3>
      </template>
    </div>
  </HeaderLayout>
</template>

<style lang="scss" scoped>
.home {
  h2 {
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid gray;
  }
  h3 {
    margin-bottom: 8px;
  }
  .match {
    display: flex;
    justify-content: space-between;
    .vs {
      font-weight: bold;
      font-size: 28px;
      width: 10%;
      text-align: center;
    }
    .team {
      width: 45%;
      text-align: center;
      h3 {
        font-size: 28px;
      }
    }
  }
}
</style>
