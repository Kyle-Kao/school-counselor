<template>
  <div class="dash-container">
    <div class="nav">
      <div class="account">xxx@gmail.com</div>
      <div class="functionDiv">
        <ul>
          <li class="active">伴主題 Topics</li>
          <li>伴消息 News</li>
          <li>伴團隊 Team</li>
        </ul>
      </div>
      <div class="logout">Logout</div>
    </div>

    <div class="rightContent">
      <div class="addItem">New</div>
      <div class="tableContent">

      </div>
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
  .dash-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 180px);
    font-size: 16px;
    color: #555;

    .nav{
      flex: 20%;
      align-self: stretch;
      background-color: #fff;
      padding: 40px 20px;
    }

    .rightContent{
      flex: 80%;
      align-self: stretch;
      background-color: rgba(242, 242, 242, 0.5);
      padding: 40px 20px;
    }
  }

  .functionDiv{
    border: 1px solid #E9ECEF;
    border-radius: 5px;
    font-size: 16px;
    margin: 15px 0;
    overflow: hidden;
    li{
      padding: 10px 20px;
      cursor: pointer;

      &.active, &:hover{
        background-color: #dc6e31;
        color: #fff;
      }
    }
  }

  .logout{
    text-decoration: underline;
    color: #ABB5BE;
    font-size: 14px;
  }

  .rightContent{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 50px;
    font-size: 16px;
    .addItem{
      background-color: #dc6e31;
      border-radius: 10px;
      color: #fff;
      padding: 10px 20px;
    }
  }
</style>
