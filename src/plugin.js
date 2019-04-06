import Toast from './toast'

// Vue 插件机制的说明，有这个以后，在app.js中导入这个plugin，然后使用Vue.use(plugin)即可
export default {
    install(Vue, options) {
        Vue.prototype.$toast = function (message, toastOptions) {
            const Constructor = Vue.extend(Toast)
            const toast = new Constructor({
                propsData: toastOptions
            })
            toast.$slots.default = [message]
            toast.$mount()
            document.body.appendChild(toast.$el)
        }
    }
}
