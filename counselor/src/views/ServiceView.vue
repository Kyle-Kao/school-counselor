<template>
  <div class="teams-container">
    <div class="title">伴服務</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'

export default {
  name: 'ServiceView',
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
    max-width: 1320px;
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
</style>
