<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/">
          <img src="https://www.companion.com.tw/images/logo_white.svg" alt="">
        </router-link>
      </div>
      <nav class="nav-menu">
        <router-link to="/">關於伴</router-link>
        <router-link to="/news">伴消息</router-link>
        <router-link to="/teams">伴團隊</router-link>
        <router-link to="/space">伴空間</router-link>
        <router-link to="/service">伴服務</router-link>
        <div class="auth-buttons">
          <span v-if="user" class="user-name">{{ user.name }}</span>
          <button v-if="!user" @click="goToLogin" class="btn-login">登入</button>
          <button v-else @click="logout" class="btn-logout">登出</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeader',
  setup() {
    const router = useRouter()
    const user = ref(null)

    onMounted(() => {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        user.value = JSON.parse(userStr)
      }
    })

    const goToLogin = () => {
      router.push('/login')
    }

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      user.value = null
      router.push('/')
    }

    return {
      user,
      goToLogin,
      logout,
    }
  },
}
</script>

<style scoped>
.app-header {
  background-color: #dc6e31;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-menu {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
  position: relative;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  &:before{
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    border-style: solid;
    border-width: 4px 0 4px 8px;
    border-color: transparent transparent transparent #fff;
    top: 50%;
    left: -15px;
    transform: translateY(-50%);
  }
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.user-name {
  color: #667eea;
  font-weight: 500;
}

.btn-login,
.btn-logout {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-login {
  background-color: transparent;
  border: 1px solid white;
  color: white;
}

.btn-logout {
  background-color: #e74c3c;
  color: white;
}

.btn-logout:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-menu {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
