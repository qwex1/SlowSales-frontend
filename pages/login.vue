<template lang="pug">
.login-wrapper
    .login-body
        .login-title Вход
        custom-input(title="Email" v-model="email")
        custom-input.mt-4(title="Пароль" type="password" v-model="password")
        simple-btn.py-2.mt-4(@click="login") Войти
</template>

<script>
export default {
    layout: 'login',
    data() {
        return {
            email: null,
            password: null,
        }
    },
    methods: {
        async login() {
            try {
                const res = await this.$axios.$post('/login', {
                    username: this.email,
                    password: this.password
                })
                localStorage.setItem('token',  res.token)
                this.$router.push('/')
            } catch(e) {

            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    &-wrapper {
        height: calc(100vh - 50px);
        display: flex;
        align-items: center;
        padding: 40px 10px;
    }
    &-body {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        padding: 40px 20px;
        background: #fff;
        width: 500px;
        margin: auto auto;
    }
    &-title {
        text-align: center;
        font-size: 26px;
        font-weight: 500;
        margin-bottom: 25px
    }
}
</style>