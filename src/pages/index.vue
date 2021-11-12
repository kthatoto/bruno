<template>
  <HeaderLayout></HeaderLayout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HeaderLayout from '@/components/HeaderLayout.vue'
export default defineComponent({
  layout: 'plain',
  components: { HeaderLayout },
  setup (_, context: any) {
    context.root.$router.push('/xbit-futsal-second')
  }
});
</script>
