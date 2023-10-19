<template>
  <v-toolbar 
    :class="moduleData.class?? ''" 
    :style="moduleData.style?? ''" > 
    <v-btn prepend-icon="mdi-home" variant="text">
      {{ $t("home.home") }}
    </v-btn>
    <v-btn prepend-icon="mdi-information-outline" variant="text">
      {{ $t("home.procedure") }}
    </v-btn> 
    <v-btn prepend-icon="mdi-email-outline" variant="text">
      {{ $t("home.contact") }}
    </v-btn> 
  </v-toolbar>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    module: Object,
    moduleData: Object
})
</script>