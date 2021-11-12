<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  layout: 'plain',
  setup (_, context: any) {
    context.root.$router.push('/xbit-futsal-second/invite')
  }
});
</script>
