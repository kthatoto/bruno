<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import useFirestore from '@/hooks/useFirestore'

export default defineComponent({
  setup (_, context: any) {
    const { fetchTeams, firstLeagueTeams } = useFirestore()
    fetchTeams()

    const teamSelect = ref(context.root.$route.query.team || undefined)

    return {
      firstLeagueTeams,
      teamSelect
    }
  }
})
</script>

<template>
  <div class="invite">
    <el-select v-model="teamSelect" placeholder="チームを選択してください">
      <el-option
        v-for="team in firstLeagueTeams"
        :key="team.id"
        :value="team.slug"
        :label="team.name"
      />
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.invite {
  padding: 30px 20px;
  text-align: center;
  .el-select {
    width: 100%;
  }
}
</style>
