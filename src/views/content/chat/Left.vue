<template>
    <div id="chat_left" class="row">
        <div class="header-list_room">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <span class="select-group" v-bind="props" >
                       ALL
                    </span>
                </template>
                <v-list >
                    <v-list-item v-for="(item, index) in data.group_items" :key="index" :value="index" class="mr-3 ml-3">
                        <v-list-item-title >{{ item.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <span class="add-room" v-on:click="addRoom"> + </span>
            <template>
                <div justify="center" class="text-center">
                    <v-dialog
                        v-model="data.dialog"
                        max-width="50%"
                        min-height="80%"
                    > 
                        <v-card>
                            <v-card-title><h4 class="text-center mt-3 title"> ADD ROOM </h4></v-card-title>
                            <div class="form-add-room" >
                                <div class="d-flex flex-row">
                                    <div class="col-3 pt-2">
                                        <v-img :aspect-ratio="1" cover class="border border-primary rounded fix-response" 
                                            :src="data.upload.icon">
                                        </v-img>
                                        <v-btn class="uploadIcon" @click="data.upload.openUploadIcon = true">Change</v-btn>
                                        <v-dialog v-model="data.upload.openUploadIcon" width="400">
                                            <v-card class="p-3">
                                                <div class="p-3">
                                                    <v-img cover class="border border-primary rounded" height="150"
                                                        :src="data.upload.iconChange">
                                                    </v-img>
                                                </div>
                                                <div class="d-flex">
                                                    <v-file-input placeholder="Choose file" v-model="data.upload.file" variant="solo" v-on:change="displayImage($event)"> </v-file-input>
                                                    <v-btn class="ml-2 mt-1" variant="outlined" min-width="100" height="52" v-on:click="uploadFiles"> Upload </v-btn>
                                                </div>
                                            </v-card>
                                        </v-dialog>
                                    </div>
                                    <div class="col-9">
                                        <div class="form-group">
                                            <label>Name</label>
                                            <v-text-field v-model="data.form.name" variant="outlined" type="text" placeholder="Enter name"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Description</label>
                                            <v-text-field v-model="data.form.description" variant="outlined" type="text" placeholder="Enter description"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group mt-5">
                                    <div class="d-flex flex-row">
                                        <div class="col-3">
                                            <v-checkbox v-model="data.check_all" label="Check All" color="info" hide-details class="border-box check-all" v-on:change="checkAllMember()"></v-checkbox>
                                        </div>
                                        <div class="col-5">
                                            <v-text-field label="Filter by Name" v-model="data.search" variant="outlined" type="text" placeholder="Enter description"/>
                                        </div>
                                        <div class="col-4">
                                            <v-select class="ml-3" 
                                                variant="outlined" 
                                                v-model="data.permission" 
                                                :items="data.permissions" 
                                                item-title="name"
                                                item-value="value"
                                                label="Select All Pemission">
                                            </v-select>
                                        </div>
                                    </div>
                                    <v-card loading class="popup-scroll">
                                        <template v-slot:text>
                                            <div class="d-flex custom-control border-bottom-line" v-for="(item, index) in listUsers" :key="index">
                                                <v-checkbox color="gray" v-model="data.members[index].check" hide-details :value="item.id" 
                                                    :label="item.name" 
                                                    :id="'member_'+item.id" 
                                                    :name="'member_'+item.id"
                                                ></v-checkbox>
                                                <v-select v-if="data.members[index].check" class="select-member-permission" 
                                                    variant="outlined" 
                                                    v-model="data.members[index].permission" 
                                                    :items="data.permissions" 
                                                    item-title="name"
                                                    item-value="value"
                                                    label="Select Pemission">
                                                </v-select>
                                            </div>
                                        </template>
                                    </v-card>
                                </div>
                                <div class="form-group mt-3">
                                    <v-btn variant="outlined" v-on:click="saveRoom">Add Room</v-btn>
                                    <v-btn variant="outlined" v-on:click="cancel" class="ml-3">Cancel</v-btn>
                                </div>
                            </div>
                        </v-card>
                    </v-dialog>
                </div>
            </template>
        </div>
        <ul id="list_rooms">
            <li v-for="(item, key) in this.$store.getters.rooms" :key="key">
                <router-link :to="'/chat/rid-'+item.id" :set="unread = getUnread(item.id)">
                    <v-avatar :image="DOMAIN+item.icon" size="40" color="light"></v-avatar>
                    <span class="title ml-2"> {{item.name}}  </span>
                    <span class="float-right">  
                        <v-chip variant="outlined" v-if="unread.unread > 0" size="x-small" class="ml-1">{{ unread.unread }}</v-chip> 
                        <v-badge v-if="unread.mention > 0" offset-y="-10"  offset-x="3" dot color="red" floating size="20"></v-badge> 
                        <v-icon v-if="item.pin" icon="mdi-pin mt-2"></v-icon> 
                    </span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script setup>
    import ApiConst   from '@/constants/ApiContants';
    import EventConst from '@/constants/EventContants';
    import _ from 'lodash';
    import Helper from '@/common/Helper'
    import { computed, nextTick, onBeforeMount, onMounted, reactive } from "vue";

    const DOMAIN  = import.meta.env.VITE_APP_API_STORAGE;
    const cookies = Helper.useCookies();
    const event   = Helper.useEvent();
    const store   = Helper.useStore();
    const api     = Helper.useApi();
    const cookie  = Helper.useCookies();

    const data = reactive({
        dialog: false,
        check_all: false,
        search: '', 
        members: [],
        upload: {
            openUploadIcon: false, 
            file: null,
            icon: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            iconChange: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        form: { 
            name: "",
            description: "",
            icon: null,
            members: [],
        },
        group: { name: 'All', value: '1' },
        group_items: [
            { name: 'All', value: '1' },
            { name: 'Unread', value: '2' },
            { name: 'Mention', value: '3' },
            { name: 'Direct', value: '4' },
            { name: 'Custom', value: '5' },
        ],
        permission: '2',
        permissions:  [
            { name: 'Admin', value: '1' },
            { name: 'Member', value: '2' },
            { name: 'Read Only', value: '3' },
        ]
    })

    const checkAllMember = function(){
        data.members = data.members.map(user =>{
            if(data.check_all){
                return {id: user.id, permission: data.permission, check: user.id}
            }else{
                return {id: user.id, permission: data.permission, check: false}
            }
        });
    }
    const saveRoom = function(){
        data.form.members = data.members.filter(member => member.check !== false)
        api.storeApi(store, {
            method: 'post', 
            url: ApiConst.ADD_ROOM, 
            param: data.form
        }).then(() =>{
            resetForm(); 
        });
    }

    const cancel = function(){
        data.dialog = false
    }

    const addRoom = function(){
        data.dialog = true
    }

    const editRoom = function(room_id){
        api.storeApi(store,{
            method:'put', 
            url: ApiConst.UPDATE_ROOM, 
            param:{room_id: room_id, name:"New room", description:"Desc", icon:"update.jpg"}
        });
    }

    const deleteRoom = function (room_id){
        api.storeApi(store, {
            method:'delete', 
            url: ApiConst.DELETE_ROOM, 
            param:{room_id:room_id}
        });
    }

    const getUnread = function(room_id){
        const currentUser = store.getters.getKey('CURRENT_USER');
        if(currentUser){
            const member = store.getters.getKey('MEMBER');
            const room   = store.getters.getKey('ROOM');
            const curentMember = member ?? member[room_id + '_' + currentUser.id];
            const curentRoom   = room_id ?? room[room_id];

            if(curentMember && curentRoom){
                const unread  = curentRoom.total - (curentMember.position - 1);
                const mention = curentMember.mention;
                
                return {unread: unread, mention: mention}
            }
        }

        return {unread: 0, mention: 0};
    }

    const displayImage = function(e){
        data.upload.iconChange = URL.createObjectURL(e.target.files[0]);
    }
    const resetForm = function(){
        data.form.description ='';
        data.form.name    = '';
        data.form.icon    = '';
        data.permission   = '2';
        data.search       = ''; 
        data.form.members = [];
        data.members      = [];
        data.upload.icon  = "https://cdn.vuetifyjs.com/images/parallax/material.jpg";
        data.check_all    = false;
        data.dialog       = false
    }
    const uploadFiles = function(){
        if(data.upload.file !== null){
            let formData = new FormData();
            for (let index = 0; index < data.upload.file.length; index++) {
                if(data.upload.file[index].name !== undefined){
                    formData.append('file[]',  data.upload.file[index]);
                }
            }
            api.storeApi(store, { method: "upload", url: ApiConst.UPLOAD_FILES, param: formData }).then((response)=>{
                data.upload.openUploadIcon  = false;
                if(response && response.status === 1){
                    const key = Object.keys(response.data.resp)[0];
                    data.upload.icon = data.upload.iconChange;
                    data.form.icon = response.data.resp[key].path;
                }
            });
        }
    }

    const listUsers = computed(()=>{
        let users = store.getters.users.filter(item => item.name.includes(data.search));
        data.members = users.map(user => {
            const item = data.members.find(item => item.id === user.id);
            if(item && item.id === user.id){
                return { id: user.id, permission: data.permission, check: item.check }
            }else{
                return { id: user.id, permission: data.permission, check: false }
            }
        });

        return users;
    })

    onBeforeMount(()=>{
        api.storeApi(store, {method:'get', url: ApiConst.GET_ALL_ROOM}).then(()=>{
            nextTick(()=>{
                event.emit(EventConst.EV_GOTO_MY_CHAT);
            })
        });
    })

    onMounted(()=>{
        event.emit(EventConst.EV_MOUNT_COMPONENT, {name: 'Left chat', time:Date.now()});
    })
</script>

<style scoped>
    .fix-response{
        width: calc(100% - 15px)
    }
    #chat_left, #contact_left{
        background: #EAF2E7;
        height: 100vh;
        display: block;
    }
    .uploadIcon{
        position: absolute;
        bottom: 0;
        width: calc(100% - 15px);
        background-color: #00000030;
        color: #fff;
        line-height: 30px;
    }
    .select-group{
        display: inline-block;
        height: 50px;
        background: var(--bs-gray-300);
        width: 85%;
        line-height: 18px;
        padding: 15px;
    }
    #list_rooms{
        background: #EAF2E7;
        height: calc(100% - 50px);
        overflow: auto;
        padding: 0;
    }
    #list_rooms li a{
        background: #eaf2e7;
        padding: 10px;
        cursor: pointer;
        color: #666;
        text-decoration: none;
        position: relative;
        border-radius: 5px;
        border: 1px solid #eaf2e7;
        color: #000;
        margin: 1px 2px;
        display: block;
        text-decoration: none;
    }
    #list_rooms .router-link-active{
        border: 1px solid #2B7A0B;
        background-color: #fff;
    }
    #list_rooms li.active{
        background-color: gray;
        color: #fff;
    }
    .header-list_room{
        padding: 0;
    }
    .add-room{
        height: 50px;
        border: none;
        background: var(--bs-gray-300);
        outline: none;
        box-shadow: none;
        width: 15%;
        float: right;
        text-align: center;
        font-size: 30px;
        cursor: pointer;
        border-left: 1px #ccc solid;
    }
    .add-room:hover{
        background-color: #ccc;
    }
    .edit-room, .delete-room{
        float: right;
        background-color: var(--bs-black);
        margin: 0 2px;
        width: 30px;
        height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 50%;
        line-height: 30px;
        margin-top: -3px;
    }
    .edit-room:hover, .delete-room:hover{
        background: #fff;
        color: #333;
    }
    .form-add-room{
        padding: 0px 30px;
        margin-bottom: 30px;
    }
    .popup-scroll{
        max-height: 350px;
        overflow-y: scroll;
    }
    .border-bottom-line{
        border-bottom: 1px #ccc solid;
        height: 65px;
    }
    .border-box{
        border: 1px #ddd solid;
        border-radius: 4px;
        display: inline-block;
        padding-right: 30px;
        width: calc(100% - 15px);
    }
    .select-group .v-field__input{
       min-height: 50px;
    }

    .select-member-permission{
        height: 55px;
        margin: 5px;
        max-width: 300px;
    }
</style>
