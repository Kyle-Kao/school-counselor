<template>
  <div class="dashboardSetting">
    <div class="addItem" @click="handleAddItem">New</div>
    <div class="tableContent">
      <h1>{{ props.curretNav.value }}</h1>
      <n-data-table
        v-if="props.currentAction === 'normal'"
        :columns="columns"
        :data="data"
        :pagination="{ pageSize: 10 }"
        :bordered="false"
      />
      <div v-else>
        <!-- Topics -->
        <div v-if="props.curretNav.id === 'topics'" class="newsDiv">
          <div class="inputArea">
            <label for="title">Name*</label>
            <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.name" :disabled="currentAction === 'edit'">
          </div>
          <div class="inputArea">
            <label for="title">Label*</label>
            <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.label">
          </div>
          <div class="inputArea">
            <label for="title">Description*</label>
            <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.description">
          </div>

          <div class="btnBox">
            <div class="save" @click="handleSave">Save</div>
            <div class="cancel" @click="cancel">Cancel</div>
          </div>
      </div>
      <!-- News -->
      <div v-else-if="props.curretNav.id === 'news'" class="newsDiv">
          <div class="inputArea">
            <label for="title">Title*</label>
            <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.title">
          </div>
          <div class="inputArea">
            <label for="title">Content*</label>
            <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.content">
          </div>
          <div class="inputArea">
            <label for="title">Notice*</label>
            <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.notice">
          </div>
          <div class="inputArea">
            <label for="title">Service*</label>
            <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.service">
          </div>
          <div class="inputArea">
            <label for="title">Images*</label>
            <input type="file" accept="image/*" ref="fileInput" @change="handleFileChange">
            <!-- <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.images"> -->
          </div>
          <div class="inputArea">
            <label for="title">Link*</label>
            <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.link">
          </div>

          <div class="btnBox">
            <div class="save" @click="handleSave">Save</div>
            <div class="cancel" @click="cancel">Cancel</div>
          </div>
      </div>
      <!-- Team -->
      <div v-else class="newsDiv">
          <div class="inputArea">
            <label for="title">Title*</label>
            <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.title">
          </div>
          <div class="inputArea">
            <label for="title">Content*</label>
            <input type="text" placeholder="最多25字，超過顯示..." v-model="formData.content">
          </div>

          <div class="btnBox">
            <div class="save" @click="handleSave">Save</div>
            <div class="cancel" @click="cancel">Cancel</div>
          </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { h, defineComponent } from 'vue'
import { NDataTable, NButton, useMessage } from 'naive-ui'

const props = defineProps({
  curretNav: {
    type: Object,
    required: true
  },
  currentAction: {
    type: String,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
});

console.log('data in DashboardSetting:', props.data);

watch(
  () => props.data,
  (newVal) => {
    if (props.currentAction === 'edit' && newVal) {
      // 如果傳入的是陣列（通常是從列表點擊編輯時傳入的那一筆物件）
      // 或是直接傳入單一物件，進行解構賦值
      const source = Array.isArray(newVal) ? newVal[0] : newVal;
      if (source) {
        formData.value = {
          ...formData.value,
          ...source
        };
      }
    }
  },
  { immediate: true, deep: true }
);

const formData = ref({
  name:'',
  label:'',
  description:'',
  title: '',
  content: '',
  notice: '',
  service: '',
  images: '',
  link: '',
});

const emit = defineEmits(['cancel', 'add-item', 'save']); 

defineOptions({
  name: 'DashboardSetting'
})

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.images = file;
  }
};

const cancel = () => {
  emit('cancel');
  resetForm();
};

const handleSave = () => {
  emit('save', { ...formData.value });
  resetForm();
};

const handleAddItem = () => {
  emit('add-item', props.curretNav.id);
  resetForm();
};

const resetForm = () => {
  formData.value = {
    name:'',
    label:'',
    description:'',
    title: '',
    content: '',
    notice: '',
    service: '',
    images: '',
    link: '',
  };
};
</script>

<style scoped lang="scss">
  .dashboardSetting{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
  }

  .addItem{
      background-color: #dc6e31;
      border-radius: 10px;
      color: #fff;
      padding: 10px 20px;
      cursor: pointer;
    }

  .tableContent{
    max-width: 100%;
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