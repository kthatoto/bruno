<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { AuthUser } from '@/types'
import { provideFirestore } from '@/hooks/useFirestore'
import importData from '@/data/import'

export default defineComponent({
  setup (_, context: any) {
    const fire = context.root.$fire
    provideFirestore(context)

    // importData(fire.firestore)

    const eventId = context.root.$route.params.eventId
    fire.auth.onAuthStateChanged(async (user: AuthUser) => {
      if (!user) {
        fire.auth.signInAnonymously()
      } else {
        // const player = await findPlayer(user.uid)
        // if (!player.name) {
        //   context.root.$router.push(`/${eventId}/join`)
        //   return
        // }
      }
    })
  }
})
</script>
<template>
  <div class="layout">
    <nuxt />
  </div>
</template>

<style lang="scss">
html {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
html,
body,
#__nuxt {
  height: 100%;
  background-color: #444;
}

.layout {
  background-color: #eee;
  min-height: 100vh;
  max-width: 414px;
  margin: 0 auto;
}
</style>
