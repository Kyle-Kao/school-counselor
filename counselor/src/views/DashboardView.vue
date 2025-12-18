<template>
  <div class="teams-container">
    <div class="title">新增/編輯 消息</div>
    <div class="content">
      <span>伴諮商所提供溫暖、安全、舒適、隱密的各種諮商空間，讓前來的諮商的民眾可以在此放心、 安心地探索各項議題，各樓層規劃空間如下：</span>
      <img src="https://www.companion.com.tw/images/floor%20plan_1F.png" alt="">
      <img src="https://www.companion.com.tw/images/floor%20plan_2F.png" alt="">
      <img src="https://www.companion.com.tw/images/floor%20plan_3F.png" alt="">
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'

export default {
  name: 'DashboardView',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const errorMessage = ref('')

    const handleLogin = async () => {
      isLoading.value = true
      errorMessage.value = ''

      try {
        // 調用登入 API
        const response = await api.post('/login', {
          email: email.value,
          password: password.value,
        })

        // 保存 token 到 localStorage
        if (response.token) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('user', JSON.stringify(response.user))

          // 重定向到首頁
          router.push('/')
        }
      } catch (error) {
        errorMessage.value = error.response?.data?.message || '登入失敗，請檢查郵箱和密碼'
        console.error('登入錯誤:', error)
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      password,
      isLoading,
      errorMessage,
      handleLogin,
    }
  },
}
</script>

<style scoped lang="scss">
  .teams-container {
    // max-width: 1320px;
    max-width: 830px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    min-height: 60vh;
    font-size: 16px;
    color: #555;

    .title {
      font-weight: normal;
      font-size: 40px;
      color: #dc6e31;
      position: relative;
      align-self: flex-start;
      &:before{
        display: inline-block;
        position: absolute;
        content: '';
        width: 60px;
        height: 2px;
        background-color: #dc6e31;
        border-radius: 30px;
        left: 0%;
        top: 50%;
        transform: translate(-130%, -50%);
      }
    }
  }

  .content{
    max-width: 830px;
    width: 100%;
    background-color: rgb(242, 242, 242,.5);
    border-radius: 4px;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    span{
      font-size: 20px;
      color: #555;
      margin-bottom: 15px;
    }
  }
</style>
