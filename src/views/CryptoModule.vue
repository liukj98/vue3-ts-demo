<template>
  <n-tabs type="card">
    <n-tab-pane name="chap1" tab="密钥生成模块">
      <KeyGeneration />
    </n-tab-pane>
    <n-tab-pane name="chap2" tab="数据加密模块">
      <DataEncryption />
    </n-tab-pane>
    <n-tab-pane name="chap3" tab="数据解密模块">
      <DataDecryption />
    </n-tab-pane>
    <n-tab-pane name="chap4" tab="数据校验模块">
      <DataValidation />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import KeyGeneration from '../components/cryptography/KeyGeneration.vue'
import DataEncryption from '../components/cryptography/DataEncryption.vue'
import DataDecryption from '../components/cryptography/DataDecryption.vue'
import DataValidation from '../components/cryptography/DataValidation.vue'
</script>
