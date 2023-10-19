<template>
    <v-card class="module-post" 
        :class="moduleData.class?? ''"
        :style="moduleData.style?? ''"
    >
    </v-card>
    </template>
    
    <script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
      module: Object,
      moduleData: Object
    })
    </script>
