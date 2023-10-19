<template>
<div class="module-account-manager" :style="obj.style">
    <v-list-item v-if="obj.user" prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
        <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-down"></v-btn>
        </template>
        <v-menu activator="parent">
          <v-list>
              <v-list-item v-for="(item, index) in obj.features" :key="index">
                  <v-btn> {{ item }} </v-btn>
              </v-list-item>
          </v-list>
        </v-menu>
    </v-list-item>
    <v-list-item v-else>
      <v-btn variant="text" icon="mdi-chevron-down">Login</v-btn>
    </v-list-item>
</div>
</template>

<script setup>
import Helper from '@/common/Helper';
import {
    reactive,
    onBeforeMount
} from 'vue';
const global = Helper.useGlobal();
const obj = reactive({
    user: {
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      name: "Le Anh Huy",
    },
    features:{
      update:"Cập nhật tài khoản",
      createPage:"Tạo Trang",
      bookmark:"Các thông tin đã lưu",
      logout:"Đăng xuất",
    },
    style: "",
    options: {
        padding: "5px 0px 0px 0px",
        margin: "0px 0px 0px 0px",
        height: "auto",
        width: "auto",
        background: "unset",
        border: "unset",
    }
})
onBeforeMount(() => {
    for (const i in obj.options) {
        obj.style += i + ":" + obj.options[i] + ';'
    }
})
</script>
