<template>
  <div class="news-container">
    <div class="title">伴消息</div>
    <div class="content">
      <div class="tabBox">
        <div 
          v-for="item in tabs" 
          :key="item.id"
          class="tab"
          :class="{ active: activeTab === item.id }"
          @click="setActive(item.id)"
        >
          {{ item.name }}
          <br>
          {{ item.title }}
        </div>
      </div>
      <div class="content-des">更多即時課程及活動訊息請上本所</div>
      <div class="content-detail">
        <div class="time">2025.04.25 | 行政公告</div>
        <div class="newsTitle">國軍心理健康照護方案 即日起上路！</div>
      </div>
      <div class="content-detail">
        <div class="time">2025.04.25 | 行政公告</div>
        <div class="newsTitle">國軍心理健康照護方案 即日起上路！</div>
      </div>
      <div class="content-detail">
        <div class="time">2025.04.25 | 行政公告</div>
        <div class="newsTitle">國軍心理健康照護方案 即日起上路！</div>
      </div>
      <div class="content-detail">
        <div class="time">2025.04.25 | 行政公告</div>
        <div class="newsTitle">國軍心理健康照護方案 即日起上路！</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'

defineOptions({
  name: 'NewsView'
})

const router = useRouter()

const tabs = ref([
  { id: 'all', name: '全部' },
  { id: 'register', name: '報名訊息' },
  { id: 'news', name: '活動動態' },
  { id: 'article', name: '主題文章' },
  { id: 'announcement', name: '行政公告' }
])

const activeTab = ref('all')

const setActive = (id) => {
  activeTab.value = id
}

</script>

<style scoped lang="scss">
  .news-container {
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
      margin-bottom: 20px;
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
    &-des{
      color: #555;
      margin-bottom: 20px;
    }
    &-detail{
      width: 100%;
      background-color: white;
      border-radius: 4px;
      padding: 16px 24px;
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.3s;
      border-color: transparent;
      &:hover{
        border: 1px solid #dc6e31;
      }
      .time{
        color: #dc6e31;
        margin-bottom: 8px;
      }
      .newsTitle{
        color: #555;
      }
    }
  }

  .tabBox{
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    .tab{
      padding: 4px 16px;
      background-color: white;
      border-radius: 4px;
      color: #555;
      cursor: pointer;
      border: 1px solid #ddd;
      &.active{
        background-color: #dc6e31;
        color: white;
      }
    }
  }
</style>
