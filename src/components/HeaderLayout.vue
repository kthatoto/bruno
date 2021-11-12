<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useFirestore from '@/hooks/useFirestore'

export default defineComponent({
  setup (_, context: any) {
    const { fetchCurrentPlayer, currentPlayer } = useFirestore()
    fetchCurrentPlayer()
    return { currentPlayer }
  }
})
</script>

<template>
  <div class="header-layout">
    <header>
      <router-link class="logo" to="/">
        <img src="@/assets/logo.png">
      </router-link>

      <router-link class="user-icon" to="/settings" v-if="currentPlayer">
        <img :src="currentPlayer.photoURL">
      </router-link>
    </header>

    <nav>
      <router-link to="/xbit-futsal-second">Home</router-link>
      <router-link to="/xbit-futsal-second/Team">Team</router-link>
      <router-link to="/xbit-futsal-second/result">Result</router-link>
      <router-link to="/xbit-futsal-second/ranking">Ranking</router-link>
    </nav>

    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-layout {
  header {
    position: relative;
    .logo {
      height: 60px;
      display: block;
      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
    .user-icon {
    }
  }
  nav {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    a {
      color: #444;
      font-size: 20px;
      text-decoration: none;
      font-weight: bold;
      padding: 4px 8px;
      &.nuxt-link-active {
        background-color: #666;
        color: white;
        border-radius: 40px;
      }
    }
  }
  .body {
    padding: 0 16px 0;
  }
}
</style>
