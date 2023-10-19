<template>
    <form class="module-search">
        <v-text-field 
        :class="moduleData.class?? ''" 
        :style="moduleData.style?? ''" 
        :density="moduleData.density?? 'compact'" :variant="moduleData.density?? 'outlined'" 
        :label="moduleData.text? moduleData.text:'Search'" 
        :prepend-inner-icon="moduleData.class?? 'mdi-domain'"></v-text-field>
    </form>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    module: Object,
    moduleData: Object
})
</script>