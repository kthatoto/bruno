<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import HeaderLayout from '@/components/HeaderLayout.vue'
import useFirestore from '@/hooks/useFirestore'
import { Player } from '@/types'

export default defineComponent({
  components: { HeaderLayout },
  setup () {
    const {
      players,
      fetchPlayers
    } = useFirestore()
    fetchPlayers()

    const rankingPlayers = computed(() => players.value.sort((p: Player) => p.niceCount))

    return {
      rankingPlayers
    }
  }
})
</script>

<template>
  <HeaderLayout>
    <div class="ranking">
      <h2>ランキング</h2>

      <div class="ranking-list">
        <div v-for="(player, i) in rankingPlayers" :key="player.id" class="ranking-item">
          <div class="ranking-rank">{{ i + 1 }}位</div>
          <img :src="player.photoURL">
          <div class="ranking-name">{{ player.name }}</div>
          <div class="ranking-niceCount">{{ player.niceCount }} Nices!</div>
        </div>
      </div>
    </div>
  </HeaderLayout>
</template>

<style lang="scss" scoped>
.ranking {
  h2 {
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid gray;
  }
  &-item {
    display: flex;
  }
}
</style>
