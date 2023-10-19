import { getCurrentInstance, defineAsyncComponent } from "vue"
import { useCookies } from 'vue3-cookies';
import { useStore } from "vuex"
export default{
    useEvent:() => getCurrentInstance().appContext.config.globalProperties.event,
    useFilter:() => getCurrentInstance().appContext.config.globalProperties.filter,
    useApi:() => getCurrentInstance().appContext.config.globalProperties.api,
    useSocket:() => getCurrentInstance().appContext.config.globalProperties.$socket,
    useRoute:() => getCurrentInstance().appContext.config.globalProperties.$router,
    useCookies:() => useCookies({expire:'7d'}).cookies,
    useStore:() => useStore(),
    useGlobal:() => getCurrentInstance().appContext.config.globalProperties,
    loadModules:() => {
        const modules  = import.meta.glob('@/views/modules/*.vue');
        let components = {};
        for (let path in modules) {
            let fileName = path.match(/.*\/(.*)\.vue$/)[1];
            if (fileName) {
                components = Object.assign(components, {
                    [fileName]: defineAsyncComponent(() => import(`../views/modules/${fileName}.vue`))
                });
            }
        }
        return components;
    }
}
