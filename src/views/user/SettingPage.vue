<script setup>
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const onClickLeft = () => history.back()
</script>

<template>
  <van-nav-bar
    title="设置"
    left-arrow
    @click-left="onClickLeft"
    :border="false"
  />

  <van-cell-group class="setting-info">
    <van-cell title="账号管理" is-link :border="false">
      {{ userStore.username === '' ? '未登录' : userStore.username }}
    </van-cell>
    <van-cell title="手机号码" is-link :border="false">187****2747</van-cell>
    <van-cell title="账号安全" is-link />
  </van-cell-group>

  <van-cell-group class="setting-info">
    <van-cell title="提高APP稳定性" is-link :border="false" />
    <van-cell title="给个好评" is-link :border="false" />
    <van-cell title="清除缓存" is-link>6.66MB</van-cell>
    <van-cell title="个人信息收集单" is-link />
    <van-cell title="第三方SDK共享清单" is-link />
  </van-cell-group>

  <van-cell-group class="setting-info">
    <van-cell
      title="注销账户"
      is-link
      :border="false"
      @click="userStore.removeUser"
      to="/login"
    />
    <van-cell title="退出登录" is-link :border="false" to="/login" />
  </van-cell-group>
</template>

<style scoped>
.setting-info {
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #f7f7f7;
  box-shadow: 0 0 8px #f7f7f7;

  .van-cell {
    border-radius: 10px;
  }
}
</style>
