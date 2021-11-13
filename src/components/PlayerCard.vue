<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useFirestore from '@/hooks/useFirestore'
export default defineComponent({
  props: {
    player: Object,
    nicable: Boolean
  },
  setup (props, context: any) {
    const { postNice } = useFirestore()
    const tryNice = () => {
      if (props.nicable) {
        postNice(props.player.id)
        context.emit('postedNice')
      }
    }
    return { tryNice }
  }
})
</script>

<template>
  <div class="player-card" @click="tryNice" :class="{ '-nicable': nicable }">
    <img :src="player.photoURL">
    <h4>{{ player.name }}</h4>
  </div>
</template>

<style lang="scss" scoped>
.player-card {
  display: flex;
  border: 1px solid #777;
  border-radius: 4px;
  padding: 4px 2px;
  margin-bottom: 8px;
  background-color: #fefefe;
  &.-nicable {
    background-color: yellow;
  }
  img {
    width: 44px;
    height: 44px;
    border-radius: 22px;
    object-fit: cover;
  }
}
</style>
