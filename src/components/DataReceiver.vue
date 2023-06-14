<template>
  <div>
    <n-h3>密钥生成</n-h3>
    <KeyGeneration />
    <n-divider />
    <n-h3>数据解密</n-h3>
    <DataDecryption />
  </div>
</template>


<script lang="ts" setup>
import KeyGeneration from './cryptography/KeyGeneration.vue'
import DataDecryption from './cryptography/DataDecryption.vue'
</script>