<template>
  <div class="login-container">
    <div class="login-form">
      <h1>登入</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">郵箱：</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="請輸入郵箱"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">密碼：</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="請輸入密碼"
            required
          />
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          {{ isLoading ? '登入中...' : '登入' }}
        </button>
      </form>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p class="signup-link">
        還沒有帳號？<router-link to="/">返回首頁</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getLogin } from '@/apis'
import api from '@/axios'

export default {
  name: 'LoginView',
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
        const response = await getLogin({
          email: email.value,
          password: password.value,
        })

        // 保存 token 到 localStorage
        if (response.data) {
          // localStorage.setItem('token', response.token)
          // localStorage.setItem('user', JSON.stringify(response.user))

          alert(`登入成功！ 權限為${response.data.name}`)
          // 重定向到首頁
          router.push('/dashboard')
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgb(242, 242, 242,.5);
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: darken(#dc6e31, 20%);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-login {
  width: 100%;
  padding: 0.75rem;
  background-color: #dc6e31;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login:hover:not(:disabled) {
  background-color: darken(#dc6e31, 5%);
}

.btn-login:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.signup-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  font-size: 0.9rem;
}

.signup-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
