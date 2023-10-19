<template>
    <v-list lines="two" 
    :class="moduleData.class?? ''" 
    :style="moduleData.style?? ''" >
        <v-list-item v-for="n in 8" :key="n" class="list-post-item" :to="'internet/'+ n">
            <v-card
              class="mx-auto"
            >
              <v-img
                class="align-end text-white"
                height="200"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                cover
              >
                <v-card-title>Top 10 Australian beaches</v-card-title>
              </v-img>
          
              <v-card-subtitle class="pt-4">
                Number 10 
              </v-card-subtitle>
          
              <v-card-text>
                <div>Whitehaven Beach</div>
          
                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text>
          
              <v-card-actions>
                <v-btn color="orange">
                  Share
                </v-btn>
          
                <v-btn color="orange">
                  Explore
                </v-btn>
              </v-card-actions>
            </v-card>
    </v-list-item>
    </v-list>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    module: Object,
    moduleData: Object
})
</script>
<style>
.list-post-item{
    float: left;
    min-width: 300px;
    width: 25%;
}
</style>
