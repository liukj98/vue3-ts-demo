<template>
  <div>
    <n-steps :current="(current as number)" :status="currentStatus" style="margin-bottom: 20px;">
      <n-step title="密钥生成" description="生成公钥和私钥，公钥用于加密数据，私钥用于生成重加密密钥" />
      <n-step title="数据加密" description="使用第一步生成的公钥加密数据"/>
    </n-steps>
    <template v-if="current === 1">
      <KeyGeneration />
    </template>
    <template v-else>
      <DataEncryption />
    </template>
    <n-space>
      <n-button-group style="display: flex; justify-content: space-between;">
        <n-button :disabled="current === 1" @click="prev">
          <template #icon>
            <n-icon>
              <md-arrow-round-back />
            </n-icon>
          </template>
        </n-button>
        <n-button :disabled="current === 2" @click="next">
          <template #icon>
            <n-icon>
              <md-arrow-round-forward />
            </n-icon>
          </template>
        </n-button>
      </n-button-group>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import KeyGeneration from './cryptography/KeyGeneration.vue'
import DataEncryption from './cryptography/DataEncryption.vue'
import { ref } from 'vue'
import type { StepsProps } from 'naive-ui'
import { MdArrowRoundBack, MdArrowRoundForward } from '@vicons/ionicons4'

const current = ref<number | null>(1)

const currentStatus = ref<StepsProps['status']>('process')

const next = () => {
  if (current.value === null) current.value = 1
  else if (current.value >= 4) current.value = null
  else current.value++
}
const prev = () => {
  if (current.value === 0) current.value = null
  else if (current.value === null) current.value = 4
  else current.value--
}
</script>
