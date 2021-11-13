<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    player: Object
  }
})
</script>

<template>
  <div class="player-card">
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
  img {
    width: 44px;
    height: 44px;
    border-radius: 22px;
    object-fit: cover;
  }
}
</style>
