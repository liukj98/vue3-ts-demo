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
    <n-form-item label="原始数据" path="originaltext">
      <n-input
        style="width: 460px"
        v-model:value="model.originaltext"
        type="textarea"
        placeholder="请输入原始数据"
      />
    </n-form-item>
    <n-form-item label="要校验的数据" path="verifiedtext">
      <n-input
        style="width: 460px"
        v-model:value="model.verifiedtext"
        type="textarea"
        placeholder="请输入要校验的数据"
      />
    </n-form-item>
    <n-form-item label="校验算法" path="selectAlg">
      <n-select
        v-model:value="model.selectAlg"
        placeholder="请选择校验算法"
        :options="model.algOptions"
      />
    </n-form-item>
    <n-form-item label=" ">
      <div style="display: flex; justify-content: space-between; width: 100%">

      <n-button type="primary" @click="handleGenerateMsg"> Validate </n-button>
      <n-button @click="handleReset" style="margin-left: 10px"> Reset </n-button>
    </div>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInst } from 'naive-ui'

const formRef = ref<FormInst | null>(null)

const rules = {
  originaltext: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入原始数据'
  },
  verifiedtext: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入要校验的数据'
  },
  selectAlg: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择校验算法'
  }
}

const model = reactive({
  originaltext: '',
  verifiedtext: "",
  selectAlg: '',
  algOptions: [
    {
      label: 'HASH',
      value: 'HASH'
    },
    {
      label: 'MD5',
      value: 'MD5'
    }
  ]
})

const handleGenerateMsg = (e: Event) => {
  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(model)
      console.log('验证成功')
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
  model.originaltext = ''
  model.verifiedtext = ''
  model.selectAlg = ''
}
</script>
