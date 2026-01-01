<template>
  <main>
    <div class="home-container">
      <div class="title">伴消息</div>
      <div class="content">
        <div class="subTitle">成立緣由</div>
        <div class="subTitle orange">“一個人或許可以走得很快，但一群人可以走得很遠。”</div>
        <div class="imgBox">
          <div class="img">
            <img src="https://www.companion.com.tw/images/img_together.png" alt="">
          </div>
          <div class="des">
            <span>在生命的長河裡，每一個人都是獨一無二的個體，但也都無法脫離人群而獨自生活，在每個平和靜謐的歲月裡，我們希望有人共享美好時光；而在挫折困頓徬徨的時候，我們期待有人能夠理解、關懷、支持、陪伴，一起共度難關。</span>
            <span>這是我們創立『伴』心理諮商所的初心，期盼在人生中每個不容易處，都有合適的人陪伴共度，同行一段，期許每個人都能活得輕鬆自在、自信優雅，活出屬於自己的精彩！</span>
          </div>
        </div>

        <div class="subTitle">服務宗旨</div>
          <div class="contentBox">
            <div class="content">
              <div class="content__title">陪伴</div>
              <div class="content__des">有人說「陪伴是最長情的告白」，這讓我們深刻地理解到，陪伴並非只有責任和義務，而是可以給出真正的理解、尊重與祝福，讓每個靈魂走自己的路。</div>
            </div>
            <div class="content">
              <div class="content__title">成長</div>
              <div class="content__des">願意嘗試對自己有更多、更寬廣、更深刻的了解及接納；學習在面對相同的情境下，發展出不同的態度與因應之道，觸發改變及成長的契機。</div>
            </div>
            <div class="content">
              <div class="content__title">療癒</div>
              <div class="content__des">期盼來到這裡的每個人，心靈都可以強大到足以自主選擇及面對生命長河裡的各種試煉，也能承接與體驗所有可能的痛苦，並開始走上自我療癒之旅。</div>
            </div>
          </div>
      </div>
    </div>

    <!-- 測試 -->
    <div class="btnBox">
      <div class="btn" @click="setInput('topic')">取得主題資料</div>
      <div class="btn" @click="setInput('news')">取得新聞資料</div>
      <div class="btn" @click="setInput('profile')">取得諮商師資料</div>
      <div class="btn" @click="setInput('serviceTopic')">取得服務對象與議題資料</div>
    </div>
    <div class="mainTextArea">
      <div class="input">
        <!-- <input type="textarea"> -->
        <textarea name="input" id="input" v-model="currentInput"></textarea>
      </div>
      <div class="btn" @click="getOutput">送出</div>
      <div class="output">
        <json-viewer
          :value="jsonData"
          :expand-depth="3"
          copyable
          boxed
          sort
        />
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue'
  import { runSql, getTopics, getNews, getProfile, getServiceTopic, welcome } from '@/apis'
  import { onMounted } from 'vue'

  defineOptions({
    name: 'HomeView'
  })

  const jsonData = ref({})

  const currrentApi = ref('topic')
  const currentInput = ref('')

  const fetchWelcome = async () => {
    try {
      await welcome()
    } catch (error) {
      console.error("Error fetching test data:", error)
    }
  }

  const fetchRunSql = async (sqlText) => {
    try {
      await runSql({ sql: sqlText })
    } catch (error) {
      console.error("Error fetching test data:", error)
    }
  }

//   const fetchRunSql = async () => {
//   try {
//     const response = await fetch('http://localhost:5173/api/api/general/query', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         sql: 'SELECT * FROM "Topics";' 
//       })
//     });
    
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching test data:", error);
//   }
// };

  const setInput = (api) => {
    currrentApi.value = api
    switch (api) {
      case 'topic':
        currentInput.value = 'SELECT * FROM "Test"."Topics";'
      break;
      case 'news':
        currentInput.value = `
        SELECT 
          n."Id",
          n."Title",
          n."Content",
          n."Notice",
          n."Link",
          n."CreateTime",
          n."UpdateTime",
          n."TitleName",
          n."ServiceName",
          s."Label" AS "ServiceLabel",  
          n."Status",
          n."Img"
        FROM "Test"."News" AS n
        LEFT JOIN "Test"."Services" AS s ON n."ServiceName" = s."Name";        
        `
        // currentInput.value = `
        // SELECT 
        //   n."Id",
        //   n."Title",
        //   n."Content",
        //   n."Notice",
        //   n."Link",
        //   n."CreateTime",
        //   n."UpdateTime",
        //   n."TitleName",
        //   n."ServiceName",
        //   s."Label" AS "ServiceLabel",  
        //   n."Status",
        //   n."Img"
        // FROM "News" AS n
        // LEFT JOIN "Services" AS s ON n."ServiceName" = s."Name";
        
        // (透過 Left Join，將 News (新聞) 與 Services (服務) 兩個表格關聯起來，並取得服務的標籤 (Label) 欄位。)
        // `
      break;
      case 'profile':
        currentInput.value = `
        SELECT 
          p."Id",
          p."Certification",
          p."Education",
          p."Experience",
          p."Description",
          s."Name" AS "StaffName",
          s."Email" AS "StaffEmail",
          s."Title" AS "StaffTitle",
          s."Photo" AS "StaffPhoto"
        FROM "Test"."CounselorProfiles" AS p 
        LEFT JOIN "Test"."Staff" AS s ON p."Id" = s."Id" 
        WHERE p."Id" = '98765432-10fe-dcba-9876-543210fedcba';        
      `
      //   currentInput.value = `
      //   SELECT 
      //     p."Id",
      //     p."Certification",
      //     p."Education",
      //     p."Experience",
      //     p."Description",
      //     s."Name" AS "StaffName",
      //     s."Email" AS "StaffEmail",
      //     s."Title" AS "StaffTitle",
      //     s."Photo" AS "StaffPhoto"
      //   FROM "Profile" AS p 
      //   LEFT JOIN "Staff" AS s ON p."Id" = s."Id" 
      //   WHERE p."Id" = '98765432-10fe-dcba-9876-543210fedcba';
        
      //   (透過Left Join，加上了 WHERE 條件過濾單筆資料)
      // `
      break;
      case 'serviceTopic':
        currentInput.value = `
        SELECT 
          s."Name",
          s."Label",
          s."Target",
          s."Type",
          t."Label" AS "topicLabel",
          t."Description" AS "topicDescription"
        FROM "Test"."Services" AS s
        INNER JOIN "Test"."ServiceTopic" AS st ON s."Name" = st."ServiceName"
        INNER JOIN "Test"."Topics" AS t ON st."TopicName" = t."Name";
        `
        // currentInput.value = `
        // SELECT 
        //   s."Name",
        //   s."Label",
        //   s."Target",
        //   s."Type",
        //   t."Label" AS "topicLabel",
        //   t."Description" AS "topicDescription"
        // FROM "Services" AS s
        // INNER JOIN "ServiceTopics" AS st ON s."Name" = st."ServiceName"
        // INNER JOIN "Topics" AS t ON st."TopicName" = t."Name";


        // (多對多的關聯查詢。透過中間表 ServiceTopic 將 Service (服務) 與 Topic (主題) 連接起來)
        // `
      break;
    }
  }

  const getOutput = async () => {
    try {
      let response
      const data = await runSql({ sql: currentInput.value })
      response = { data: data.data }
      // switch (currrentApi.value) {
      //   case 'topic':
      //     const data = await runSql({ sql: currentInput.value })
      //     response = { data: data.data }
      //     // response = await getTopics()
      //   break;
      //   case 'news':
      //     response = await getNews()
      //   break;
      //   case 'profile':
      //     response = await getProfile({id: '98765432-10fe-dcba-9876-543210fedcba'})
      //   break;
      //   case 'serviceTopic':
      //     response = await getServiceTopic()
      //   break;
      // }
      jsonData.value = response.data
    } catch (error) {
      console.error("Error fetching output data:", error)
    }
  }

  onMounted(() => {
    fetchWelcome()
    // fetchRunSql()
  })

</script>

<style scoped lang="scss">
  .home-container {
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

  .mainTextArea {
    margin-top: 2rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem; 
    width: 80%;
    margin: 20px auto;
    .input{
      align-self: stretch;
      textarea{
        height: 100%;
        width: 100%;
        vertical-align: top;
        padding: 12px;
      }
    }
    .input, .output {
      flex: 1;
    }
    .btn{
      border: 2px solid #dc6e31;
      border-radius: 4px;
      padding: 5px 20px;
      cursor: pointer;
      color: #fff;
      background-color: #dc6e31;
    }
  }

  .subTitle{
    font-size: 32px;
    color: #555;
    margin-bottom: 10px;
    &.orange{
      color: #dc6e31;
      font-size: 28px;
      font-weight: 300;
    }
  }

  .imgBox{
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 10px 0 20px;
    .img{
      flex: 25%;
    }
    .des{
      flex: 75%;
    }
  }

  .contentBox{
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    .content{
    border: 1px solid #dee2e6;
    background-color: #fff;
    border-radius: 4px;
    &__title{
      font-size: 24px;
      color: #dc6e31;
    }
    &__des{
      font-size: 16px;
      line-height: 1.6;
      color: #555;
      padding-top: 10px;
      font-weight: 300;
    }
  }
  }

  .btnBox{
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px auto;
    justify-content: center;
    .btn{
      border: 2px solid #dc6e31;
      border-radius: 4px;
      padding: 5px 20px;
      cursor: pointer;
      color: #fff;
      background-color: #dc6e31;
    }
  }  

  @media (max-width: 768px) {
    .imgBox{
      flex-direction: column;
    }
    .contentBox{
      flex-direction: column;
    }
    .btnBox{
      flex-direction: column;
      .btn{
        width: 100%;
        text-align: center;
      }
    }
    .mainTextArea{
      width: 100%;
      flex-direction: column;
      &>div{
        width: 100%;
      }
    }
  }
</style>
