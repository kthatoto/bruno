<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HeaderLayout from '@/components/HeaderLayout.vue'
import useFirestore from '@/hooks/useFirestore'

export default defineComponent({
  components: { HeaderLayout },
  setup (_, context: any) {
    const {
      fetchGames,
      onGoingGame
    } = useFirestore()

    fetchGames()

    return {
      onGoingGame
    }
  }
})
</script>

<template>
  <HeaderLayout>
    <h2>現在の試合</h2>
  </HeaderLayout>
</template>
