<template>
  <main :id="store.getters.currentLayout? store.getters.currentLayout.lid: ''" 
        :class="store.getters.currentLayout? store.getters.currentLayout.class:''">
    <router-view></router-view>
  </main>
</template>
<script setup>
import Helper from '@/common/Helper'
const store  = Helper.useStore();
</script>
<style>

</style>