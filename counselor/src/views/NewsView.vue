<template>
  <div class="news-container">
    <div class="title">伴消息</div>
    <div class="content">
      <div class="tabBox">
        <!-- <div 
          v-for="item in tabs" 
          :key="item.id"
          class="tab"
          :class="{ active: activeTab === item.id }"
          @click="setActive(item.id)"
        >
          {{ item.name }}
          <br>
          {{ item.title }}
        </div> -->
        <div 
          v-for="item in currentService" 
          :key="item.id"
          class="tab"
          :class="{ active: activeTab === item.name }"
          @click="setActive(item.name)"
        >
          <!-- {{ item.name }}
          <br> -->
          {{ item.label }}
        </div>
      </div>
      <div class="content-des">更多即時課程及活動訊息請上本所</div>

      <div class="content-detail" v-for="(news, index) in filteredData" :key="index" @click="getDetail(news)">
        <div class="time">{{ news.createTime }} | {{ news.serviceLabel }}</div>
        <div class="newsTitle">{{ news.title }}</div>
      </div>

      <!-- <div class="content-detail">
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
      </div> -->
    </div>

  </div>

  <div class="mack" v-if="onMask" @click="resetMask">
    <div class="maskCard">
      <div class="time">{{ currentDetail.createTime }} | {{ currentDetail.serviceLabel }}</div>
      <div>link: {{ currentDetail.link }}</div>
      <div class="newsTitle">{{ currentDetail.title }}</div>
      <div class="newsDes">{{ currentDetail.description }}</div>
      <div>
        文章內容：
        {{ currentDetail.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getNews, getService } from '@/apis'
import { onMounted, computed } from 'vue'

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

const allNews = ref([])
const currentData = ref([])
const currentService = ref([])
const currentDetail = ref({})
const onMask = ref(false)

const activeTab = ref('individual')

const setActive = (id) => {
  activeTab.value = id
  currentData.value = currentData.value.filter(item => item.name === id)
}

const getDetail = (news) => {
  window.scrollTo(0,0)
  onMask.value = true
  currentDetail.value = news
  console.log('click', news)
}

const resetMask = () => {
  onMask.value = false
  currentDetail.value = {}
}

const filteredData = computed(() => {
  return allNews.value.filter(item => item.serviceName === activeTab.value)
})

 const fetchNews = async () => {
    try {
      const params = {
        category: activeTab.value === 'all' ? undefined : activeTab.value
      }
      const response = await getNews(params)
      allNews.value = response.data

    } catch (error) {
      console.error("Error fetching news data:", error)
    }
  }

 const fetchService = async () => {
    try {
      const response = await getService()
      currentService.value = response.data

    } catch (error) {
      console.error("Error fetching news data:", error)
    }
  }

  onMounted(() => {
    fetchNews()
    fetchService()
  })

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
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    .tab{
      padding: 4px 16px;
      background-color: white;
      border-radius: 4px;
      color: #555;
      cursor: pointer;
      border: 1px solid #ddd;
      align-self: stretch;
      white-space: nowrap;
      &.active{
        background-color: #dc6e31;
        color: white;
      }
    }
  }

  .mack{
    position: absolute;
    width: 100dvw;
    height: 100dvh;
    left: 0;
    top: 0;
    z-index: 9999;
    background-color: rgba(0,0,0,0.5);
  }

  .maskCard{
    position: absolute;
    width: 600px;
    height: 50%;
    background-color: #fff;
    border-radius: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 20px;
  }

  @media (max-width: 768px) {
    .content{
      padding: 0;
      .tabBox{
        .tab{
          flex: 45%;
        }
      }
    }
    .maskCard{
      width: 90%;
      height: auto;
    }
  }
</style>
