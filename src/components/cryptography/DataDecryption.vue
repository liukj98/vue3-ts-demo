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
    <n-form-item label="要解密的数据" path="decryptiontext">
      <n-input
        style="width: 460px"
        v-model:value="model.decryptiontext"
        type="textarea"
        placeholder="请输入要解密的数据"
      />
    </n-form-item>
    <n-form-item label="解密密钥" path="sk">
      <n-input style="width: 460px" v-model:value="model.sk" placeholder="请输入解密密钥" />
    </n-form-item>
    <n-form-item label="解密算法" path="selectAlg">
      <n-select
        v-model:value="model.selectAlg"
        placeholder="请选择加密算法"
        :options="model.algOptions"
      />
    </n-form-item>
    <n-form-item label=" ">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <n-button type="primary" @click="handleGenerateMsg"> Decrypt </n-button>
        <n-button @click="handleReset" style="margin-left: 10px"> Reset </n-button>
      </div>
    </n-form-item>
    <template v-if="flag">
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

const formRef = ref<FormInst | null>(null)

const flag = ref(false)

const rules = {
  decryptiontext: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入要解密的数据'
  },
  sk: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入解密密钥'
  },
  selectAlg: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择解密算法'
  }
}

const model = reactive({
  selectAlg: '',
  decryptiontext: '',
  plaintext: '',
  sk: '',
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

const handleGenerateMsg = (e: Event) => {
  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(model)
      console.log('验证成功')
      flag.value = true
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
  model.plaintext = ''
  model.decryptiontext = ''
  model.sk = ''
  model.selectAlg = ''
  flag.value = false
}
</script>
