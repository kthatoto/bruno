<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HeaderLayout from '@/components/HeaderLayout.vue'
export default defineComponent({
  components: { HeaderLayout }
})
</script>

<template>
  <HeaderLayout>
    <h1>Event Index</h1>
  </HeaderLayout>
</template>
