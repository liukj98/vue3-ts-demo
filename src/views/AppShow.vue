<template>
  <n-tabs type="card">
    <n-tab-pane name="chap1" display-directive="show" tab="数据发送方">
      <DataSender />
    </n-tab-pane>
    <n-tab-pane name="chap2" display-directive="show" tab="代理方">
      <DataProxy />
    </n-tab-pane>
    <n-tab-pane name="chap3" display-directive="show" tab="数据接收方">
      <DataReceiver />
    </n-tab-pane>
    <n-tab-pane name="chap4" display-directive="show" tab="攻击方">
      <DataAttacker />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import DataSender from '../components/DataSender.vue'
import DataProxy from '../components/DataProxy.vue'
import DataReceiver from '../components/DataReceiver.vue'
import DataAttacker from '../components/DataAttacker.vue'
</script>
