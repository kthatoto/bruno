<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import useFirestore from '@/hooks/useFirestore'
export default defineComponent({
  props: {
    player: Object,
    nicable: Boolean
  },
  setup (props, context: any) {
    const { postNice } = useFirestore()
    const niced = ref(false)
    const tryNice = () => {
      if (props.nicable) {
        postNice(props.player.id)
        context.emit('postedNice')
        niced.value = true
        setTimeout(() => niced.value = false, 5000)
      }
    }
    return { tryNice, niced }
  }
})
</script>

<template>
  <div class="player-card" @click="tryNice" :class="{ '-nicable': nicable }">
    <img :src="player.photoURL">
    <h4>{{ player.name }}</h4>
    <img v-if="niced" class="nice" src="@/assets/nice.png">
  </div>
</template>

<style lang="scss" scoped>
.player-card {
  display: flex;
  border-radius: 6px;
  padding: 4px 2px;
  margin-bottom: 16px;
  background-color: #fefefe;
  transition: all .3s;
  position: relative;
  &.-nicable {
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
  }
  img {
    width: 44px;
    height: 44px;
    border-radius: 22px;
    object-fit: cover;
  }
  .nice {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100px;
    object-fit: contain;
  }
}
</style>
