<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { Message } from 'element-ui'

import useFirestore from '@/hooks/useFirestore'
import { Team } from '@/types'

export default defineComponent({
  setup (_, context: any) {
    const {
      fetchCurrentPlayer,
      currentPlayer,

      fetchEvent,
      fetchTeams,
      firstLeagueTeams,
      event,
      createPlayer
    } = useFirestore()
    fetchEvent().then(() => {
      fetchCurrentPlayer().then(() => {
        if (currentPlayer.value) context.root.$router.push(`/${event.value.id}`)
      })
    })
    const teamIdValid = ref(true)
    const selectedTeam = ref(undefined)
    fetchTeams().then(() => {
      const teamId = context.root.$route.query.team
      const targetTeam = firstLeagueTeams.value.find((team: Team) => team.id === teamId)
      if (!targetTeam) {
        teamIdValid.value = false
        return
      }
      selectedTeam.value = targetTeam
    })

    const image = ref(null)
    const imageUrl = ref(null)
    const imageList = computed(() => image.value === null ? [] : [image.value])
    const handleFilesChange = (file: any, fileList: any[]) => {
      image.value = file
      imageUrl.value = URL.createObjectURL(file.raw)
    }

    const name = ref(null)
    const gender = ref(null)

    const submitting = ref(false)
    const submit = () => {
      if (submitting.value) return
      if (!image.value) return Message.error('画像を入力してください')
      if (!name.value) return Message.error('名前を入力してください')
      if (!gender.value)
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
          await createPlayer({ id: currentUser.uid, name: name.value, photoURL: imageUrl, gender: gender.value }, selectedTeam.value!.id)
          Message.success("選手登録完了！")
          context.root.$router.push(`/${event.value.id}`)
        }
      })
    }

    return {
      teamIdValid,
      event,
      firstLeagueTeams,
      selectedTeam,

      imageUrl,
      imageList,
      handleFilesChange,

      name,
      gender,

      submit
    }
  }
})
</script>

<template>
  <div class="join">
    <template v-if="teamIdValid">
      <form @submit.prevent="submit">
        <h1 v-if="event">{{ event.name }}</h1>
        <h2 v-if="selectedTeam">あなたは「{{ selectedTeam.name }}」です</h2>

        <el-upload
          :show-file-list="false" action="" :auto-upload="false"
                                  :file-list="imageList" :on-change="handleFilesChange" :on-remove="handleFilesChange"
                                  >
                                  <div class="thumbnail" v-if="imageUrl" :style="{backgroundImage: `url(${imageUrl})`}"></div>
                                  <i v-else class="el-icon-plus"></i>
        </el-upload>

        <el-input class="name-input" v-model="name" placeholder="名前"></el-input>
        <div class="radios">
          <el-radio v-model="gender" :label="1" border>男性</el-radio>
          <el-radio v-model="gender" :label="2" border>女性</el-radio>
        </div>
        <p class="note">※ 女性2点ルールのため</p>

        <el-button native-type="submit" type="primary">登録</el-button>
      </form>
    </template>
    <template v-else>
      <h2>無効なURLです</h2>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.join {
  padding: 40px 20px 0;
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
  .radios {
    display: flex;
    margin-bottom: 16px;
    ::v-deep {
      .el-radio {
        width: 45%;
        background-color: white;
        height: 48px;
        &__label {
          font-size: 20px;
        }
      }
    }
  }
  .note {
    margin-bottom: 32px;
    color: gray;
  }
  ::v-deep {
    .el-select {
      width: 100%;
      margin-bottom: 24px;
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
      margin-bottom: 24px;
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
