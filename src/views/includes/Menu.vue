<template>

<v-navigation-drawer v-model="data.drawer" :rail="data.rail" permanent @click="closeDrawer" id="menu">
    <div class="toggle-menu">
        <v-btn class="toggle-menu" 
        variant="text" :icon="data.rail?'mdi-format-horizontal-align-right':'mdi-format-horizontal-align-left'" 
        @click.stop="toggleDrawer"></v-btn>
    </div>
    <v-list-item class="logo" prepend-icon="mdi-home-city" :title="$t('home.service-port-online')" to="/home"></v-list-item>
    <v-list density="compact" nav class="navigation-drawer">
        <v-list-item prepend-icon="mdi-network" title="Viễn thông" to="/nhom/vien-thong"></v-list-item>
        <v-list-item prepend-icon="mdi-human-greeting" title="Sức Khỏe" to="/nhom/suc-khoe"></v-list-item>
        <v-list-item prepend-icon="mdi-bank" title="Tài Chính" to="/nhom/tai-chinh"></v-list-item>
        <v-list-item prepend-icon="mdi-truck-delivery" title="Vận chuyển" to="/nhom/van-chuyen"></v-list-item>
        <v-list-item prepend-icon="mdi-home-outline" title="Nhà cửa" to="/nhom/nha-cua"></v-list-item>
        <v-list-item prepend-icon="mdi-shopping" title="Mua Bán" to="/nhom/shoping"></v-list-item>
        <v-list-item prepend-icon="mdi-sticker-emoji" title="Làm đẹp" to="/nhom/beauty"></v-list-item>
        <v-list-item prepend-icon="mdi-hospital" title="Y tế" to="/nhom/medical"></v-list-item>
        <v-list-item prepend-icon="mdi-school" title="Giáo dục" to="/nhom/education"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple-outline" title="Việc làm" to="/nhom/job"></v-list-item>
        <v-list-item prepend-icon="mdi-looks" title="Bất động sản" to="/nhom/land"></v-list-item>
        <v-list-item prepend-icon="mdi-lumx" title="Khác" to="/other"></v-list-item>
    </v-list>
</v-navigation-drawer>
</template>

<script setup>
import Helper from '@/common/Helper';
const event = Helper.useEvent();
import {
    reactive
} from "vue";

const data = reactive({
    drawer: true,
    rail: false,
})
const toggleDrawer = function(){
  data.rail = !data.rail
  event.emit('toggle-drawer', data.rail)
}
const closeDrawer = function(){
  data.rail = false
  event.emit('toggle-drawer',  data.rail)
}
</script>

<style>
.toggle-menu {
    position: fixed;
    right: -50px;
    top: 5px;
}
.logo {
    padding: 10px 0;
    position: fixed;
    font-size: 20px;
    font-weight: 600;
    width: 100%;
    padding-left: 12px;
    text-align: left;
    height: var(--topbar-height);
    z-index: 2000;
}
.logo .v-list-item-title{
    font-size: 14px;
    position: relative;
    text-transform: uppercase;
}
.logo .v-list-item__prepend .v-icon{
    margin-inline-end: 20px;
}
.navigation-drawer{
    margin-top: var(--topbar-height);
}
.navigation-drawer .v-list-item__prepend .v-icon{
    margin-inline-end: 23px;
}
.v-navigation-drawer{
    background: rgb(var(--v-theme-bg-menu));
    color: rgb(var(--v-theme-text-menu));
}
</style>
