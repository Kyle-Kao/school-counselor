<template>
  <div class="app-layout" :class="{ 'withoutpadding': isDashboard }">
    <AppHeader />
    <main class="app-main">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useRoute } from 'vue-router' 
import { computed } from 'vue'

defineOptions({
  name: 'AppLayout'
})

const route = useRoute()

const isDashboard = computed(() => {
    return route.path === '/dashboard'
  })

</script>

<style scoped lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &.withoutpadding {
    .app-main {
      padding: 0;
    }
  }
}

.app-main {
  flex: 1;
  padding: 2rem 1rem;
}

@media (min-width: 768px) {
  .app-main {
    padding: 3rem 2rem;
  }
}
</style>
