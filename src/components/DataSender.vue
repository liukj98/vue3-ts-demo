<template>
  <div :style="{ display: 'flex' }">
    <div :style="{ flex: 1 }">
      <n-h3>密钥生成</n-h3>
      <KeyGeneration from="sender"/>
      <n-divider />
      <n-h3>重加密密钥生成</n-h3>
      <KeyGeneration from="sender" :is-re-key="true" />
    </div>
    <div :style="{ flex: 1 }">
      <n-h3>数据加密</n-h3>
      <DataEncryption from="sender" encyption-type="encryption" />
    </div>
    <div :style="{ flex: 1 }">
      <n-h3>数据解密</n-h3>
      <DataDecryption from="sender" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import KeyGeneration from './cryptography/KeyGeneration.vue'
import DataEncryption from './cryptography/DataEncryption.vue'
import DataDecryption from './cryptography/DataDecryption.vue'
import { NDivider } from 'naive-ui'
</script>
