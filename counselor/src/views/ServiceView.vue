<template>
  <div class="teams-container">
    <div class="title">伴服務</div>
    <div class="content">
      <div class="subTitle">諮商與心理治療服務</div>
      <div class="imgBox imgBox-4">
        <div><img src="https://www.companion.com.tw/images/img_personal_01.jpg" alt=""></div>
        <div><img src="https://www.companion.com.tw/images/img_con_01.jpg" alt=""></div>
        <div><img src="https://www.companion.com.tw/images/img_adult_01.jpg" alt=""></div>
        <div><img src="https://www.companion.com.tw/images/img_family_01.jpg" alt=""></div>
      </div>
      <div class="subTitle orange">服務對象與處理議題</div>
      <div class="issueBox issueBox-3">
        <div class="issue">
          <div class="issue__title">成人</div>
          <div class="issue__des">{{ getType('individual') }}</div>
        </div>
        <!-- <div class="issue">
          <div class="issue__title">成人</div>
          <div class="issue__des">焦慮與憂鬱、情緒困擾、壓力、人際困擾、創傷、哀傷與失落、生涯發展與自我探索等。</div>
        </div> -->
        <div class="issue">
          <div class="issue__title">兒童</div>
          <div class="issue__des">{{ getType('child') }}</div>
        </div>
        <div class="issue">
          <div class="issue__title">青少年</div>
          <div class="issue__des">{{ getType('teen') }}</div>
        </div>
        <div class="issue">
          <div class="issue__title">父母、主要照顧者</div>
          <div class="issue__des">{{ getType('parent') }}</div>
        </div>
        <div class="issue">
          <div class="issue__title">伴侶、配偶</div>
          <div class="issue__des">{{ getType('couple') }}</div>
        </div>
      </div>
      <div class="subTitle orange">服務項目</div>
      <div class="issueBox issueBox-2">
        <div class="issue">
          <div class="issue__title">個別諮商</div>
          <div class="issue__des">透過個別諮商，您可以在專業心理師一對一的陪伴之下，對自己能有更深刻的覺察，增進對自我的了解；以溫柔、尊重與接納的個別晤談，讓您在生活的悲歡離合流淌之中，能穩定情緒、找回生命的力量，伴心理諮商所心理師會堅定地支持陪伴著您，一起重新看待理解生命裡頭所遭遇到的困境與挑戰。</div>
        </div>
        <div class="issue">
          <div class="issue__title">伴侶/婚姻諮商</div>
          <div class="issue__des">在茫茫人海中選擇了彼此，在如此親密的關係裡更需要溝通與經營。在伴侶/婚姻諮商中，心理師會引導您和伴侶觀看及探索，明白各自堅持或固著的相處模式，並在衝突中澄清相互的期待與需求。在安全隱密的環境中，看見對方最真實的想法與難處，繼而尋找出更圓融、更有愛，也更適合彼此的選擇。</div>
        </div>
        <div class="issue">
          <div class="issue__title">親子/家族諮商</div>
          <div class="issue__des">每個人的重要他人往往是自己最親近的家人，因為家庭與父母讓我們來到了這個世界，但親子/家族關係裡頭，也常常伴隨著牽掛、挫折與負荷。伴心理諮商所為您創造一個可以與父母、子女、家人共同對話與溝通的平台，透過心理師專業的提問和引導，讓親子和家人之間的關係，有了可以互相理解與接納的空間，迎來真實自在完整的自己與舒適的界限。</div>
        </div>
        <div class="issue">
          <div class="issue__title">兒童遊戲治療</div>
          <div class="issue__des">兒童與生俱來最自然的活動就是遊戲，從遊戲中兒童能學習到人我界線、表達情緒、探索與發現、滿足好奇心、主導權與控制感，且不論成功或失敗，都能獲得寶貴的學習成長經驗。伴心理諮商所提供兒童安全與接納的環境，以遊戲作為溝通媒介，讓兒童能夠自由自在的表達，在心理師尊重友善與溫暖的專注陪伴下，慢慢學會為自主決定，也為自己負責，這將成為兒童心中的養分，引發兒童正向成長的動力。</div>
      </div>
     </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getServiceTopic } from '@/apis'
import { useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'

const currentData = ref([])

defineOptions({
  name: 'ServiceView'
})

const fetchServices = async () => {
    try {
      const response = await getServiceTopic()
      currentData.value = response.data

      // individual 成人

    } catch (error) {
      console.error("Error fetching staff data:", error)
    }
  }

const getType = (type) => {
    // console.log(type, currentData.value.filter(item => item.type === type))
    return computed(() => currentData.value.filter(item => item.name === type).map(_c => _c.topicLabel).join('、')).value
  }

  onMounted(() => {
    fetchServices()
  })
</script>

<style scoped lang="scss">
  .teams-container {
    // max-width: 1320px;
    max-width: 1000px;
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
    max-width: 1000px;
    width: 100%;
    background-color: rgb(242, 242, 242,.5);
    border-radius: 4px;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .subTitle{
    font-size: 32px;
    color: #555;
    margin-bottom: 10px;
    &.orange{
      color: #dc6e31;
      font-size: 28px;
    }
  }

  .imgBox{
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 10px 0 20px;
    &>div{
      flex: 25%;
    }
  }

  .issueBox{
    display: grid;
    gap: 20px;
    margin-bottom: 30px;
    &.issueBox-3{
      grid-template-columns: repeat(3, minmax(300px, 1fr));
      grid-template-rows: repeat(2, 1fr);
    }
    &.issueBox-2{
      grid-template-columns: repeat(2, minmax(300px, 1fr));
      grid-template-rows: repeat(2, 1fr);
      .issue__des{
        border-top: 1px solid #6c757d;
      }
    }
  }

  .issue{
    &__title{
      font-size: 24px;
      color: #dc6e31;
      margin-bottom: 10px;
      font-weight: 300;
    }
    &__des{
      font-size: 16px;
      line-height: 1.6;
      color: #555;
      padding-top: 10px;
    }
  }
</style>
