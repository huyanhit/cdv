<template>
  <main id="home-layout" :class="{active:data.openMenu}">
    <Header/>
    <Menu/>
    <content id="content">
        <router-view></router-view>
    </content>
    <Footer/>
  </main>
</template>
<script setup>
 
import Header from '@/views/includes/Header.vue';
import Menu from '@/views/includes/Menu.vue';
import Footer from '@/views/includes/Footer.vue';
import Helper from '@/common/Helper';
import {
    onMounted,
    reactive
} from 'vue'
const event = Helper.useEvent();
const data = reactive({
    openMenu: false
})
onMounted(() => {
    event.on('toggle-drawer', param => {
        data.openMenu = param;
    })
})
</script>
<style>
#menu {
  width: var(--nav-width-open);
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  float: left;
  height: 100vh;
}
#header{
  position: fixed;
  top: 0;
  right: 0;
  left: var(--nav-width-open);
  height: var(--topbar-height);
  width: calc(100% - var(--nav-width-open));
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
#footer {
  width: calc(100% - var(--nav-width-open));
  height: var(--footer-height);
  position: fixed;
  bottom: 0;
  left: var(--nav-width-open);
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
#content {
  float: right;
  position: relative;
  width: calc(100% - var(--nav-width-open));
  height: calc(100vh - var(--topbar-height) - var(--footer-height));
  overflow-y: auto;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: var(--topbar-height);
}

#home-layout.active #menu {
  width: var(--nav-width-close);
}

#home-layout.active #header {
  left: var(--nav-width-close);
  width: calc(100% - var(--nav-width-close));
}

#home-layout.active #content {
  width: calc(100% - var(--nav-width-close));
}

#home-layout.active #footer {
  width: calc(100% - var(--nav-width-close));
  left: var(--nav-width-close);
}
</style>