<template>
    <div id="chat_right" class="row">
        <div class="chat-header-left">
            <div id="group-chat-members" v-if="(this.$store.getters.members !== undefined)">
                <template v-for="(item, index) in this.$store.getters.members" :key="index">
                    <span v-if="(parseInt(index) < 5)" >
                        <img v-if="(this.$store.getters.currentRoom !== undefined)" :src="item.icon_img" :title="item.name"/>
                    </span>
                </template>
                <span>
                    <v-avatar color="green" size="35" v-if="(this.$store.getters.members !== null && this.$store.getters.members.length > 5)"> +{{(this.$store.getters.members.length - 5)}}</v-avatar>
                </span>
            </div>
            <div id="group-icon-setting">
                <v-menu max-height="500">
                    <template v-slot:activator="{ props }">
                        <span class="my-files mb-3" v-bind="props">
                            <i class="bi bi-folder"></i>
                        </span>
                    </template>
                    <v-list>
                        <v-list-item v-for="(item, index) in $store.getters.roomFiles" :key="index" :value="index" class="mr-3 ml-3" v-on:click="showGalery(index)">
                            <FileItem :file="item"></FileItem>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <span class="setting mb-3" v-bind="props">
                            <i class="bi bi-gear"></i>
                        </span>
                    </template>
                    <v-list >
                        <v-list-item v-for="(item, index) in data.items" :key="index" :value="index" class="mr-3 ml-3">
                            <v-list-item-title >{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
        <div>
            <Lightgallery
                :settings="{speed: 500, plugins: plugins}"
                :onInit="onInit">
                <a v-for="(file, index) in $store.getters.roomFiles" :key="index" class="gallery-item"
                    :data-src="URL+'get-file-raw/' + file.id +'/' + cookies.get('access_token')">
                </a>
            </Lightgallery>
        </div>
        <div class="room-info" v-if="(this.$store.getters.currentRoom !== undefined)">
           {{this.$store.getters.currentRoom.description}}
        </div>
    </div>
</template>
<script setup>
    import _          from 'lodash';
    import EventConst from '@/constants/EventContants';
    import FileItem   from "@/components/files/FileItem.vue";

    import Lightgallery from 'lightgallery/vue';
    import lgZoom from 'lightgallery/plugins/zoom';
    import lgVideo from 'lightgallery/plugins/video';
    import lgThumbnail from 'lightgallery/plugins/thumbnail';
    import Helper from '@/common/Helper'
    import { onMounted, reactive } from 'vue';

    const URL = import.meta.env.VITE_APP_API_DOMAIN;
    const cookies = Helper.useCookies();
    const event  = Helper.useEvent();

    const plugins = reactive([lgZoom, lgVideo])
    const data = reactive({
        items: [
            { title: "Profile" },
            { title: "Setting" },
            { title: "Token API" },
            { title: "Change Password" },
            { title: "Tutorial" },
            { title: "Logout" }
        ],
        lightGallery: null
    })
    
    const showGalery = function(index){
        data.lightGallery.refresh();
        data.lightGallery.openGallery(index)
    }
    const onInit = function(detail){
        data.lightGallery = detail.instance;
    }
    const updateGalery= function(){
        data.lightGallery.refresh();
    }
    onMounted(()=>{
        event.on(EventConst.EV_SHOW_IMAGE, imageId => {
            let index = store.getters.roomFiles.findIndex(img => parseInt(img.file_id) === imageId);
            if(index !== -1){
                showGalery(index);
            }   
        })
    })
</script>
<style scoped>
    #chat_right, #contact_right{
        background: #EAF2E7;
        height: 100vh;
        display: block
    }
    .chat-header-left{
        background: #f2f2f2;
        height: 50px;
    }
    #group-chat-members{
        width: 70%;
        float: left;
    }
    #group-chat-members > span{
        height: 30px;
        width: 30px;
        border-radius: 50%;
        float: left;
        padding-top: 7px;
    }
    #group-chat-members > span img{
        height: 35px;
        width: 35px;
        border-radius: 50%;
        background: #ccc;
        font-size: 0;
    }
    #group-icon-setting{
        width: 30%;
        float: right;
        padding-left: 0px;
    }
    #group-icon-setting::before{
        content: "";
        height: 35px;
        width: 2px;
        top: 7px;
        bottom: 0;
        background-color: #999;
        position: absolute;
        left: -5px;
    }
    #group-icon-setting > span{
        padding-top: 5px;
        display: inline-block;
        margin-left: 5px;
    }
    #group-icon-setting img{
        height: 40px;
        width: 40px;
        border: 1px #ccc solid;
    }
    #room-info{
        display: inline-block;
    }
    .setting, .my-files{
        font-size: 25px;
        padding: 0 5px !important;
        cursor: pointer;
        border: 1px #fff solid;
        margin-top: 5px;
    }

    .setting:hover, .my-files:hover {
        background-color: #999;
        color: #fff;
    }
</style>
