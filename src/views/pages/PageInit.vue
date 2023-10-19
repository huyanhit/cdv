<template>
  <div class="init-page d-flex container-fluid">
    <div class="init-left">
      <v-select label="Layouts" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      <v-text-field
        v-model="firstName"
        :rules="rules"
        label="First name"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </div>
    <div class="change-content">
      <div class="header">header</div>
      <div class="siderbar-left">siderbar-left</div>
      <div class="siderbar-right">iderbar-right</div>
      <div class="content">content</div>
      <div class="footer">footer</div>
      <div class="append">append</div>
    </div>
    <div class="init-right">
      <div class="modules">
        modules
      </div>
      <div class="edit-mode">
        edit-mode
      </div>
    </div>
  </div>
</template>
<script setup>
  import Helper from '@/common/Helper'
  import ApiConst from '@/constants/ApiContants';
  import { reactive, onMounted } from 'vue';
  import "codemirror/mode/css/css.js"
  import "codemirror/theme/dracula.css";

  const store = Helper.useStore();
  const event = Helper.useEvent();
  const global = Helper.useGlobal();
  const api   = Helper.useApi();
  const data  = reactive({
   
  })
  const cmOptions = { mode: "text/css", theme: "dracula" }
  const SetDataDefault = () =>{
    
  };
  onMounted(() => {
    
  })
</script>
<style>
.init-page{
  justify-content: space-between;
}
</style>