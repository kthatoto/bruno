<template>
  <div class="layout">
    <nuxt />
  </div>
</template>

<style lang="scss">
html {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
html,
body,
#__nuxt {
  height: 100%;
  background-color: #444;
}

.layout {
  background-color: #eee;
  min-height: 100vh;
  max-width: 414px;
  margin: 0 auto;
}
</style>
