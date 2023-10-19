

<template>
    <v-textarea ref="message_input" v-if="!checkSend" :disabled="store.getters.currentRoom === undefined" label="Enter your message here (Press Shift + Enter for send)" variant="outlined" class="chat_box" v-model="content" tabindex="1"
        v-on:keydown.enter.shift.exact.prevent="sendMessage"
        v-on:keydown.enter.ctrl.exact.prevent="sendMessage"
    ></v-textarea>
    <v-textarea ref="message_input" v-else :disabled="store.getters.currentRoom.id === undefined" label="Enter your message here (Press Shift + Enter for line break)" variant="outlined" class="chat_box" v-model="content" tabindex="1"
        v-on:keydown.enter.exact.prevent="sendMessage"
    ></v-textarea>
</template>
<script setup>
    import ApiConst   from '@/constants/ApiContants';
    import EventConst from '@/constants/EventContants';
    import _ from 'lodash';
    import Helper from '@/common/Helper'
    import { onMounted, reactive, ref, defineProps} from "vue";

    const props   = defineProps(['checkSend'])
    const refs    = ref(['message_input'])
    const DOMAIN  = import.meta.env.VITE_APP_API_STORAGE;
    const cookies = Helper.useCookies();
    const event   = Helper.useEvent();
    const store   = Helper.useStore();
    const api     = Helper.useApi();
    const cookie  = Helper.useCookies();
    const data = reactive({
        content: '',
        edit: null,
    })
    const sendMessage = function(){
        if (data.content.trim() !== "" && !data.sending) {
            event.emit('sendMessage', true);
            if (data.edit !== null) {
                let param = {room_id: store.getters.currentRoom.id, message_id: data.edit.id, content: data.content };
                api.storeApi(store, {method: "put", url: ApiConst.UPDATE_MESSAGE, param: param });
            } else {
                let param = { room_id: store.getters.currentRoom.id, content: data.content };
                api.storeApi(store, { method: "post", url: ApiConst.ADD_MESSAGE, param: param });
                
                let lastMessage  = this.$store.getters.messages.slice(-1)[0];
                if(lastMessage){
                    let messageIdAdd = parseInt(lastMessage.id) + 1;
                    let key = store.getters.currentRoom.id + '_' + messageIdAdd;
                    event.emit(EventConst.EV_PUSH_LIST, {
                        ROOM_MESSAGE:{[store.getters.currentRoom.id]:[messageIdAdd.toString()]}
                    })
                    event.emit(EventConst.EV_SYNC_DATA, { 
                        MESSAGE:{[key]:{auth:store.getters.currentUser.id, content: this.content,  status: 1, thread: 0, created:Date.now()/1000 }}
                    });
                    event.emit(EventConst.EV_GO_TO_BOTTOM); 
                }
            }

            data.content = null;
            data.edit    = null;
        }
    }

    const appendContent = function(data){ 
        if(refs.message_input !== null){
            let position = refs.message_input.selectionStart;
            if(data.break !== undefined && data.break === true){
                data.content = data.content + '\n';
            }
            if(this.content !== null && data.content.length > 0){
                let start    = data.content.substring(0, position);
                let end      = data.content.substring(position, data.content.length);
                data.content = start + data.content + end;
            }else{
                data.content = data.content;
            }
            this.$nextTick(() => {
                position += data.content.length;
                refs.message_input.setSelectionRange(position, position);
                refs.message_input.focus();
            })
        }
    }

    onMounted(()=>{
        
        event.on(EventConst.EV_CALL_API_SUCCESS, data => {
            if (data.param.url === ApiConst.UPDATE_MESSAGE || data.param.url === ApiConst.ADD_MESSAGE) {
                this.$emit('sendMessage', false);
            }
        });
        event.on(EventConst.EV_CALL_API_ERROR, data => {
            if (data.param.url === ApiConst.UPDATE_MESSAGE || data.param.url === ApiConst.ADD_MESSAGE) {
                this.$emit('sendMessage', false);
            }
        });
        event.on(EventConst.EV_APPEND_CONTENT, data => {
            appendContent(data);
        });
        event.on(EventConst.EV_EDIT_MESSAGE, item => {
            data.edit = item;
            data.content = item.content;
        });
        event.on(EventConst.EV_SEND_MESSAGE, () =>{
            sendMessage();
        });
    })

  
</script>
<style scoped>
    .chat_box{
        width: 100%;
        padding: 10px;
        padding-top: 0;
    }
</style>
