export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'SlowSales-frontend',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: "stylesheet", href: "https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css" },
            { rel: "preconnect", href: "https://fonts.gstatic.com" },
            { href: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap", rel: "stylesheet" },
            { href: "https://fonts.googleapis.com/css2?family=Ultra&display=swap", rel: "stylesheet" },
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
    '~/static/css/bootstrap.css',
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: '~/plugins/buefy.js', ssr: false },
        { src: '~/plugins/axios.js', ssr: true },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [ '@nuxtjs/axios' ],

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
    },
    env: {
        // baseUrl: process.env.BASE_URL || 'https://rugbynews.info.gridmaniac.com',
        // baseUrl: process.env.BASE_URL || 'https://rugbynews.info/api',
        baseUrl: process.env.BASE_URL || 'http://localhost:8081',
    }
}
