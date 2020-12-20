<template lang="pug">
.clients
    .container
        .page-title Менеджеры
        simple-btn.w-25.my-3(@click="isComponentModalActive = true") Зарегистрировать сотрудника
        b-table(:data="managers" :columns="columns")
        b-modal(
            v-model="isComponentModalActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
        )
            template(#default="props")
                .login-body(@close="props.close")
                    .login-title Регистрация сотрудника
                    custom-input(title="Email" v-model="email")
                    custom-input.mt-4(title="ФИО" v-model="name")
                    custom-input.mt-4(title="Пароль" type="password" v-model="password")
                    custom-input.mt-4(title="Повторите пароль" type="password" v-model="passwordConfirm")
                    b-checkbox.mt-4(v-model="role") Регистрация в роли админа
                    simple-btn.py-2.mt-4(@click="addManager(props)") Зарегистрировать
</template>

<script>
export default {
    mounted() {
        this.getManagers()
    },
    data() {
        return {
            email: null,
            name: null,
            password: null,
            passwordConfirm: null,
            role: false,
            isComponentModalActive: false,
            managers: [],
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                    width: '40',
                    numeric: true
                },
                {
                    field: 'email',
                    label: 'Email',
                },
                {
                    field: 'name',
                    label: 'Имя',
                },
                {
                    field: 'role',
                    label: 'Роль',
                },
            ]
        }
    },
    computed: {
        token() {
            return localStorage.getItem('token')
        }
    },
    methods: {
        async addManager(props) {
            try {
                const res = await this.$axios.$post('/create-user', { 
                    username: this.name,
                    email: this.email,
                    password: this.password,
                    role: Number(!this.role),
                    token: this.token
                })
                this.getManagers()
            } catch (e) {

            }
            // this.managers.push({
            //     id: this.managers.length + 1,
            //     name: this.name,
            //     role: 'manager'
            // })
            this.name = this.phone = this.city = null
            props.close()
        },
        async getManagers() {
            try {
                const res = await this.$axios.$post('/get-users', { token: this.token})
                this.managers = res.map(x => {
                    return {
                        ...x,
                        role: x.role == 0 ? 'admin' : 'manager'
                    }})
            } catch(e) {

            }
        }
    }
}
</script>

<style lang="scss" scoped>
.clients {
    height: 1000px;
}
div::v-deep .animation-content {
    z-index: 1;
}
.login {
    &-body {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        padding: 40px 20px;
        background: #fff;
        width: 500px;
    }
    &-title {
        text-align: center;
        font-size: 26px;
        font-weight: 500;
        margin-bottom: 25px
    }
}
</style>