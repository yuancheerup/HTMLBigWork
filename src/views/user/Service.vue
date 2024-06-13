<template>
  <div class="customer-service-chat">
    <!-- 头部 -->
    <van-nav-bar
      title="客服"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />

    <!-- 聊天窗口 -->
    <div class="chat-window">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.type]"
      >
        <div class="message-content">{{ message.content }}</div>
      </div>
      <!-- 等待 AI 回复的加载指示器 -->
      <div v-if="loading" class="loading">
        <van-loading type="spinner" size="24px">加载中...</van-loading>
      </div>
    </div>

    <!-- 输入栏 -->
    <van-field
      v-model="inputMessage"
      placeholder="请输入消息..."
      clearable
      class="chat-input"
      @keypress.enter="sendMessage"
    />
    <van-button type="primary" class="send-button" @click="sendMessage">
      发送
    </van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAIResponse } from '@/utils/ernieService'

// 路由实例
const router = useRouter()

// 消息列表
const messages = ref([
  { type: 'received', content: '您好！今天有什么可以帮您？' }
  // 可以在这里添加更多消息
])

// 输入的消息
const inputMessage = ref('')

// 加载状态
const loading = ref(false)

// 处理返回导航
const onBack = () => {
  router.back()
}

// 发送消息
const sendMessage = async () => {
  if (inputMessage.value.trim() !== '') {
    const userMessage = inputMessage.value.trim()
    messages.value.push({ type: 'sent', content: userMessage })

    // 清空输入框
    inputMessage.value = ''

    // 显示加载指示器
    loading.value = true

    try {
      // 调用AI API获取回复
      const aiResponse = await getAIResponse(userMessage)
      console.log('AI回复:', aiResponse)
      messages.value.push({ type: 'received', content: aiResponse })
    } catch (error) {
      console.error('发送消息失败:', error)
      messages.value.push({
        type: 'received',
        content: '抱歉，获取回复失败，请稍后再试。'
      })
    } finally {
      // 隐藏加载指示器
      loading.value = false
    }
  }
}
</script>

<style scoped>
.customer-service-chat {
  background-color: #ffffff;
  padding: 0 16px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  position: relative;
}

.message {
  display: flex;
  margin: 10px 0;
}

.message.received {
  justify-content: flex-start;
}

.message.sent {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
  padding: 10px;
  border-radius: 8px;
  background-color: #f2f2f2;
}

.message.received .message-content {
  background-color: #e0e0e0;
}

.chat-input {
  margin-bottom: 10px;
}

.send-button {
  width: 100%;
  margin-bottom: 10px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>
