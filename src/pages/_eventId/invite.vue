<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import { Message } from 'element-ui'

import useFirestore from '@/hooks/useFirestore'

export default defineComponent({
  setup (_, context: any) {
    const {
      fetchEvent,
      fetchTeams,
      firstLeagueTeams,
      event,
      createPlayer
    } = useFirestore()
    fetchEvent()
    fetchTeams()
    const teamSelect = ref(context.root.$route.query.team || undefined)

    const image = ref(null)
    const imageUrl = ref(null)
    const imageList = computed(() => image.value === null ? [] : [image.value])
    const handleFilesChange = (file: any, fileList: any[]) => {
      image.value = file
      imageUrl.value = URL.createObjectURL(file.raw)
    }
    console.log(context.root.$fire)

    const name = ref(null)

    const submitting = ref(false)
    const submit = () => {
      if (submitting.value) return
      if (!teamSelect.value) return Message.error('チームを選択してください')
      if (!image.value) return Message.error('画像を入力してください')
      if (!name.value) return Message.error('名前を入力してください')
      submitting.value = true
      const currentUser = context.root.$fire.auth.currentUser
      const imageRef = context.root.$fire.storage
        .ref(`user_profiles/${currentUser.uid}-${image.value!.name}`)
      const uploadTask = imageRef.put(image.value.raw)
      uploadTask.on('state_changed', {
        error: async () => {
          submitting.value = false
          return Message.error('画像のアップロードに失敗しました')
        },
        complete: async () => {
          submitting.value = false
          const imageUrl: string = await imageRef.getDownloadURL()
          await currentUser.updateProfile({ photoURL: imageUrl, displayName: name.value })
          await createPlayer({ id: currentUser.uid, name: name.value, photoURL: imageUrl })
          Message.success("選手登録完了！")
          context.root.$router.push(`/${event.value.id}`)
        }
      })
    }

    return {
      event,
      firstLeagueTeams,
      teamSelect,

      imageUrl,
      imageList,
      handleFilesChange,

      name,

      submit
    }
  }
})
</script>

<template>
  <div class="invite">
    <form @submit.prevent="submit">
      <h1 v-if="event">{{ event.name }}</h1>
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

      <el-input class="name-input" v-model="name" placeholder="名前"></el-input>

      <el-button native-type="submit" type="primary">登録</el-button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.invite {
  padding: 60px 20px 0;
  text-align: center;
  h1 {
    font-size: 28px;
    margin-bottom: 32px;
  }
  .thumbnail {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
  }
  .name-input {
    font-size: 32px;
    margin-bottom: 32px;
    ::v-deep {
      input {
        height: 48px;
      }
    }
  }
  ::v-deep {
    .el-select {
      width: 100%;
      margin-bottom: 32px;
      .el-input {
        input {
          height: 48px;
          font-size: 32px;
        }
      }
    }
    .el-upload {
      width: 150px;
      height: 150px;
      border: 1px dashed #444;
      border-radius: 50%;
      background-color: white;
      margin-bottom: 32px;
      i {
        font-size: 32px;
        color: gray;
        margin-top: calc(75px - 16px);
        vertical-align: middle;
      }
    }
    .el-button {
      width: 100%;
      font-size: 20px;
    }
  }
}
</style>
