<template>
    <div v-for="(position, index) in data.positions" :key="index" :style="data.positionData[index].style" :class="data.positionData[index].class">
        <div v-for="(module, index2) in store.getters.modules(global.$route.params.id, index)" :key="index2">
            <component 
                :is="module.name" 
                :module="module"
                :moduleData="store.getters.moduleOptions(global.$route.params.id, module.id)"
            />
        </div>
    </div>
</template>
    
<script setup>
import Helper from '@/common/Helper';
import ApiConst   from '@/constants/ApiContants';
import {
    onBeforeMount,
    reactive
} from 'vue'
const store  = Helper.useStore();
const event  = Helper.useEvent();
const global = Helper.useGlobal();
const api    = Helper.useApi()
const data  = reactive({
    openMenu: false,
    positions: null,
    positionData: []
})
onBeforeMount(() => {
    store.dispatch('sync_data', {CURRENT_PAGE: { id: global.$route.params.id }})
    api.storeApi(store, { method:'get',  url: ApiConst.LOAD_PAGE,   param:{page:global.$route.params.id} }).then(()=>{
        data.positions = store.getters.getKey('POSITION');
        for(let index in data.positions){
            data.positionData[index] = store.getters.positionOptions(global.$route.params.id, index);
        }
    });
    event.on('toggle-drawer', param => {
        data.openMenu = param;
    })  
})
</script>
<script>
export default {
    components: Helper.loadModules(),
}
</script>