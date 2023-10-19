<template>
    <div class="event-info" v-show="data.show"><span  class="icon-log"><v-icon icon="mdi-close float-right" size="15" v-on:click="data.show = !data.show"></v-icon></span>
        <v-tabs v-model="data.tab" bg-color="basil">
            <v-tab value="1">COMPORNENT</v-tab>
        </v-tabs>
        <v-window v-model="data.tab">
            <v-window-item value="1">
                <div v-for="(item, index) in data.mounts" :key="index">{{item.name}}:
                    <b :class="{'text-danger': (final === item.name)}">{{item.time - data.now}} ms</b> 
                </div>
            </v-window-item>
        </v-window>
    </div>
</template>

<script setup>
    import EventConst from '@/constants/EventContants';
    import ApiConst   from '@/constants/ApiContants';
    import Helper     from '@/common/Helper';
    import { reactive, onMounted, onUnmounted, onBeforeMount } from "vue";
    import { onBeforeRouteUpdate } from 'vue-router';

    const event  = Helper.useEvent();
    const route  = Helper.useRoute();
    const store  = Helper.useStore();
    const api    = Helper.useApi();
    
    const data = reactive({
        tab: 1,
        mounts: [],
        final: '',
        show: false,
        now: Date.now(),
    })

    const changeRoom = function(room){
        const roomId = room.roomId;
        store.dispatch('sync_data', { CURRENT_ROOM: {id: roomId} });
        // if(store.getters.getKey('ROOM_MEMBER')[roomId] === undefined){
        //     api.storeApi(store, { 
        //         method: "get", 
        //         url: ApiConst.GET_MEMBERS_OF_ROOM, 
        //         param: {'room_id': roomId} 
        //     });
        // }
        // if(store.getters.getKey('ROOM_MESSAGE')[roomId] === undefined){
        //     api.storeApi(store, { 
        //         method: "get", 
        //         url: ApiConst.GET_MESSAGES, 
        //         param:{'room_id': roomId}
        //     });
        // }
        // if (store.getters.getKey('ROOM_FILE')[roomId] === undefined) {
        //     api.storeApi(store, { 
        //         method: "get", 
        //         url: ApiConst.GET_ROOM_FILE,
        //         param: {'room_id': roomId}
        //     });
        // }
    };

    const goToMyChat = function(){
        if(store.getters.rooms){
            const myRoom = store.getters.rooms.find(room =>room.type === 2);
            if(myRoom){
                route.push('/chat/rid-'+myRoom.id)
            }else{
                api.storeApi(store, { 
                    method: "post", 
                    url: ApiConst.ADD_ROOM_MY_CHAT
                }).then(()=>{
                    console.log('has add room');
                });
            }
        }
    }

    onBeforeRouteUpdate((to, from, next) => {
        if(to.name === 'chat' && to.params.roomId){
            event.emit(EventConst.EV_CHANGE_NAVIGATE, to.name);
            event.emit(EventConst.EV_CHANGE_ROOM, to.params);
            next();
        }
        
        if(to.name !== from.name){
            event.emit(EventConst.EV_CHANGE_NAVIGATE, to.name);
            next();
        }
    })  

    onBeforeMount(()=>{
        // event chang room
        event.on(EventConst.EV_CHANGE_ROOM, roomId => {
            changeRoom(roomId);
        });
        // event goto my chat room
        event.on(EventConst.EV_GOTO_MY_CHAT, () => {
            goToMyChat();
        });
    })

    onMounted(()=>{
        event.on(EventConst.EV_MOUNT_COMPONENT, mount => {
            data.mounts.push(mount);
        });

        if(route.currentRoute.value){
            event.emit(EventConst.EV_CHANGE_ROOM, route.currentRoute.value.params);
        }
    })

    onUnmounted(()=>{
        event.off(EventConst.EV_CHANGE_ROOM);
        event.off(EventConst.EV_GOTO_MY_CHAT);
        event.off(EventConst.EV_MOUNT_COMPONENT);
        event.off(EventConst.EV_CALL_API);
    })
   
</script>
<style>
    .event-info {
        position: fixed;
        right: 3px;
        bottom: 3px;
        background: #fff;
        z-index: 1;
        border: 1px #999 solid;
    }
    .event-info .v-window-item--active{
        padding: 10px;
        overflow-y: auto;
        border-radius: 5px;
        width: 300px;
        height: 300px;
    }
    .icon-log{
        height: 15px;
        width: 15px;
        position: absolute;
        z-index: 1;
        right: 5px;
        top: 5px;
    }
</style>