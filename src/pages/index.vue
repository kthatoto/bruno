<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup (_, context: any) {
    context.root.$router.push('/xbit-futsal-second/invite')
  }
});
</script>
