<template>
  <div class="teams-container">
    <div class="title">諮商師團隊</div>
    <div class="content">
      <div class="tabBox">
        <!-- <div 
          v-for="item in tabs" 
          :key="item.id"
          class="tab"
          :class="{ active: activeTab === item.id }"
          @click="setActive(item.id)"
        >
          {{ item.title }}
          <br>
          {{ item.name }}
        </div> -->
        <div 
          v-for="item in currentData" 
          :key="item.id"
          class="tab"
          :class="{ active: activeTab === item.id }"
          @click="setActive(item.id)"
        >
          {{ item.title }}
          <br>
          {{ item.name }}
        </div>
      </div>
      <div class="profileBox">
        <div class="left">
          <div class="img">
            <img :src="currentProfile.staffPhoto" alt="profile">
          </div>
          <div class="name">
            <span>諮商心理師</span>
            {{ currentProfile.staffName }}
          </div>
          <ul class="info">
            <li>{{ currentProfile.certification }}</li>
            <li>諮商心理師<small> 諮心字第000451號</small></li>
            <li>諮商心理師<small> 諮心字第000451號</small></li>
            <li></li>
          </ul>
          <div class="expert">
            專長
            <div class="badgeBox">
              <!-- <span>{{ currentProfile.description }}</span> -->
              <span>心理評估</span>
              <span>兒少發展</span>
              <span>情緒壓力</span>
              <span>悲傷失落</span>
              <span>人際關係</span>
              <span>生涯規劃</span>
            </div>
          </div>
        </div>
        <!-- <div class="left">
          <div class="img">
            <img src="https://www.companion.com.tw/images/img_counselor1_b.jpg" alt="profile">
          </div>
          <div class="name">
            <span>諮商心理師兼所長</span>
            張育德
          </div>
          <ul class="info">
            <li>諮商心理師<small> 諮心字第000451號</small></li>
            <li>諮商心理師<small> 諮心字第000451號</small></li>
            <li></li>
          </ul>
          <div class="expert">
            專長
            <div class="badgeBox">
              <span>心理評估</span>
              <span>兒少發展</span>
              <span>情緒壓力</span>
              <span>悲傷失落</span>
              <span>人際關係</span>
              <span>生涯規劃</span>
            </div>
          </div>
        </div> -->
        <div class="right">
          <div class="description">
            <div>{{ currentProfile.description }}</div>
            <!-- <div>喜歡玩樂、旅行、人跟人之間情感的流動，也喜歡自己獨處時的靜好。長期從事兒童、青少年及父母親職教養等工作。在孩子的眼中，是一個童心未泯，很好玩很稱職的大朋友；而在父母家長的心目中，是一個意志堅定，願意在自己人生旅程中風雨同行，真誠溫暖的陪伴者。</div>
            <div>雖知悲歡聚散離合，生命起落無常，但還是決心選擇相信「每一天都是美好的一天！」期許自己永遠都能是一個充滿勇氣、心懷慈悲的諮商師！</div> -->
          </div>
          <div class="experience">
            <ul class="exp">
              學歷
              <li>{{ currentProfile.education }}</li>
              <!-- <li>國立高雄師範大學 輔導與諮商研究所 碩士</li> -->
            </ul>
            <!-- <ul class="exp">
              現職
              <li>高雄市陪著你玩優質關係經營協會 理事長</li>
              <li>公私立機構創傷復原服務、親職教育執行方案 諮商心理師</li>
              <li>高雄市家庭教育中心 外聘督導</li>
              <li>高雄市中小學 專、兼任輔導教師督導</li>
            </ul> -->
            <ul class="exp">
              經歷
              <li>{{ currentProfile.experience }}</li>
              <!-- <li>中國泉州遊戲養育親職教育工作坊 訓練講師暨督導</li>
              <li>馬來西亞生命線結構式遊戲治療 培訓助理教師暨督導</li>
              <li>美和科技大學國際潛能開發中心 特約諮商心理師</li>
              <li>屏東縣校外會 特約諮商心理師</li> -->
            </ul>
            <!-- <ul class="exp">
              著作
              <li>結構式遊戲治療之個案報告彙整：概念化實務 </li>
              <li>了解、傾聽、陪伴－結構式遊戲治療之基本理念與實務  </li>
            </ul> -->
          </div>
        </div>
        <!-- <div class="right">
          <div class="description">
            <div>喜歡玩樂、旅行、人跟人之間情感的流動，也喜歡自己獨處時的靜好。長期從事兒童、青少年及父母親職教養等工作。在孩子的眼中，是一個童心未泯，很好玩很稱職的大朋友；而在父母家長的心目中，是一個意志堅定，願意在自己人生旅程中風雨同行，真誠溫暖的陪伴者。</div>
            <div>雖知悲歡聚散離合，生命起落無常，但還是決心選擇相信「每一天都是美好的一天！」期許自己永遠都能是一個充滿勇氣、心懷慈悲的諮商師！</div>
          </div>
          <div class="experience">
            <ul class="exp">
              學歷
              <li>國立高雄師範大學 輔導與諮商研究所 碩士</li>
            </ul>
            <ul class="exp">
              現職
              <li>高雄市陪著你玩優質關係經營協會 理事長</li>
              <li>公私立機構創傷復原服務、親職教育執行方案 諮商心理師</li>
              <li>高雄市家庭教育中心 外聘督導</li>
              <li>高雄市中小學 專、兼任輔導教師督導</li>
            </ul>
            <ul class="exp">
              經歷
              <li>中國泉州遊戲養育親職教育工作坊 訓練講師暨督導</li>
              <li>馬來西亞生命線結構式遊戲治療 培訓助理教師暨督導</li>
              <li>美和科技大學國際潛能開發中心 特約諮商心理師</li>
              <li>屏東縣校外會 特約諮商心理師</li>
            </ul>
            <ul class="exp">
              著作
              <li>結構式遊戲治療之個案報告彙整：概念化實務 </li>
              <li>了解、傾聽、陪伴－結構式遊戲治療之基本理念與實務  </li>
            </ul>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getStaff, getProfile } from '@/apis'
import { onMounted, computed } from 'vue'


defineOptions({
  name: 'TeamsView'
})

// const router = useRouter()

const tabs = ref([
  { id: '1', name: '張育德', title: '諮商心理師兼所長' },
  { id: '2', name: '徐秀宜', title: '臨床心理師' },
  { id: '3', name: '陳玟如', title: '諮商心理師' },
  { id: '4', name: '謝雅惠', title: '諮商心理師' },
  { id: '5', name: '劉秀菊', title: '諮商心理師' }
])

const activeTab = ref("98765432-10fe-dcba-9876-543210fedcba")
const currentData = ref([])
const currentProfile = ref({})

const setActive = (id) => {
  activeTab.value = id
  fetchProfile(id)
}

const fetchStaff = async () => {
    try {
      const response = await getStaff()
      currentData.value = response.data

    } catch (error) {
      console.error("Error fetching staff data:", error)
    }
  }

const fetchProfile = async (id) => {
    try {
      const parmas = {
        id,
      }
      const response = await getProfile(parmas)
      currentProfile.value = response.data
    } catch (error) {
      console.error("Error fetching profile data:", error)
    }
  }

  onMounted(() => {
    fetchStaff()
    fetchProfile(activeTab.value)
  })

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
    align-items: flex-start;
    flex-direction: column;
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
      text-align: center;
      cursor: pointer;
      border: 1px solid #ddd;
      &.active{
        background-color: #dc6e31;
        color: white;
      }
    }
  }

  .profileBox{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    .left{
      flex: 30%;
    }
    .right{
      flex: 70%;
    }
  }

  @media (max-width: 768px) {
    .tabBox{
      flex-wrap: wrap;
      .tab{
        flex: 45%;
      }
    }
  }
</style>
