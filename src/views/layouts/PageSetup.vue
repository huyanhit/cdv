<template>
  <div class="edit-page">
    <main :id="store.getters.currentLayout? store.getters.currentLayout.lid: ''" 
          :class="store.getters.currentLayout? store.getters.currentLayout.class:''" class="setup-mode">
      <router-view></router-view>
    </main>
    <div class="editor-mode">
      <form class="form-edit-position">
        <div class="form-group mt-1" v-if="data.active === 'position'">
          <label class="text-uppercase mb-3">Sửa vị trí: {{ data.positions.properties.name }} </label>
          <template v-for="(item, index) in data.positions.data" :key="index">
            <v-text-field v-if="index === 'class'" label="Class" v-model="data.positions.data.class" variant="outlined"></v-text-field>  
            <div v-if="index === 'style'"> 
              <label> Style </label>
              <Codemirror v-model:value="data.positions.data.style" :options="cmOptions" border height="200" class="mb-3"/>
            </div>
          </template>
        </div>
        <div class="form-group mt-1" v-if="data.active === 'module'">
          <label class="text-uppercase mb-3">Sửa Module: {{ data.modules.properties.name }} </label>
          <template v-for="(item, index) in data.modules.data" :key="index">
            <v-text-field v-if="index === 'class'" label="Class" v-model="data.modules.data.class" variant="outlined"></v-text-field>  
            <div v-if="index === 'style'"> 
              <label> Style </label>
              <Codemirror v-model:value="data.modules.data.style" :options="cmOptions" border height="200" class="mb-3"/>
            </div>
            <v-text-field v-if="index === 'icon'" label="Icon" v-model="data.modules.data.icon" variant="outlined"></v-text-field>  
            <v-text-field v-if="index === 'size'" label="Size" v-model="data.modules.data.size" variant="outlined"></v-text-field>  
            <v-text-field v-if="index === 'color'" label="Color" v-model="data.modules.data.color" variant="outlined"></v-text-field>          
          </template>
        </div>
        <div class="form-group mt-1">
          <v-btn class="mr-3" @click="saveData()"> Lưu </v-btn>
          <v-btn> Hủy </v-btn>
        </div>
      </form>
    </div>
    
  </div>
</template>
<script setup>
  import Helper from '@/common/Helper'
  import ApiConst from '@/constants/ApiContants';
  import { reactive, onMounted} from 'vue';
  import Codemirror from "codemirror-editor-vue3"
  import "codemirror/mode/css/css.js"
  import "codemirror/theme/dracula.css";

  const store = Helper.useStore();
  const event = Helper.useEvent();
  const api   = Helper.useApi();
  const data  = reactive({
    active: '',
    page_id: 0,
    positions: {
      properties: null,
      data: null,
      layout_theme_position_id: 0,
    },
    modules: {
      properties: null,
      data: null,
      position_module_id: 0,
    },
  })
  const cmOptions = { mode: "text/css", theme: "dracula" }
  const saveData = () =>{
    if(data.active === 'position'){
      let param = {
        page_id: data.page_id,
        layout_theme_position_id: data.positions.layout_theme_position_id,
        options: data.positions.data
      }
      api.storeApi(store, { method:'post', url: ApiConst.SET_POSITION_OPTION, param: param});
    }   
    if(data.active === 'module'){
      let param = {
        page_id: data.page_id,
        position_module_id: data.modules.position_module_id,
        options: data.modules.data
      }
      api.storeApi(store, { method:'post', url: ApiConst.SET_POSITION_MODULE_OPTION, param: param});
    }
  };
  onMounted(() => {
    event.on('edit-theme', param =>{
      data.active  = param.type;
      data.page_id = param.data.page_id;
      if(param.type === 'position'){
        data.positions.properties               = param.data.position;
        data.positions.layout_theme_position_id = param.data.layout_theme_position_id;
        data.positions.data = store.getters.positionOptions(param.data.page_id, param.data.layout_theme_position_id);
      }
      if(param.type === 'module'){
        data.modules.properties         = param.data.module;
        data.modules.position_module_id = param.data.position_module_id;
        data.modules.data = store.getters.moduleOptions(param.data.page_id, param.data.position_module_id);
      }
    })
  })
 
</script>
<style>
.edit-page{
  display: flex;
  justify-content: space-between;
}
.editor-mode{
  height: 100vh;
  width: 400px;
  background-color: #fff;
  padding: 15px;
  border-left: 1px #ccc solid;
}
.padding-field.p-top{
  width: 100%;
  text-align: center;
}
.padding-field.p-left{
  float: left;
}
.padding-field.p-right{
  float: right;
}
.padding-field.p-bottom{
  clear: both;
  text-align: center;
}
.padding-field input{
  width: 60px;
  height: 40px;
  border: 1px #ccc solid;
  padding: 5px;
  text-align: center;
}
.form-edit{
  border: 1px #ccc solid;
  height: 30px;
}
</style>