<template>
  <v-card-text
    :class="moduleData.class"
    :style="moduleData.style">
  </v-card-text>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  module: Object,
  moduleData: Object
})
</script>