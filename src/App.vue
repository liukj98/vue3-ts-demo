<template>
  <div class="app">
    <n-message-provider>
      <div style="display: flex">
        <router-link to="/app-show">
          <n-card size="small" title="应用展示"> 展示代理重加密内容 </n-card>
        </router-link>
        <router-link to="/crypto-module">
          <n-card size="small" title="密码模块"> 显示密码学各个模块 </n-card>
        </router-link>
      </div>
      <n-divider />
      <router-view></router-view>
    </n-message-provider>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.app {
  margin: 20px;
}
a {
  text-decoration: none;
}
.n-card {
  max-width: 300px;
  margin: 10px;
  cursor: pointer;
}
.router-link-active .n-card {
  /* background-color: #; */
  color: #18a058;
}

.router-link-active .n-card .n-card-header__main {
  color: #fff;
}
</style>
