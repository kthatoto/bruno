<template>
  <div>
    <h1>Bruno</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup (_, context: any) {
    console.log(process.env.FIREBASE_DATABASEURL)
    context.root.$fire.auth.onAuthStateChanged((user: any) => {
      if (!user) {
        context.root.$fire.auth.signInAnonymously()
      } else{
        console.log(user.uid, user)
      }
    })
    return {}
  }
});
</script>
