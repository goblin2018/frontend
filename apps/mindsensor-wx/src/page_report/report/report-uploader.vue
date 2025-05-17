<script setup lang="ts">
import Popup from '@/components/popup.vue'
import { postx } from '@/lib/http'
import { uploadFile } from '@/lib/oss'
import { useTrainStore } from '@/state/train'

const show = ref(false)
const uploading = ref(false)

function open() {
  show.value = true
}

const trainStore = useTrainStore()
function upload() {
  if (!trainStore.train) return
  uploading.value = true
  let remote_path = 'train/' + trainStore.train?.user_id
  let data = trainStore.train_tmp.data
  const jsonStr = JSON.stringify(data)
  let path = wx.env.USER_DATA_PATH + '/tmp.json'
  wx.getFileSystemManager().writeFileSync(path, jsonStr)

  uploadFile(path, remote_path).then((res) => {
    // 获取远端url
    trainStore.train!.data_file = res

    postx('api/train', trainStore.train)
      .then(() => {
        trainStore.uploaded = true
      })
      .finally(() => {
        uploading.value = false
        show.value = false
      })
  })
}
</script>

<template>
  <button @click="open">上传报告</button>
  <Popup :open="show">
    <view>
      <button @click="upload">确认上传</button>
    </view>
  </Popup>
</template>
