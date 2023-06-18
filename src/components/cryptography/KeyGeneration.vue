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
    <n-form-item label="参数" path="prams">
      <n-input v-model:value="model.prams" placeholder="请输入参数" />
    </n-form-item>
    <n-form-item label="密钥生成算法" path="selectValue">
      <n-select v-model:value="model.selectValue" placeholder="请选择" :options="model.options" />
    </n-form-item>
    <n-form-item label=" ">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <n-button type="primary" @click="handleValidateButtonClick"> Generate Key </n-button>
        <n-button @click="handleReset" style="margin-left: 10px"> Reset </n-button>
      </div>
    </n-form-item>
    <template v-if="flag">
      <n-form-item label="公钥" path="pk">
        <span id="pk-cp">{{ model.pk }}</span>
        <n-icon
          class="btn"
          data-clipboard-target="#pk-cp"
          style="cursor: pointer; margin-left: 5px"
          size="20"
        >
          <copy-outline />
        </n-icon>
      </n-form-item>
      <n-form-item label="私钥" path="sk">
        <span id="sk-cp">{{ model.sk }}</span>
        <n-icon
          class="btn"
          data-clipboard-target="#sk-cp"
          style="cursor: pointer; margin-left: 5px"
          size="20"
        >
          <copy-outline />
        </n-icon>
      </n-form-item>
    </template>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInst } from 'naive-ui'
import Clipboard from 'clipboard'
import { CopyOutline } from '@vicons/ionicons5'
import { getKeys, type KeyGenAlg } from '@/api/cryptography'

const formRef = ref<FormInst | null>(null)

const flag = ref(false)

let model = reactive({
  prams: '',
  selectValue: '',
  pk: '',
  sk: '',
  options: [
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

const rules = {
  prams: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入参数'
  },

  selectValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择一个算法'
  }
}

const handleValidateButtonClick = (e: Event) => {
  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (!errors) {
      const { prams, selectValue } = model
      console.log(prams, selectValue as KeyGenAlg)
      flag.value = true
      console.log('验证成功')
      getKeys({
        params: {},
        keyGenAlg: selectValue as KeyGenAlg
      })
      model.pk = 'asklhdjasljdl'
      model.sk = 'sa;lsjdklas'
      new Clipboard('.btn')
    } else {
      console.log(errors)
      // message.error('验证失败')
      console.log('验证失败')
    }
  })
}

const handleReset = () => {
  formRef.value?.restoreValidation()
  flag.value = false
  model.prams = ''
  model.selectValue = ''
}
</script>
