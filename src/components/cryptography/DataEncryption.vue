<template>
  <n-form
    ref="formRef"
    :model="model"
    label-placement="left"
    label-width="140"
    :rules="rules"
    :style="{
      maxWidth: '440px',
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
    <n-form-item label="要加密的数据" path="plaintext">
      <n-input
        style="width: 460px"
        v-model:value="model.plaintext"
        type="textarea"
        placeholder="要加密的数据"
      />
    </n-form-item>
    <n-form-item label="加密密钥" path="pk">
      <n-input style="width: 460px" v-model:value="model.pk" placeholder="请输入加密密钥" />
    </n-form-item>
    <n-form-item label="加密算法" path="selectAlg">
      <n-select
        v-model:value="model.selectAlg"
        placeholder="请选择加密算法"
        :options="model.algOptions"
      />
    </n-form-item>
    <n-form-item label=" ">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <n-button :loading="loading" type="primary" @click="handleGenerateMsg"> Encrypt </n-button>
        <n-button @click="handleReset" style="margin-left: 10px"> Reset </n-button>
      </div>
    </n-form-item>
    <template v-if="flag">
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
import { reactive, ref } from 'vue'
import type { UploadFileInfo, FormInst, UploadInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { CloudUploadOutline } from '@vicons/ionicons5'
import { deplay } from '@/utils/index'

const message = useMessage();

const formRef = ref<FormInst | null>(null)
const uploadRef = ref<UploadInst | null>(null)
const loading = ref(false)

const flag = ref(false)

const rules = {
  plaintext: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入要加密的数据'
  },
  pk: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入加密密钥'
  },
  selectAlg: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择加密算法'
  }
}

const model = reactive({
  selectAlg: '',
  plaintext: '',
  ciphertext: '',
  pk: '',
  algOptions: [
    {
      label: 'RSA',
      value: 'RSA'
    },
    {
      label: 'ECC',
      value: 'ECC'
    }
  ]
})

const handleFinish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
  console.log(event)
  console.log(file)
  const reader = new FileReader()
  reader.readAsText(file.file as Blob, 'uft-8')
  reader.onload = () => {
    model.plaintext = reader.result as string
  }
  return file
}

const handleRemove = () => {
  model.plaintext = ''
}

const handleGenerateMsg = (e: Event) => {
  
  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(model)

      loading.value = true
      //进行网络请求
      let p = deplay(3000)
      p.then(() => {
        flag.value = true
        loading.value = false
        message.success("成功")
      })
    } else {
      console.log(errors)
      // message.error('验证失败')
      console.log('验证失败')
      message.error("失败")
    }
  })
}

// 重置
const handleReset = () => {
  formRef.value?.restoreValidation()
  model.plaintext = ''
  model.pk = ''
  model.selectAlg = ''
  flag.value = false
  uploadRef.value?.clear()
}
</script>
