<template>
  <v-icon
    :class="moduleData.class?? ''"
    :style="moduleData.style?? ''"
    :size="moduleData.size?? 40"
    :color="moduleData.color?? '#666'"
    :icon="moduleData.icon?? 'mdi-domain'"
    to="#"
  ></v-icon>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  module: Object,
  moduleData: Object
})
</script>