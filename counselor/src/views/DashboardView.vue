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
      <DashboardSetting 
        :currentAction="currentAction" 
        :columns="currentColumns" 
        :data="currentData" 
        @add-item="addItem"
        :curretNav="navTabs.find(_n => _n.id === currentNav)"
        @cancel="cancel"
        @save="save"
      />
      <!-- <div class="addItem">New</div>
      <div class="tableContent">
        <DashboardSetting 
          :currentAction="currentAction" 
          :columns="columns" 
          :data="data" 
          :curretNav="navTabs.find(_n => _n.id === currentNav)"
          @cancel="cancel"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'  
import { getTopics, getNews, getAllStaff, addTopics, removeTopics, updateTopics } from '@/apis'
import api from '@/axios'
import { h, defineComponent } from 'vue'
import { NDataTable, NButton, useMessage } from 'naive-ui'
import DashboardSetting from '@/components/DashboardSetting.vue'


defineOptions({
  name: 'DashboardView'
})

const router = useRouter()
const currentAction = ref('normal')
const currentNav = ref('topics')
const currentColumns = ref([])
const currentData = ref([])

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

// 1. 主題定義表格欄位配置 (Columns)
const TopicsColumns = [
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
    title: '類別',
    key: 'label'
  },
  {
    title: '描述',
    key: 'description'
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
                  handleRemove(row)
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

// 消息
const NewsColumns = [
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
    title: '主題',
    width: 60,
    key: 'title'
  },
  {
    title: '內容',
    width: 80,
    key: 'content'
  },
  {
    title: '連結',
    width: 60,
    key: 'link'
  },
  {
    title: '編輯者',
    width: 80,
    key: 'titleName'
  },
  {
    title: '服務',
    width: 60,
    key: 'serviceName'
  },
  {
    title: '狀態',
    width: 60,
    key: 'status'
  },
  {
    title: '操作',  
    key: 'actions',
    width: 100,
    fixed: 'right',
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
                   handleRemove(row)
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

// 團隊
const TeamColumns = [
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
    title: '名稱',
    width: 60,
    key: 'name'
  },
  {
    title: '信箱',
    width: 60,
    key: 'email'
  },
  {
    title: '密碼',
    width: 60,
    key: 'password'
  },
  {
    title: '職務',
    width: 60,
    key: 'title'
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
                   handleRemove(row)
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

const fetchTopics = async () => {
    currentData.value = []
    try {
      const response = await getTopics()
      currentData.value = response.data

    } catch (error) {
      console.error("Error fetching topics data:", error)
    }
  }
const fetchNews = async () => {
  currentData.value = []
    try {
      const response = await getNews()
      currentData.value = response.data

    } catch (error) {
      console.error("Error fetching news data:", error)
    }
  }
const fetchStaff = async () => {
  currentData.value = []
    try {
      const response = await getAllStaff()
      currentData.value = response.data

    } catch (error) {
      console.error("Error fetching staff data:", error)
    }
  }

const chgNav = (nav) => {
  currentNav.value = nav.id
  switch (nav.id) {
    case 'topics':
      fetchTopics()
      currentColumns.value = TopicsColumns
      break;
    case 'news':
      fetchNews()
      currentColumns.value = NewsColumns
      break;
    case 'team':
      fetchStaff()
      currentColumns.value = TeamColumns
      break;
    default:
      break;
  }
  currentAction.value = 'normal'
}

const handleEdit = async (data) => {
  currentAction.value = 'edit'
  console.log('data:: ', data)
  console.log(`編輯:: ${currentAction.value} ${currentNav.value}`)
  currentData.value = data
  // switch (currentNav.value) {
  //   case 'topics':
  //     const data = {
  //       name: data.name,
  //       label: data.label,
  //       description: data.description
  //     }
  //     await updateTopics(data)
  //     break;
  //   case 'news':
  //     break;
  //   case 'team':
  //     break;
  //   default:
  //     break;
  // } 
}

const handleRemove = async (data) => {
  // console.log('data:: ', data)
  // console.log(`刪除:: ${data} ${currentNav.value}`)

  switch (currentNav.value) {
    case 'topics':
      const deleteData = {
        name: data.name
      }
      await removeTopics(deleteData)
      fetchTopics()
      break;
    case 'news':
      api.delete(`/news/${data.id}`)
        .then(() => {
          fetchNews()
        })
        .catch((error) => {
          console.error("Error deleting news:", error)
        })
      break;
    case 'team':
      api.delete(`/staff/${data.id}`)
        .then(() => {
          fetchStaff()
        })
        .catch((error) => {
          console.error("Error deleting staff:", error)
        })
      break;
    default:
      break;
  }

}

const addItem = async (child) => {
  currentAction.value = 'add'
  console.log(`新增:: ${child}`)
}

const cancel = () => {
  currentAction.value = 'normal'
  currentData.value = []
  switch (currentNav.value) {
    case 'topics':
      fetchTopics()
      break;
    case 'news':
      fetchNews()
      break;
    case 'team':
      fetchStaff()
      break;
    default:
      break;
  }
}

const save = async (child) => {
  console.log('currentNav:: ', currentNav.value)
  console.log('currentAction:: ', currentAction.value)
  switch (currentNav.value) {
    case 'topics':
      console.log('save:: ', child)
      const { name, label, description } = child
      const api = currentAction.value === 'edit' ? updateTopics : addTopics
      // const { name, label, description, title, content, notice, service, images, link } = child
      await api({
        name,
        label,
        description
      })
      fetchTopics()
      break;
    case 'news':
      fetchNews()
      break;
    case 'team':
      fetchStaff()
      break;
    default:
      break;
  }
  currentAction.value = 'normal'
}

 onMounted(() => {
    fetchTopics()
    currentColumns.value = TopicsColumns
  })

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
