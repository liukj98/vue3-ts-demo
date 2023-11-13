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
    <template v-if="props.from === 'sender'">
      <n-form-item label="数据发送方 ID" path="senderID">
        <n-input v-model:value="model.senderID" placeholder="请输入数据发送方 ID" />
      </n-form-item>
    </template>
    <template v-else>
      <n-form-item label="数据接收方 ID" path="receiverID">
        <n-input v-model:value="model.receiverID" placeholder="请输入数据接收方 ID" />
      </n-form-item>
    </template>
    <div v-if="props.isReKey">
      <n-form-item label="数据接收方 ID" path="receiverID">
        <n-input v-model:value="model.receiverID" placeholder="请输入数据接收方 ID" />
      </n-form-item>
      <n-form-item label="数据发送方私钥" path="secretKey">
        <n-input v-model:value="model.secretKey" placeholder="请输入私钥" />
      </n-form-item>
    </div>
    <n-form-item label="密钥生成算法" path="selectedAlg">
      <n-select v-model:value="model.selectedAlg" placeholder="请选择" :options="model.options" />
    </n-form-item>
    <n-form-item label=" ">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <n-button type="primary" @click="handleKeyGeneration"> Generate Key </n-button>
        <n-button @click="handleReset" style="margin-left: 10px"> Reset </n-button>
      </div>
    </n-form-item>
    <template v-if="isShowGeneratedKey">
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
import { reactive, ref, defineProps } from 'vue'
import type { FormInst } from 'naive-ui'
import Clipboard from 'clipboard'
import { CopyOutline } from '@vicons/ionicons5'
import { getKeys } from '@/api/cryptography'
import type { KeyGenAlg, FromType } from '@/type/index'

const props = defineProps<{ from: FromType; isReKey?: boolean }>()

console.log(props.from)

const formRef = ref<FormInst | null>(null)

const isShowGeneratedKey = ref(false)

let model = reactive({
  senderID: '',
  receiverID: '',
  secretKey: '',
  selectedAlg: '',
  pk: '',
  sk: '',
  options: [
    {
      label: 'IBPRE',
      value: 'IBPRE'
    }
  ]
})

const rules = {
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
  secretKey: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入数据接收方私钥'
  },
  selectedAlg: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择一个算法'
  }
}

const handleKeyGeneration = (e: Event) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      const { selectedAlg } = model
      isShowGeneratedKey.value = true
      console.log('验证成功')
      console.log(model)
      getKeys({
        params: {},
        keyGenAlg: selectedAlg as KeyGenAlg
      })
      model.pk = 'asklhdjasljdl'
      model.sk = 'sa;lsjdklas'
      new Clipboard('.btn')
    } else {
      console.log(errors)
      console.log('验证失败')
    }
  })
}

const handleReset = () => {
  formRef.value?.restoreValidation()
  isShowGeneratedKey.value = false
  // TODO:
  // model.senderID = ''
  // model.selectedAlg = ''
}
</script>
