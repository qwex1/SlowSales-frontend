<template lang="pug">
.login-wrapper
    .login-body
        .login-title Регистрация организации
        custom-input(title="Email" v-model="email")
        custom-input.mt-4(title="Название организации" v-model="name")
        custom-input.mt-4(title="ФИО" v-model="username")
        custom-input.mt-4(title="Пароль" type="password" v-model="password")
        custom-input.mt-4(title="Повторите пароль" type="password" v-model="passwordConfirm")
        simple-btn.py-2.mt-4(@click="signup") Зарегистрировать
</template>

<script>
export default {
    layout: 'login',
    data() { 
        return {
            email: null,
            name: null,
            username: null,
            password: null,
            passwordConfirm: null,
        }

    },
    methods: {
        async signup() {
            try {
                const res = await this.$axios.$post('/signup', {
                    email: this.email,
                    name: this.name,
                    username: this.username,
                    password: this.password
                })
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