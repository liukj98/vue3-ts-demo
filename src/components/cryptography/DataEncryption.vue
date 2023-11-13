<template>
  <n-form
    ref="formRef"
    :model="model"
    label-placement="left"
    label-width="140"
    :rules="rules"
    :style="{
      maxWidth: '440px'
    }"
  >
    <n-form-item label="选择文件">
      <n-upload
        ref="uploadRef"
        action="http://localhost:3000/upload"
        accept=".txt,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        @finish="handleFinish"
        @remove="handleRemove"
      >
        <n-button>
          <template #icon>
            <n-icon>
              <cloud-upload-outline />
            </n-icon>
          </template>
          上传文件</n-button
        >
      </n-upload>
    </n-form-item>
    <n-form-item label="要加密的数据" path="msg">
      <n-input
        style="width: 460px"
        v-model:value="model.msg"
        type="textarea"
        placeholder="要加密的数据"
      />
    </n-form-item>
    <n-form-item label="数据发送方 ID" path="senderID">
      <n-input
        style="width: 460px"
        v-model:value="model.senderID"
        placeholder="请输入数据发送方 ID"
      />
    </n-form-item>
    <div v-if="props.encyptionType === 're-encryption'">
      <n-form-item label="重加密密钥" path="reKey">
        <n-input style="width: 460px" v-model:value="model.reKey" placeholder="请输入重加密密钥" />
      </n-form-item>
    </div>
    <n-form-item label="加密算法" path="selectedAlg">
      <n-select
        v-model:value="model.selectedAlg"
        placeholder="请选择加密算法"
        :options="model.algOptions"
      />
    </n-form-item>
    <n-form-item label=" ">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <n-button :loading="loading" type="primary" @click="handleEncrypt"> Encrypt </n-button>
        <n-button @click="handleReset" style="margin-left: 10px"> Reset </n-button>
      </div>
    </n-form-item>
    <template v-if="isShowEncryptMsg">
      <n-form-item label="密文">
        <n-input
          style="width: 460px"
          v-model:value="model.ciphertext"
          type="textarea"
          placeholder="密文数据"
          id="ciphertext-cp"
        />
      </n-form-item>
    </template>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps } from 'vue'
import type { UploadFileInfo, FormInst, UploadInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { CloudUploadOutline } from '@vicons/ionicons5'
import { delay } from '@/utils/index'
import type { FromType, EncryptionType } from '@/type/index'

const props = defineProps<{ from: FromType; encyptionType?: EncryptionType }>()

const message = useMessage()

const formRef = ref<FormInst | null>(null)
const uploadRef = ref<UploadInst | null>(null)
const loading = ref(false)

const isShowEncryptMsg = ref(false)

const rules = {
  msg: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入要加密的数据'
  },
  senderID: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入数据发送方 ID'
  },
  reKey: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入重加密密钥'
  },
  selectedAlg: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择加密算法'
  }
}

const model = reactive({
  selectedAlg: '', // 加密算法
  msg: '', // 要加密的数据
  ciphertext: '', // 加密后的结果
  reKey: '', // 重加密密钥
  senderID: '', // 发送方 ID
  algOptions: [
    {
      label: 'IBPRE',
      value: 'IBPRE'
    }
  ]
})

const handleFinish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
  console.log(event)
  console.log(file)
  const reader = new FileReader()
  reader.readAsText(file.file as Blob, 'uft-8')
  reader.onload = () => {
    model.msg = reader.result as string
  }
  return file
}

const handleRemove = () => {
  model.msg = ''
}

const handleEncrypt = (e: Event) => {
  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(model)
      loading.value = true
      //进行网络请求
      let p = delay(3000)
      p.then((data: boolean) => {
        console.log(data)
        isShowEncryptMsg.value = true
        loading.value = false
        message.success('成功')
      }).catch(() => {})
    } else {
      console.log(errors)
      // message.error('验证失败')
      console.log('验证失败')
      message.error('失败')
    }
  })
}

// 重置
const handleReset = () => {
  formRef.value?.restoreValidation()
  isShowEncryptMsg.value = false
  // TODO:
  model.msg = ''
  model.reKey = ''
  model.selectedAlg = ''
  uploadRef.value?.clear()
}
</script>
