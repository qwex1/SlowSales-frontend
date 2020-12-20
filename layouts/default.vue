<template lang="pug">
div
    base-header
    navigator
    .content-wrapper
        nuxt
</template>

<style>
.page-title {
    font-size: 28px;
    font-weight: 600;
    color: #000;
}
.content-wrapper {
    position: fixed;
    top: 50px;
    left: 250px;
    width: calc(100vw - 250px);
    padding: 30px 0;
    max-height: calc(100vh - 50px);
    overflow: auto;
}
body {
    font-family: "Roboto" !important;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
