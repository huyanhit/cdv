<script setup>
    import DataController  from '@/views/includes/DataController.vue';
    import EventController from '@/views/includes/EventController.vue';
    import Helper          from '@/common/Helper';
    import { useTheme }    from 'vuetify'
    import { onMounted, reactive } from 'vue';
    const event = Helper.useEvent();
    const global  = Helper.useGlobal();
    const theme = useTheme()
    const data  = reactive({
        theme: 'none',
    })
    onMounted(()=>{
        event.on('change-language', param =>{
            global.$i18n.locale = param;
        });
        event.on('change-theme', param =>{
            theme.global.name.value = param ? 'green':'blue' 
            console.log(theme.global.name.value);
        });
    })
</script>

<template>
    <v-app>
        <EventController/>
        <DataController/>
        <router-view/>
    </v-app>
</template>