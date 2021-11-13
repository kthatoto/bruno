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
        <div
          v-for="(player, i) in rankingPlayers"
          :key="player.id"
          class="ranking-item"
          :class="`-rank${i + 1}`"
        >
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
    padding: 8px 16px;
    display: flex;
    &.-rank1 {
      .ranking-rank {
        color: gold;
        font-size: 32px;
      }
    }
    &.-rank2 {
      .ranking-rank {
        color: silver;
        font-size: 28px;
      }
    }
    &.-rank3 {
      .ranking-rank {
        color: tan;
        font-size: 24px;
      }
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
  }
  &-niceCount {
    font-weight: bold;
  }
}
</style>
