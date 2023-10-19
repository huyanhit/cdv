<template>
  <v-toolbar id="header" class="d-flex container-fluid topbar"> 
    <form class="form-search me-auto">
      <v-text-field
        density="compact"
        variant="outlined"
        :label="$t('home.find-service')"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
      ></v-text-field>
    </form>
    <div class="mr-1">
      <v-btn prepend-icon="mdi-home" variant="text">
        {{ $t("home.home") }}
      </v-btn>
      <v-btn prepend-icon="mdi-information-outline" variant="text">
        {{ $t("home.procedure") }}
      </v-btn> 
      <v-btn prepend-icon="mdi-email-outline" variant="text">
        {{ $t("home.contact") }}
      </v-btn> 
    </div>
    <div class="mr-1">
      <v-btn class="text-none" stacked @click="changeThemeMode">
        <v-icon class="mb-1">{{obj.darkMode? "mdi-weather-sunny": "mdi-weather-night" }}</v-icon>
        <v-tooltip :text="$t('tooltip.theme')" activator="parent" size="x-small"></v-tooltip>
      </v-btn>
      <v-btn class="text-none" stacked>
        <v-badge content="2">
          <v-icon>mdi-bell-outline</v-icon>
          <v-tooltip :text="$t('tooltip.notify')" activator="parent" size="x-small"></v-tooltip>
        </v-badge>
      </v-btn>
      <v-btn class="text-none" stacked>
        <v-icon>mdi-translate</v-icon>
        <v-tooltip :text="$t('tooltip.language')" activator="parent" size="x-small"></v-tooltip>
        <v-menu activator="parent">
          <v-list>
            <v-list-item v-for="(item, index) in obj.language">
              <v-btn @click="changeLanguage(index)">{{item}}</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
    <div class="mr-1">
      <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-down"
            ></v-btn>
          </template>
        </v-list-item>
    </div>
  </v-toolbar>
</template>
<script setup>
    import {reactive} from 'vue';
    import Helper     from '@/common/Helper';
    const event  = Helper.useEvent();
    const global = Helper.useGlobal();
    const obj = reactive({
      darkMode: false,
      language:{
        "vi": global.$t('home.tiengviet'),
        "en": global.$t('home.english')
      }
    })
    const changeThemeMode = function(){
      obj.darkMode = !obj.darkMode;
      event.emit('change-theme', obj.darkMode);
    }
    const changeLanguage = function(param){
      event.emit('change-language', param);
    }
</script>
<style>

#header{
  padding-left: 50px;
}
#header .v-toolbar__content{
  height: var(--topbar-height) !important;
}
#header .form-search .v-input--density-compact {
  height: 45px;
  min-width: 300px;
  line-height: 24px;
}
</style>