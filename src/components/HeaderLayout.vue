<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useFirestore from '@/hooks/useFirestore'

interface Props {
  plain: boolean
}
export default defineComponent({
  props: {
    plain: { type: Boolean, default: false }
  },
  setup (props: Props, context: any) {
    if (props.plain) return {}
    const { fetchCurrentPlayer, currentPlayer } = useFirestore()
    setTimeout(() => fetchCurrentPlayer(), 500)
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

      <template v-if="!plain && currentPlayer">
        <router-link class="user-icon" to="/settings">
          <img :src="currentPlayer.photoURL">
        </router-link>
      </template>
    </header>

    <nav>
      <router-link to="/xbit-futsal-second">Home</router-link>
      <router-link to="/xbit-futsal-second/team">Team</router-link>
      <router-link to="/xbit-futsal-second/players">Players</router-link>
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
      position: absolute;
      top: 5px;
      right: 5px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        object-fit: cover;
      }
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
      &.nuxt-link-exact-active {
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
