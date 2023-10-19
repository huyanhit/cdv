<template>
    <div id="chat_center" class="row">
        <div id="chat-header" v-ripple>
            <v-avatar v-if="(this.$store.getters.currentRoom !== undefined)" :image="this.$store.getters.currentRoom.icon" size="45" color="light"></v-avatar>
            <span class="chat-header-name" v-if="(this.$store.getters.currentRoom !== undefined)"><b>{{this.$store.getters.currentRoom.name}}</b></span>
        </div>
        <ChatTimeLine/>
        <div id="chat-footer">
            <ChatTool @updateCheckSend="updateCheckSend" :sending="data.sending"></ChatTool>
            <ChatBox  @sendMessage="sendMessage" :checkSend="data.checkSend"></ChatBox>
        </div>
    </div>
</template>
<script setup>
    import ChatTimeLine from "@/components/messages/MessageTimeLine.vue";
    import ChatTool     from "@/components/messages/MessageTool.vue";
    import ChatBox      from "@/components/messages/MessageInput.vue";
    import EventConst   from '@/constants/EventContants';
    import Helper     from '@/common/Helper';
    import { onMounted, reactive } from "vue";

    const event  = Helper.useEvent();

    const data = reactive({
        sending: false,
        checkSend: false,
    })

    onMounted(()=>{
        event.emit(EventConst.EV_MOUNT_COMPONENT, {name: "Chat center", time:Date.now()});
    })

    const updateCheckSend = function(data){
        data.checkSend = data;
    }
    const sendMessage = function(status) {
        data.sending = status;
    }
</script>

<style scoped>
    #chat_center, #contact_center{
        background: #FFFFFF;
        height: 100vh;
    }
    #chat-header {
        height: 50px;
        background-color: #eee;
    }
    #chat-header img{
        height: 45px;
        width: 45px;
        border-radius: 50%;
    }
    .chat-header-name{
        font-size: 18px;
        margin-left: 10px;
        position: relative;
        top: 2px;
    }
    #chat-footer{
        padding-top: 3px;
        border-top: 1px #ccc solid;
        position: absolute;
        bottom: 0;
    }
    #select-contact{
        min-width: 100px;
    }
</style>
