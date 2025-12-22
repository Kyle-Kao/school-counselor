<template>
  <div class="dash-container">
    <div class="nav">
      <div class="account">xxx@gmail.com</div>
      <div class="functionDiv">
        <ul>
          <li 
            v-for="nav in navTabs" 
            :key="nav.id"
            :class="currentNav === nav.id? 'active': ''"
            @click="chgNav(nav)"
          >
            {{ nav.value }}
          </li>
        </ul>
      </div>
      <div class="logout">Logout</div>
    </div>

    <div class="rightContent">
      <div class="addItem">New</div>
      <div class="tableContent">
        <n-data-table
          v-if="currentAction === 'normal'"
          :columns="columns"
          :data="data"
          :pagination="{ pageSize: 10 }"
          :bordered="false"
        />
        <div v-else>
          <div class="newsDiv">
            <div class="inputArea">
              <label for="title">Title*</label>
              <input type="text" placeholder="最多25字，超過顯示...">
            </div>
            <div class="inputArea">
              <label for="title">Content*</label>
              <input type="text" placeholder="最多25字，超過顯示...">
            </div>
            <div class="inputArea">
              <label for="title">Notice*</label>
              <input type="text" placeholder="最多25字，超過顯示...">
            </div>
            <div class="inputArea">
              <label for="title">Service*</label>
              <input type="text" placeholder="最多25字，超過顯示...">
            </div>
            <div class="inputArea">
              <label for="title">Images*</label>
              <input type="file" placeholder="最多25字，超過顯示...">
            </div>
            <div class="inputArea">
              <label for="title">Link*</label>
              <input type="text" placeholder="最多25字，超過顯示...">
            </div>

            <div class="btnBox">
              <div class="save">Save</div>
              <div class="cancel" @click="cancel">Cancel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'
import { h, defineComponent } from 'vue'
import { NDataTable, NButton, useMessage } from 'naive-ui'

defineOptions({
  name: 'DashboardView'
})

const router = useRouter()
const currentAction = ref('normal')
const currentNav = ref('topics')

const navTabs = [
  {
    id: 'topics',
    value: '伴主題 Topics'
  },
  {
    id: 'news',
    value: '伴消息 News'
  },
  {
    id: 'team',
    value: '伴團隊 Team'
  },
]

// 1. 定義表格欄位配置 (Columns)
const columns = [
  {
    title: '#', // 欄位名稱
    type: 'index', // ✅ 關鍵：這會自動生成從 1 開始的序號
    width: 60,
    align: 'center',
    render: (_, index) => {
      return h('span', index + 1)
    }
  },
  {
    title: '姓名',
    key: 'name'
  },
  {
    title: '年齡',
    key: 'age'
  },
  {
    title: '地址',
    key: 'address'
  },
  {
    title: '操作',
    key: 'actions',
    // 使用 h 函式渲染自定義按鈕
    render (row) {
      return h(
        'div',
        { style: { display: 'flex', gap: '8px' } }, 
        [
          // 編輯按鈕
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => handleEdit(row)
            },
            { default: () => 'Edit' }
          ),
          // 刪除按鈕
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              type: 'error', // 使用紅色警示
              size: 'small',
              onClick: () => {
                if(confirm(`確定要刪除 ${row.name} 嗎？`)) {
                   console.log('執行刪除邏輯', row.key)
                }
              }
            },
            { default: () => 'Del' }
          )
        ]
      )
    }
  }
]

// 2. 準備數據 (Data)
const data = [
  { key: 0, name: '張三', age: 32, address: '台北市信義區' },
  { key: 1, name: '李四', age: 28, address: '台中市西屯區' }
]

const chgNav = (nav) => {
  currentNav.value = nav.id
}

const handleEdit = (data) => {
  currentAction.value = 'edit'
  console.log(`編輯:: ${data.name} ${currentAction.value}`)
}

const cancel = () => {
  currentAction.value = 'normal'
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

  .tableContent{
    max-width: 70%;
    width: 100%;
  }

  .newsDiv{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .inputArea{
    display: flex;
    flex-direction: column;
    label{
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 18px;
    }
    input{
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
    }
  }

  .btnBox{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    &>div{
      border-radius: 5px;
      padding: 5px 20px;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
    }
    .save{
      background-color: #dc6e31;
    }
    .cancel{
      background-color: #6C757D;
    }
  }
</style>
