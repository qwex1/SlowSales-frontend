<template lang="pug">
.clients
    .container
        .page-title Основная информация
        div Название компании: {{ orgName }}
        div ФИО: {{ username }}
        div Email: {{ userEmail }}
        .page-title.mt-5 О компании
        .subtitle.mt-5 Регулярные покупатели
        b-table(:data="regulars" :columns="columns")
        .subtitle.mt-5 Лучшие сотрудники
        b-table(:data="topManagers" :columns="columns2")
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
                    .login-title Добавить клиента
                    custom-input(title="Название организации" v-model="name")
                    custom-input.mt-4(title="Контактный телефон" v-model="phone")
                    custom-input.mt-4(title="Город" v-model="city")
                    simple-btn.py-2.mt-4(@click="addClient(props)") Добавить
        b-modal(
            v-model="createSaleModal"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
        )
            template(#default="props")
                .login-body(@close="props.close")
                    .login-title Создать сделку
                    b-dropdown(multiple aria-role="list" expanded v-model="selectedOptions")
                        b-button(expanded slot="trigger")
                            .d-flex.align-items-center
                                span Selected ({{ selectedOptions.length }})
                                b-icon(icon="menu-down")
                        b-dropdown-item(aria-role="listitem" v-for="product in products" :value="product.id" :key="product.id")
                            span {{ product.name }}
                    simple-btn.py-2.mt-4(@click="createSale(props)") Создать
</template>

<script>
export default {
    mounted() {
        this.getRegulars()
        this.getTopManagers()
        this.getMe()
    },
    data() {
        return {
            orgName: null,
            username: null,
            userEmail: null,
            regulars: [],
            topManagers: [],
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                    width: '40',
                    numeric: true
                },
                {
                    field: 'name',
                    label: 'Название',
                },
                {
                    field: 'phone',
                    label: 'Телефон',
                },
                {
                    field: 'city',
                    label: 'Город',
                },
                {
                    field: 'register_date',
                    label: 'Дата регистрации',
                },
                {
                    field: 'num_deals',
                    label: 'Количество сделок',
                    centered: true
                },
                {
                    field: 'amount',
                    label: 'Сумма покупок',
                    numeric: true
                },
            ],
            columns2: [
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
                    label: 'Имя менеджера',
                },
                {
                    field: 'role',
                    label: 'Роль',
                },
                {
                    field: 'num_deals',
                    label: 'Количество сделок',
                    centered: true
                },
                {
                    field: 'amount',
                    label: 'Сумма покупок',
                    numeric: true
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
        async getRegulars() {
            try {
                const res = await this.$axios.$post('/get-regulars', { token: this.token})
                this.regulars = res.map(x => {
                    return {
                        ...x,
                        register_date: this.$moment(x.register_date).format("DD.MM.YYYY HH:mm")
                    }
                })
            } catch(e) {

            }
        },
        async getTopManagers() {
            try {
                const res = await this.$axios.$post('/get-top-managers', { token: this.token})
                this.topManagers = res
            } catch(e) {

            }
        },
        async getMe() {
            try {
                const res = await this.$axios.$post('/me', { token: this.token})
                this.orgName = res.org_name
                this.username = res.username
                this.userEmail = res.user_email
            } catch(e) {

            }
        },
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