

<template>
    <div id="contact_center" class="row text-center">
        <div class="col mt-3">
            <v-btn append-icon="mdi-contact" class="bg-success add_contact" v-on:click="addContact"> Add All contact</v-btn>
        </div>
    </div>
</template>
<script setup>
    import ApiConst   from '@/constants/ApiContants';
    import Helper     from '@/common/Helper';
    import { reactive } from "vue";

    const store  = Helper.useStore();
    const api    = Helper.useApi();
    const contacts = reactive([
        {user_id:1},
        {user_id:2},
        {user_id:3},
    ])
    const props = defineProps({
        data: Object
    })
    const addContact = function(){
        for(let item of contacts){
            api.storeApi(store, {method:'post', url: ApiConst.ADD_USER, param:{user_id: item.user_id}});
        }
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
