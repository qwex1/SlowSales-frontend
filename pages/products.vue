<template lang="pug">
.clients
    .container
        .page-title Продукты организации
        .row
            .col-12
                simple-btn.w-25.my-3(@click="isComponentModalActive = true") Добавить
                .d-flex
                    b-button(class="is-danger is-light" :disabled="!selected" @click="selected = null") Снять выделение
                    b-button.ml-3(class="is-danger" :disabled="!selected" @click="deleteProduct") Удалить Продукт
            .col-6
                b-table(:data="products" :columns="columns" :selected.sync="selected")
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
                    .login-title Добавить продукт
                    custom-input(title="Название продукта" v-model="name")
                    custom-input.mt-4(title="Стоимость" type="number" v-model="price")
                    simple-btn.py-2.mt-4(@click="addProduct(props)") Добавить
</template>

<script>
export default {
    mounted() {
        this.getProducts()
    },
    data() {
        return {
            name: null,
            price: null,
            isComponentModalActive: false,
            selected: null,
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
                    field: 'price',
                    label: 'Стоимость',
                },
            ]
        }
    },
    computed: {
        token() {
            return localStorage.getItem('token')
        }
    },
    watch: {
        selected(x) {
            // debugger
        }
    },
    methods: {
        async addProduct(props) {
            try {
                const res = this.$axios.$post('/add-product', {
                    name: this.name,
                    price: this.price,
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
            this.getProducts()
            this.name = this.price = null
            props.close()
        },
        async getProducts() {
            try {
                const res = await this.$axios.$post('/get-products', { token: this.token})
                this.products = res
                // .map(x => {
                //     return {
                //         ...x,
                //         register_date: this.$moment(x.register_date).format("DD.MM.YYYY HH:mm")
                //     }
                // })
            } catch(e) {

            }
        },
        async deleteProduct() {
            try {
                const res = await this.$axios.$post('/delete-product', { id: this.selected.id, token: this.token})
            } catch (e) {

            }
            this.selected = null
            this.getProducts()
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