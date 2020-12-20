<template lang="pug">
button.btn(v-on="$listeners")
    slot
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: #23758C;
    border-radius: 1px;
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
    padding: 7px 10px;
    text-transform: uppercase;
    transition: 0.2s;
    &:hover {
        opacity: 0.7;
    }
}
</style>