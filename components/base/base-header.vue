<template lang="pug">
header.header
    .d-flex.align-items-center.justify-content-between.h-100
        nuxt-link(to="/")
            .logo SlowSales24
        .d-flex.align-items-center.h-100(v-if="!isAuth" )
            simple-btn.mr-4(@click="$router.push('/login')") Вход
            simple-btn(@click="$router.push('/register')") Регистрация
        .d-flex.align-items-center.h-100(v-if="isAuth" )
            simple-btn.mr-4(@click="logout") Выйти
</template>

<script>
export default {
    mounted() {
        if (!this.isAuth) {
            this.$router.push('/login')
        }
    },
    computed: {
        isAuth() {
            if(process.browser) {
                return window.localStorage.getItem('token')
            }
            return false
        }
    },
    watch: {
        isAuth(x) {
            if (!x) {
                this.$router.push('/login')
            }
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid rgb(180, 180, 180);
    padding: 0 20px;
    z-index: 1;
}
.logo {
    font-family: 'Ultra';
    font-size: 28px;
    color: #000;
}
</style>