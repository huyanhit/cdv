<template>
  <div v-for="(position, index) in data.positions" :key="index" :style="data.positionData[index].style" :class="data.positionData[index].class"> 
    <v-btn class="position-editer" size="x-small" icon="mdi-grease-pencil" @click="openEditPosition($event, index, position)"></v-btn>
      <div v-for="(module, index2) in store.getters.modulesDefault(position.id)" :key="index2">
        <v-btn class="module-editer" size="x-small" icon="mdi-grease-pencil" @click="openEditModule($event, module.id, module)"></v-btn>
          <component 
            :is="module.name" 
            :module="module"
            :moduleData="store.getters.moduleOptionsDefault(module.id)"
          /> 
      </div>
  </div>
</template>
<script setup>
import Helper from '@/common/Helper';
import ApiConst from '@/constants/ApiContants';
import {
  onBeforeMount,
  reactive,
} from 'vue'
const store  = Helper.useStore();
const event  = Helper.useEvent();
const global = Helper.useGlobal();
const api    = Helper.useApi()
const data  = reactive({
  openMenu: false,
  positions: null,
  moduleTarget: null,
  positionTarget: null,
  positionData: [],
})
const openEditPosition = (e, layout_theme_position_id, position) => {
  event.emit('edit-theme', { type:'position', 
  data:{ layout_theme_position_id:layout_theme_position_id, position:position }});
  if(data.positionTarget) data.positionTarget.parentElement.classList.remove('position_highlight');
  if(data.moduleTarget) data.moduleTarget.parentElement.classList.remove('module_highlight');
  data.positionTarget = e.currentTarget;
  data.positionTarget.parentElement.classList.add('position_highlight');
}
const openEditModule = (e, position_module_id, module) => {
  event.emit('edit-theme', { type:'module', 
  data:{ position_module_id:position_module_id, module:module }});
  if(data.positionTarget) data.positionTarget.parentElement.classList.remove('position_highlight');
  if(data.moduleTarget) data.moduleTarget.parentElement.classList.remove('module_highlight');
  data.moduleTarget = e.currentTarget;
  data.moduleTarget.parentElement.classList.add('module_highlight');
}
onBeforeMount(() => {
  if(global.$route.params.layout_id && global.$route.params.theme_id){
    api.storeApi(store, { method:'get',  url: ApiConst.LOAD_DATA_LAYOUT_THEME,
      param:{layout_id:$route.params.layout_id, theme_id:global.$route.params.theme_id}}).then(()=>{
        data.positions = store.getters.getKey('POSITION');
        for(let index in data.positions){
            data.positionData[index] = store.getters.positionOptionsDefault(index);
        }
    });
  }
})
</script>
<script>
export default {
  components: Helper.loadModules(),
}
</script>

<style>
.position-editer{
  position: absolute;
  z-index: 10;
  margin-left: calc(50% - 20px);
  margin-top: 1px;
  background-color: #ccc;
}

.module-editer{
  position: absolute;
  z-index: 10;
  margin: 1px;
  background-color: #9d4a4a;
  color: #fff;
}

.position_highlight{
  box-shadow:inset 0 0 3px red;
}
.module_highlight{
  box-shadow:inset 0 0 3px blue;
}
</style>