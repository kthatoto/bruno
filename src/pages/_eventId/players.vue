<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import HeaderLayout from '@/components/HeaderLayout.vue'
import useFirestore from '@/hooks/useFirestore'
import PlayerCard from '@/components/PlayerCard.vue'

export default defineComponent({
  components: { HeaderLayout, PlayerCard },
  setup (_, context: any) {
    const {
      players,
      fetchPlayers
    } = useFirestore()
    fetchPlayers()

    const nicable = ref(false)
    const postedNice = () => {
      nicable.value = false
    }
    setInterval(() => {
      const lastNicedAt = localStorage.getItem('lastNicedAt')
      if (!lastNicedAt) {
        nicable.value = true
        return
      }
      const now = new Date()
      nicable.value = now.getTime() - parseInt(lastNicedAt) > 30 * 1000
    }, 1 * 1000)
    return { players, nicable, postedNice }
  }
})
</script>

<template>
  <HeaderLayout>
    <div class="players">
      <PlayerCard
        v-for="player in players"
        class="players-item"
        :key="player.id"
        :player="player"
        :nicable="nicable"
        @postedNice="postedNice"
      />
    </div>
  </HeaderLayout>
</template>

<style lang="scss" scoped>
.players {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &-item {
    width: 45%;
  }
}
</style>
