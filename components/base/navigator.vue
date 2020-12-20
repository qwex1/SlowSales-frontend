<template lang="pug">
.navigator
    nuxt-link(:to="item.link" v-for="item in links")
        .navigator-item {{ item.title }}

</template>

<script>
export default {
    data() {
        return {
            links: [
                { title: "Главная", link: "/" },
                { title: "Клиенты", link: "/clients" },
                { title: "Менеджеры", link: "/managers" },
                { title: "Продукты", link: "/products" },
                { title: "Сделки", link: "/sales" },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.navigator {
    z-index: 0;
    position: fixed;
    left: 0;
    top: 50px;
    width: 250px;
    height: calc(100vh - 50px);
    background-color: #fff;
    border-right: 1px solid rgb(185, 185, 185);
    &-item {
        font-weight: 500;
        padding: 10px 15px;
        color: #23758C;
        transition: 0.2s;
        border-bottom: 1px solid #bebebe48;
        &:hover {
            opacity: 0.7;
        }
    }
}
</style>