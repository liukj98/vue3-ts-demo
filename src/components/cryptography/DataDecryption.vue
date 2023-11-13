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
    <n-form-item label="要解密的数据" path="decryptionText">
      <n-input
        style="width: 460px"
        v-model:value="model.decryptionText"
        type="textarea"
        placeholder="请输入要解密的数据"
      />
    </n-form-item>
    <div v-if="props.isReDecryption">
      <n-form-item label="数据接收方 ID" path="receiverID">
        <n-input
          style="width: 460px"
          v-model:value="model.receiverID"
          placeholder="请输数据接收方 ID"
        />
      </n-form-item>
      <n-form-item label="数据发送方 ID" path="senderID">
        <n-input
          style="width: 460px"
          v-model:value="model.senderID"
          placeholder="请输数据发送方 ID"
        />
      </n-form-item>
      <n-form-item label="数据接收方私钥" path="senderSK">
        <n-input
          style="width: 460px"
          v-model:value="model.receiverID"
          placeholder="请输入数据接收方私钥"
        />
      </n-form-item>
    </div>
    <div v-else>
      <n-form-item label="数据发送方 ID" path="senderID">
        <n-input
          style="width: 460px"
          v-model:value="model.senderID"
          placeholder="请输数据发送方 ID"
        />
      </n-form-item>
      <n-form-item label="数据发送方私钥" path="senderSK">
        <n-input
          style="width: 460px"
          v-model:value="model.senderSK"
          placeholder="请输入数据发送方私钥"
        />
      </n-form-item>
    </div>
    <n-form-item label="解密算法" path="selectedAlg">
      <n-select
        v-model:value="model.selectedAlg"
        placeholder="请选择解密算法"
        :options="model.algOptions"
      />
    </n-form-item>
    <n-form-item label=" ">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <n-button type="primary" @click="handleGenerateMsg"> Decrypt </n-button>
        <n-button @click="handleReset" style="margin-left: 10px"> Reset </n-button>
      </div>
    </n-form-item>
    <template v-if="isShowDecryptionText">
      <n-form-item label="解密后的数据">
        <n-input
          style="width: 460px"
          v-model:value="model.plaintext"
          type="textarea"
          placeholder="解密后的数据"
        />
      </n-form-item>
    </template>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInst } from 'naive-ui'
import type { FromType } from '@/type/index'

const props = defineProps<{ from: FromType; isReDecryption?: boolean }>()
console.log(props.from)

const formRef = ref<FormInst | null>(null)

const isShowDecryptionText = ref(false)

const rules = {
  decryptionText: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入要解密的数据'
  },
  senderID: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入数据发送方 ID'
  },
  receiverID: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入数据接收方 ID'
  },
  senderSK: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入数据发送方私钥'
  },
  receiverSK: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入数据接收方私钥'
  },
  selectedAlg: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择解密算法'
  }
}

const model = reactive({
  senderID: '',
  receiverID: '',
  senderSK: '',
  receiverSK: '',
  selectedAlg: '',
  decryptionText: '',
  plaintext: '',
  algOptions: [
    {
      label: 'IBPRE',
      value: 'IBPRE'
    }
  ]
})

const handleGenerateMsg = (e: Event) => {
  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(model)
      console.log('验证成功')
      isShowDecryptionText.value = true
    } else {
      console.log(errors)
      // message.error('验证失败')
      console.log('验证失败')
    }
  })
}

// 重置
const handleReset = () => {
  formRef.value?.restoreValidation()
  isShowDecryptionText.value = false

  // TODO:
  // model.plaintext = ''
  // model.decryptionText = ''
  // model.selectedAlg = ''
}
</script>
