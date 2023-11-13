<template>
  <div :style="{ display: 'flex' }">
    <div :style="{ flex: 1 }">
      <n-h3>密钥生成</n-h3>
      <KeyGeneration from="receiver" />
    </div>
    <div :style="{ flex: 1 }">
      <n-h3>数据解密</n-h3>
      <DataDecryption from="receiver" :is-re-decryption="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import KeyGeneration from './cryptography/KeyGeneration.vue'
import DataDecryption from './cryptography/DataDecryption.vue'
</script>
