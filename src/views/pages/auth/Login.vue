

<template>
    <div class="auth-bg">
        <div class="bg-overlay"></div>
        <div class="row">
            <div class="col-lg-12">
                <div class="text-center mt-sm-5 mb-4">
                    <div>
                        <a href="index.html" class="d-inline-block auth-logo">
                            <img src="/src/assets/web/logo.png" alt="" height="40">
                        </a>
                    </div>
                    <p class="mt-3 text-white-50">{{$t("site.slogan")}}</p>
                </div>
            </div>
        </div>
    </div>
    <v-snackbar v-model="data.showAlert" variant="outlined" width="520" location="top" multi-line>{{ data.apiMessage }}
        <template v-slot:actions>
            <v-btn variant="text" @click="data.showAlert = false"> Close </v-btn>
        </template>
    </v-snackbar>
    <v-sheet 
        :class="model"
        elevation="4"
        id="login-form"
        rounded 
        border >
        <v-form ref='form' v-model="data.form" @submit.prevent="onSubmit">
            <h4 class="text-center mb-4 text-uppercase text-gray">{{ $t("auth.login") }}</h4>
            <v-text-field variant="outlined" 
                type="email" 
                class="form-control" 
                :label="$t('auth.email')"
                v-model="data.login.email" 
                required
                :rules="[Validate.required, Validate.max(data.login.email, 50), Validate.email]" 
            />
            <v-text-field 
                variant="outlined" 
                class="form-control" 
                :label="$t('auth.password')"
                required
                v-model="data.login.password"  
                :type="[data.showPass ? 'text': 'password']"
                @click:appendInner.stop="data.showPass = !data.showPass"
                :append-inner-icon="data.showPass? 'mdi-eye-off-outline': 'mdi-eye-outline'"
                :rules="[Validate.required]" 
            />
            <v-checkbox :label="$t('auth.forget-password')" v-model="data.login.remember"/>
            <div class="col text-center">
                <v-btn variant="outlined" type="button" class="mb-4" v-on:click="loginApp">{{$t("auth.login")}}</v-btn>
            </div>
           
            <div class="pt-2 mb-2 text-center">
                <div class="signin-other-title">
                    <h6 class="">{{$t("auth.sign-in-with")}}</h6>
                </div>
                <div>
                    <button type="button" class="btn btn-primary btn-icon waves-effect waves-light ml-1">
                        <v-icon icon="mdi-facebook" mid></v-icon>
                    </button>
                    <button type="button" class="btn btn-danger btn-icon waves-effect waves-light ml-1">
                        <v-icon icon="mdi-google" mid></v-icon>
                    </button>
                    <button type="button" class="btn btn-dark btn-icon waves-effect waves-light ml-1">
                        <v-icon icon="mdi-github" mid></v-icon>
                    </button>
                    <button type="button" class="btn btn-info btn-icon waves-effect waves-light ml-1">
                        <v-icon icon="mdi-twitter" mid></v-icon>
                    </button>
                </div>
            </div>
        </v-form>
    </v-sheet>
    <div class="row mt-5">
        <div class="col text-center mb-3 mt-5">
            <router-link to="/fogot-password">{{$t("auth.forget-password")}}</router-link>
        </div>
        <div class="text-center">
            <p>{{$t("auth.dont-have-account")}} <router-link to="/register">{{$t("auth.register")}}</router-link></p>
        </div>
    </div>
    
   
</template>
<script setup>
    import ApiConst   from '@/constants/ApiContants';
    import Helper     from '@/common/Helper';
    import Validate   from '@/common/Validate';
    import {reactive, ref} from 'vue';
    
    const api       = Helper.useApi();
    const cookies   = Helper.useCookies();
    const store     = Helper.useStore();
    const route     = Helper.useRoute();
    const form      = ref([]);

    const data = reactive({
            errors: '',
            form: false,
            showPass: false,
            showAlert: false,
            apiMessage: '',
            login:{
                email: '',
                password: '',
                remember: true,
            },
        }
    )

    const loginApp = async function(){
        data.showAlert = false;
        if(form.value.validate()){
            api.callApi({method: "post", url: ApiConst.LOGIN, param:data.login }).then((response) => {
                data.showAlert  = true;
                data.apiMessage = response.message;
                if(response && response.status === 1){
                    store.state.CURRENT_USER = {id: response.data.user.id}
                    cookies.set('access_token', response.data.access_token)
                    setTimeout(() => {
                        route.push('/');
                    }, 1000);
                }
            })
        }
    }
</script>
<style scoped>
    #login-form{
        margin: auto;
        max-width: 500px;
        transform: translateY(10%);
        padding: 30px;
    }
    .login-alert{
        margin: auto;
        max-width: 500px;
    }
    #login-form .form-control{
        border: none;
    }
    .bg-overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        right: 0;
        bottom: 0;
        left: 0;
        top: 0;
        background: -webkit-gradient(linear,left top,right top,from(#364574),to(#405189));
        background: linear-gradient(to right,#364574,#405189);
        opacity: .9;
    }
    .signin-other-title{
        display: inline-block;
        position: relative;
        z-index: 9;
        background-color: var(--vz-secondary-bg);
        padding: 2px 16px;
    }
</style>
