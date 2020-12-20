<template lang="pug">
.clients
    .container
        .page-title Сделки
        .d-flex.my-3
            b-button.mr-5(class="is-danger is-light" :disabled="!selected" @click="selected = null") Снять выделение
            b-button.ml-3(class="is-danger" :disabled="!selected" @click="deleteSale") Удалить сделку
        b-table(:data="clients" :columns="columns" :selected.sync="selected")
        .final-sum.mt-5 Итого: {{ finalSum }}
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
        this.getSales()
        // this.getProducts()
    },
    data() {
        return {
            finalSum: null,
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
                    field: 'date',
                    label: 'Дата сделки',
                },
                {
                    field: 'customer_name',
                    label: 'Заказчик',
                },
                {
                    field: 'manager_name',
                    label: 'Имя менеджера',
                },
                {
                    field: 'final_sum',
                    label: 'Сумма заказа',
                    numeric: true
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
            this.getSales()
            this.name = this.phone = this.city = null
            props.close()
        },
        async getSales() {
            try {
                const res = await this.$axios.$post('/get-sales', { token: this.token})
                this.clients = res.map(x => {
                    return {
                        ...x,
                        date: this.$moment(x.date).format("DD.MM.YYYY HH:mm")
                    }
                })
                this.clients = this.clients.filter(x => !x.product_name && x.id)
                this.finalSum = res.filter(x => !x.id)[0]['final_sum']
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
        async createSale() {
            try {
                const res = await this.$axios.$post('/create-sale', { 
                    customer_id: this.selected.id,
                    saled_products: this.selectedOptions,
                    date: new Date(),
                    token: this.token
                })
            } catch(e) {

            }
        },
        async deleteSale() {
            try {
                const res = await this.$axios.$post('/delete-sale', { 
                    id: this.selected.id,
                    token: this.token
                })
            } catch(e) {

            }
            this.getSales()
        },
    }
}
</script>

<style lang="scss" scoped>
.final-sum {
    font-weight: 600;
    font-size: 20px;
    margin-right: 10px;
    text-align: right;
}
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