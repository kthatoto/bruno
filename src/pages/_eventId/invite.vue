<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

import useFirestore from '@/hooks/useFirestore'

export default defineComponent({
  setup (_, context: any) {
    const { fetchTeams, firstLeagueTeams } = useFirestore()
    fetchTeams()
    const teamSelect = ref(context.root.$route.query.team || undefined)

    const imageRef = ref(null)
    const imageUrl = ref(null)
    const imageList = computed(() => imageRef.value === null ? [] : [imageRef.value])
    const handleFilesChange = (file: any, fileList: any[]) => {
      console.log(fileList)
      imageRef.value = file
      imageUrl.value = URL.createObjectURL(file.raw)
    }

    return {
      firstLeagueTeams,
      teamSelect,

      imageUrl,
      imageList,
      handleFilesChange
    }
  }
})
</script>

<template>
  <div class="invite">
    <el-select v-model="teamSelect" placeholder="チームを選択" size="large">
      <el-option
        v-for="team in firstLeagueTeams"
        :key="team.id"
        :value="team.slug"
        :label="team.name"
      />
    </el-select>
    <el-upload
      :show-file-list="false" action="" :auto-upload="false"
      :file-list="imageList" :on-change="handleFilesChange" :on-remove="handleFilesChange"
    >
      <div class="thumbnail" v-if="imageUrl" :style="{backgroundImage: `url(${imageUrl})`}"></div>
      <i v-else class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<style lang="scss" scoped>
.invite {
  padding: 120px 20px 0;
  text-align: center;
  .thumbnail {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
  }
  ::v-deep {
    .el-select {
      width: 100%;
      height: 64px;
      margin-bottom: 64px;
      .el-input {
        input {
          height: 64px;
          font-size: 40px;
        }
      }
    }
    .el-upload {
      width: 150px;
      height: 150px;
      border: 1px dashed #444;
      border-radius: 50%;
      background-color: white;
      i {
        font-size: 32px;
        color: gray;
        margin-top: calc(75px - 16px);
        vertical-align: middle;
      }
    }
  }
}
</style>
