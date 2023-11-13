<template>
  <div>
    <n-h3>数据重加密</n-h3>
    <DataEncryption from="proxy" encyption-type="re-encryption" />
  </div>
</template>

<script lang="ts" setup>
import DataEncryption from './cryptography/DataEncryption.vue'
import { NH3 }  from 'naive-ui'
</script>