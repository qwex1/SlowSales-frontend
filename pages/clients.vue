<template lang="pug">
.clients
    .container
        .page-title Клиенты
        simple-btn.w-25.my-3(@click="isComponentModalActive = true") Добавить
        .d-flex
            b-button.mr-5(class="is-danger is-light" :disabled="!selected" @click="selected = null") Снять выделение
            b-button.ml-5(class="is-success" :disabled="!selected" @click="createSaleModal = true") Создать сделку
            b-button.ml-3(class="is-danger" :disabled="!selected" @click="selected = null") Удалить клиента
        b-table(:data="clients" :columns="columns" :selected.sync="selected")
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
        this.getClients()
        this.getProducts()
    },
    data() {
        return {
            selectedOptions: [],
            name: null,
            phone: null,
            city: null,
            isComponentModalActive: false,
            createSaleModal: false,
            selected: null,
            clients: [],
            products: [],
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
                    centered: true
                }
            ]
        }
    },
    computed: {
        token() {
            return localStorage.getItem('token')
        }
    },
    watch: {
        selectedOptions(x) {
            // debugger
        }
    },
    methods: {
        async addClient(props) {
            try {
                const res = this.$axios.$post('/create-customer', {
                    name: this.name,
                    phone: this.phone,
                    city: this.city,
                    register_date: new Date(),
                    token: this.token
                })
            } catch (e) {
                
            }
            // this.clients.push({
            //     id: this.clients.length + 1,
            //     name: this.name,
            //     phone: this.phone,
            //     city: this.city,
            //     date: this.$moment(new Date()).format("DD.MM.YYYY HH:mm")
            // })
            this.getClients()
            this.name = this.phone = this.city = null
            props.close()
        },
        async getClients() {
            try {
                const res = await this.$axios.$post('/get-customers', { token: this.token})
                this.clients = res.map(x => {
                    return {
                        ...x,
                        register_date: this.$moment(x.register_date).format("DD.MM.YYYY HH:mm")
                    }
                })
            } catch(e) {

            }
        },
        async getProducts() {
            try {
                const res = await this.$axios.$post('/get-products', { token: this.token})
                this.products = res
            } catch(e) {

            }
        },
        async createSale(props) {
            try {
                const res = await this.$axios.$post('/create-sale', { 
                    customer_id: this.selected.id,
                    saled_products: this.selectedOptions,
                    date: new Date(),
                    token: this.token
                })
            } catch(e) {

            }
            props.close()
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