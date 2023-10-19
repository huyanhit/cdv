<template>
<v-img class="module-image" 
    :class="moduleData.class?? ''"
    :style="moduleData.style?? ''"
    :src="moduleData.src?? 'https://picsum.photos/500/300?image=232'"
    :aspect-ratio="moduleData.aspect?? '1/1'"
    :cover="moduleData.cover?? 'cover'"
>
</v-img>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  module: Object,
  moduleData: Object
})
</script>