import VueAxios from 'vue-axios'
import Vue from 'vue'
export default function ({ $axios, redirect, store }) {
    Vue.use(VueAxios, $axios)
    $axios.setBaseURL(process.env.baseUrl)
    $axios.onRequest(config => {
        config.headers['Access-Control-Allow-Origin'] = "*";
        // if (store.state.auth.token) {
        //     config.headers['Authorization'] = `Bearer ${store.state.auth.token}`;
        // }
        console.log('Making request to ' + config.url)
        if (config.headers['Content-Type'] && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            config.transformRequest = (data) => {
                const str = [];
                Object.keys(data).forEach(key => str.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`));
                return str.join('&');
            };
        }  
        return config;
    })
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        console.log(error.response)
        // switch (code) {
        //     case 400:
        //         break
        //     default:
        //         store.commit('notifications/push', error.response)
        //         break
        // }
    })
}